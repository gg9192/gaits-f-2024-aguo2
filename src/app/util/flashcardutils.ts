import getClient from "@/app/util/dbutil"
import { redirect } from 'next/navigation'
import * as fs from 'node:fs/promises';
import { Blob } from "@/types/Blob";
import { getMP3Bytes } from "./openaiutils";
import { saveBufferAsFile,getFileBuffer } from "./fsutils";

function isIntegerString(value: string): boolean {
  const parsed = parseInt(value, 10);
  return !isNaN(parsed) && parsed.toString() === value;
}

export async function setExists(flashcardsetid: string) {
  let is404 = false;
  if (!isIntegerString(flashcardsetid)) {
    console.log("flash card set id was not a string")
    redirect('/404')
  }
  const client = getClient()
  try {
    await client.connect()
    const rowCount = (await client.query('select PK from FlashcardSets where PK = $1', [flashcardsetid])).rowCount
    if (rowCount == 0) {
      is404 = true
    }
  }
  catch (err) {
    console.log(`error validating that set ${flashcardsetid}`, err.message)
    redirect('/500')
  }
  finally {
    client.end()
    if (is404) {
      redirect('/404')
    }
  }
}

export async function setExistsBoolean(flashcardsetid: string) {
  if (!isIntegerString(flashcardsetid)) {
    console.log("flash card set id was not a string")
    return false
  }
  const client = getClient()
  try {
    await client.connect()
    const rowCount = (await client.query('select PK from FlashcardSets where PK = $1', [flashcardsetid])).rowCount
    if (rowCount == 0) {
      return true
    }
  }
  catch (err) {
    console.log(`error validating that set ${flashcardsetid}`, err.message)
    return false
  }
  finally {
    client.end()
  }
}

export async function cardExistsBoolean(cardID: string):Promise<boolean> {

  if (!isIntegerString(cardID)) {
    return false
  }
  const cardIDInt = parseInt(cardID)

  const client = getClient()
  try {
    await client.connect()
    const num = (await client.query("select * from FlashCards where PK = $1", [cardIDInt])).rows.length
    return num !== 0
  }
  catch (error) {
    console.log(`error verifying that card ${cardID} exists`)
    return false
  }
  finally {
    client.end()
  }
}


export async function deleteCard(id:String) {
  const client = getClient()
  const id1 = parseInt(id)
  try {
      await client.connect()
      const filenames = (await client.query('DELETE FROM FlashCards WHERE pk = $1 RETURNING QuestionTTS, AnswerTTS', [id1])).rows[0]
      console.log(filenames)
      const qfp = filenames.questiontts
      const afp = filenames.answertts
      const rootDir = process.cwd();
      console.log(qfp, afp, rootDir, filenames)
      if (qfp != null) {
        await fs.rm(`${rootDir}/storage/${qfp}`)
      }
      if (afp != null) {
        await fs.rm(`${rootDir}/storage/${afp}`)
      }

      return new Response(`ok`, {
          status: 200
      })
  }
  catch (err) {
      console.log(`error deleting flashcard ${id}`, err.message)
      return new Response(`error deleting flashcard ${id}`, {
          status: 500
      })
  }
  finally {
      client.end()
  }
}

export async function getBytes(cardID:string, isQuestion: string):Promise<Blob | null> {
  const dbclient = getClient()
  const questionBool = isQuestion === "true" ? true : false
  let txt, found;
  try {
    await dbclient.connect()  
    const columnName = questionBool ? "Question" : "Answer"
    const ttspath = questionBool ? "QuestionTTS" : "AnswerTTS"
    console.log(cardID)
    const pgres = (await dbclient.query(`select ${columnName},${ttspath} from FlashCards where PK = $1`, [parseInt(cardID)])).rows[0]
    txt = questionBool ? pgres.question : pgres.answer
    found = questionBool ? pgres.questiontts : pgres.answertts
  }
  catch (err) {
    console.log('problem reading the flashcard from database', err.message)
  }
  finally {
    dbclient.end()
  }
  if (found === null) {
    const b = await getMP3Bytes(txt)
    if (b === null) {
      return null
    }
    const buff = Buffer.from(b)
    let filepath
    try {
      filepath = await saveBufferAsFile(buff)
    } catch (error) {
      console.log('error saving file', error.message)
      return null;
    }
    const dbclient = getClient()
      try {
        await dbclient.connect()  
        const ttspath = questionBool ? "QuestionTTS" : "AnswerTTS"
        await dbclient.query(`UPDATE FlashCards SET ${ttspath} = '${filepath}' WHERE PK = $1`, [parseInt(cardID)])
      }
    catch (err) {
      console.log('error saving filepath to db', err.message)
    }

    return {buff: buff, size: buff.byteLength};
  } 
  const b  = await getFileBuffer(found)
  return {buff: b, size: 0}; //size was undeeded OOPS
}


export async function deleteSet(setID: string) {
  const client = getClient()
  try {
    await client.connect()
    const pgres = (await client.query("select pk from flashcards where FlashcardSetFK = $1", [parseInt(setID)])).rows
    for (const card of pgres) {
      await deleteCard(card.pk)
    }
    await client.query("DELETE FROM FlashcardSets WHERE pk = $1 ", [parseInt(setID)])
    return new Response("set was deleted", {
      status: 200
  })
  }
  catch (err) {
    console.log(`exception while deleting set ${setID}`, err.message)
    return new Response("server error", {
      status: 500
  })
  }
  finally {
    client.end()
  }

}
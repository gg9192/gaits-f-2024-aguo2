import getClient from "@/app/util/dbutil"
import { connect } from "http2";
import { redirect } from 'next/navigation'

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

export async function cardExistsBoolean(cardID: string):boolean {
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
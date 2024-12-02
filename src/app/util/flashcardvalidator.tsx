import getClient from "@/app/util/dbutil"
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
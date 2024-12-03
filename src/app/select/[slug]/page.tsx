import '../../styles/select.css'
import { setExists } from '../../util/flashcardvalidator'
import Link from 'next/link'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const flashcardsetid = (await params).slug
  await setExists(flashcardsetid)
  return (<>
    <div>
      <Link href={`/flashcards/${flashcardsetid}`}>Flashcards</Link>
    </div>
    <div className='divider'></div>
    <div>
      <a>Free response</a>
    </div>

  </>)
}
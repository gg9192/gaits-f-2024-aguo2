import { setExists } from '../../util/flashcardutils'
import SelectComponent from '@/app/components/SelectComponent'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const flashcardsetid = (await params).slug
  await setExists(flashcardsetid)
  return (<>
    <SelectComponent id={parseInt(flashcardsetid)}></SelectComponent>
  </>)
}
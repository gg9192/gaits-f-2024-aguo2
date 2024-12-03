import OpenAI from 'openai';

const client = new OpenAI({});
export async function getFlashcardSets(notes: string): Promise<object> {

  const sysPrompt = `You are a tutor. I am going to give you text representing a students notes for a given class.
  You are to look over the students' notes and generate a set of flashcards for the student to study that only 
  contains content provided by the notes. Do not include things that are not course content such as due dates of assignments
  or dates of exams. DO NOT MAKE ANYTHING UP or include things that are not in the notes.
  You are to give your answer as valid json. Where the response is a list of objects that are {"q": "example question",
  "a": "example answer"}. You MUST output valid json that can be parsed by the machine as the next step.
  ex: [{"q": "what is your name", "a": "Alex Guo"}]`
  
  const completions = await client.chat.completions.create({
    messages: [{ role: 'system', content: sysPrompt }, { role: 'user', content: notes }],
    model: 'gpt-4o-mini',
  });
  const restxt = completions.choices[0].message.content

  let stripped = restxt?.replace("```json", "") //fancy stuff used to display json that openai uses for their UI
  stripped = restxt?.replace("```", "")
  console.log(stripped, 'stripped')
  return JSON.parse(stripped)
}
import { ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";

export async function POST(request: Request) {
  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
  });

  const parser = new CommaSeparatedListOutputParser();

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      `USER IDEA: {user_idea}
      Given the user idea for a character, plot, or setting, expand on the idea, with a max of around 30 words.`
    ),
    model,
    parser,
  ]);

  const ideasList = [];

  const userIdea = (await request.json()).idea;

  for (let i = 0; i < 3; i++) {
    console.log("Iteration", i);
    const idea = await chain.invoke({
      user_idea: userIdea,
    });

    ideasList.push(idea);
  }

  const nodes = ideasList.map((idea, index) => ({
    id: `node-${index + 1}`,
    text: idea,
  }));

  return new Response(JSON.stringify({ nodes }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

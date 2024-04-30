import { ChatOpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";

export async function POST(request: Request) {
  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0.97,
  });

  const parser = new CommaSeparatedListOutputParser();

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      `USER IDEA: {user_idea}
      Analyze the nature of the user idea. It is going to be a character, plot, or setting.
      - If the user idea involves a character, provide a brief expansion on the character's background, motivations, and potential conflicts (max 30 words).
      - If the user idea involves a plot, provide a short continuation of the story that logically follows from the setup (max 30 words).
      - If the user idea involves a setting, give a concise description of the setting, including sensory details and its implications for the story (max 30 words).
      
      Give a brief idea based on the user input continuing from on the initial input given the nature of the idea. It should be at most 30 words. The output should only be one of them, not all of them. 
      Be very creative and imaginative. Only output either a character, plot, or setting.`
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

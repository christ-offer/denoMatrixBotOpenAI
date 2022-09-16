import { SmallBot } from "https://deno.land/x/smallbot_matrix@0.1.2/mod.ts?s=SmallBot";
import { OpenAI } from "./openAi.ts"

// OpenAI API Key 
let openAiKey = Deno.env.get("OPEN_AI_KEY")

// Instantiate a OpenAI class
const instance = new OpenAI('YOUR_API_KEY');

// Insantiate a Matrix Bot
const client = new SmallBot({
  accessToken: "your token",
  homeserverUrl: "https://matrix.org/",
  eventHandler: async (client, roomId, event) => {
      if (event.sender !== client.ownUserId) return;
      if (!event.content.body) return;
      if (!event.content.body.startsWith("!openai")) {
        await instance.createCompletionText(event.content.body)
      } else if (!event.content.body.startsWith("!code")) {
        await instance.createCompletionText(event.content.body)
      } else {
        return
      }
  }
});

// Start matrix Bot.
await client.start();
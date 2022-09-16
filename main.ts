import { SmallBot } from "https://deno.land/x/smallbot_matrix@0.1.2/mod.ts?s=SmallBot";
import { OpenAI } from "./openAi.ts"

// OpenAI API Key 
const env = {
  matrixToken: Deno.env.get("MATRIX_SECRET_KEY"),
  openAiKey: Deno.env.get("OPEN_AI_KEY")
}
// Instantiate a OpenAI class
const instance = new OpenAI(`${env.openAiKey}`);

// Insantiate a Matrix Bot
const client = new SmallBot({
  accessToken: `${env.matrixToken}`,
  homeserverUrl: "https://matrix.org/",
  eventHandler: async (client, roomId, event) => {
      if (event.sender !== client.ownUserId) return;
      if (!event.content.body) return;
      if (!event.content.body.startsWith("!openai")) {
        const textReply = await instance.createCompletionText(event.content.body)
        client.sendMessage(roomId, "m.text", `${textReply}`)
      } else if (!event.content.body.startsWith("!code")) {
        const codeReply = await instance.createCompletionText(event.content.body)
        client.sendMessage(roomId, "m.text", `${codeReply}`)
      } else {
        return
      }
  }
});

// Start matrix Bot.
await client.start();
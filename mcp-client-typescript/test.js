import "dotenv/config";
import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
anthropic.messages
  .create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    temperature: 1,
    system: "Respond only with short poems.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Why is the ocean salty?",
          },
        ],
      },
    ],
  })
  .then((res) => {
    console.log(333, res);
  })
  .catch((error) => {
    console.log(444, error);
  });

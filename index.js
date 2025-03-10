import genAI from "./config/gen-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the Generative AI CLI!"));
  console.log(colors.bold.green("you can start chatting with the AI now!"));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const chatRequest = {
        contents: [
          ...chatHistory,
          { role: "user", parts: [{ text: userInput }] },
        ],
      };

      const result = await model.generateContent(chatRequest);
      const botResponse = result.response.text();

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + botResponse);
        return;
      }

      console.log(colors.green("Bot: ") + botResponse);

      chatHistory.push({ role: "user", parts: [{ text: userInput }] });
      chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();

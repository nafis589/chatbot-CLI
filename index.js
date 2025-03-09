import genAI from "./config/gen-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the Generative AI CLI!"));
  console.log(colors.bold.green("you can start chatting with the AI now!"));

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(userInput);

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bot: ") + result.response.text());
        return;
      }

      console.log(colors.green("Bot: ") + result.response.text());
    } catch (error) {
      console.error(oolors.red(error));
    }
  }
}

main();

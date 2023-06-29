import TelegramApi from "node-telegram-bot-api"
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN
const botUsername = process.env.BOT_USERNAME

if (!token || !botUsername) {
    console.error("Missing bot credentials in environment variables");
    process.exit(1);
}

const bot = new TelegramApi(token, { polling: true })

bot.on("message", msg => {
    console.log(msg)
})

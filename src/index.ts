import TelegramApi, { Message } from "node-telegram-bot-api";
import dotenv from "dotenv";
import schedule from "node-schedule";
import { DutySchedule } from "./domain/DutySchedule.js";

dotenv.config();

const token = process.env.BOT_TOKEN;
const botUsername = process.env.BOT_USERNAME;

if (!token || !botUsername) {
    console.error("Missing bot credentials in environment variables");
    process.exit(1);
}

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "Hello, user!" }
]);

const commandMap = new Map();

// Define functions for commands
const startCommand = async (message: Message) => {
    const text = message.text;
    const chatId = message.chat.id;
    console.log(message);
    await bot.sendMessage(chatId, "Wow man, awesome!");
}

// Add commands to the map
commandMap.set("/start", startCommand);

bot.on("message", async (message) => {
    const commandFunction = commandMap.get(message.text);

    if (commandFunction) {
        commandFunction(message);
    } else {
        console.log(`Command not found: ${message.text}`);
    }
});

// bot.onText(/\/status/, (msg: Message) => {
//     // Check who is on duty today
//     const duty = getDutyForToday();
//     bot.sendMessage(msg.chat.id, `${duty.user} is on duty today`);
// })

// bot.onText(/\/complete/, (msg: Message) => {
//     // Mark the current user's task as complete
//     markTaskAsComplete(msg.from.id);
//     bot.sendMessage(msg.chat.id, "Task marked as complete");
// })

// Schedule daily notifications
// schedule.scheduleJob('0 7 * * *', function(){
//     // Send daily duty reminder
//     const duty = getDutyForToday();
//     bot.sendMessage(duty.userId, "It's your duty day. Don't forget to clean the apartment!");
// });

// Schedule survey creation
// schedule.scheduleJob('0 19 * * *', function(){
//     // Send daily survey
//     const pollOptions = ["Was the dirt vacuumed?", "Were the floors washed?", "Are the mirrors clean?", "Is the dust removed?", "Is the trash taken out?"];
//     createPoll(bot, "Cleaning survey", pollOptions);
// });

// bot.on('poll_answer', (answer) => {
//     // Handle poll answers
//     handlePollAnswer(answer);
// })



async function sendDutyNotification() {
    const duty = await getDutyForToday();

    debugger

    const tasks = [
        "Take out the trash",
        "Clean the house",
        "Wash floors",
        "Clean mirrors"
    ];

    const taskList = tasks.map((task, index) => `${index+1}. ${task}`).join('\n');
    const message = `Hello! Here are your duties for today:\n\n${taskList}`;

    await bot.sendMessage(duty.userId, message);
}

async function getDutyForToday(): Promise<DutySchedule> {
    // This is where you would typically fetch the duty from your data source
    // For this example, let's return a hard-coded value
    return {
      userId: 468205292, // Edgar
      dutyId: 1, // Assume 1 is cleaning
      startDate: new Date(),
      endDate: new Date(),
    };
}

schedule.scheduleJob('*/10 * * * * *', sendDutyNotification);

// schedule.scheduleJob('0 9 * * *', sendDutyNotification);

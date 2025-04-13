require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Set up webhook
const PORT = process.env.PORT || 3000;
const URL = process.env.WEBHOOK_URL; // e.g. https://your-render-app.onrender.com

app.use(bot.webhookCallback("/bot"));

// Setup webhook with Telegram
bot.telegram.setWebhook(`${URL}/bot`);

bot.start(async (ctx) => {
  const { id, first_name, last_name } = ctx.from;
  const welcomeMessage = `🔥 Welcome, ${first_name} ${last_name || ""}!\n\n🚀 *Wolfpack Hustle* is the ultimate airdrop crafted for the bold. It's time to claim your spot in the pack and start earning! 💰`;

  await ctx.replyWithPhoto("https://i.postimg.cc/hvJ2RFFZ/IMG-20250412-220447.jpg", {
    caption: welcomeMessage,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💼 Hustle Now", url: "https://t.me/wolfpack_hustle_bot/wolfpack" },
          { text: "📢 Channel", url: "https://t.me/wolfpackhustle_offcial_link" },
        ],
        [{ text: "👥 Invite Friends", callback_data: "invite" }],
      ],
    },
  });
});

bot.action("invite", async (ctx) => {
  await ctx.answerCbQuery();
  const userId = ctx.from.id;
  await ctx.reply(
    `👥 Share this link to invite your friends:\n\nhttps://t.me/wolfpack_hustle_bot/wolfpack?startapp=${userId}`
  );
});

app.get("/", (req, res) => {
  res.send("Wolfpack Hustle Bot is live!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

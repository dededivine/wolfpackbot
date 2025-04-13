require("dotenv").config();
const { Telegraf } = require("telegraf");

// Initialize the bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command
bot.start(async (ctx) => {
  const { id, first_name, last_name, username, is_premium } = ctx.from;

  // Get user profile picture
  const photos = await ctx.telegram.getUserProfilePhotos(ctx.from.id);
  let profilePicture = "";
  if (photos.total_count > 0) {
    const fileId = photos.photos[0][0].file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);
    profilePicture = fileLink.href;
  }

  // Send the welcome message with the profile picture and inline buttons

  const welcomeMessage = `🔥 Welcome, ${first_name} ${
    last_name || ""
  }!\n\n🚀 *Wolfpack Hustle* is the ultimate airdrop crafted for the bold. It's time to claim your spot in the pack and start earning! 💰`;

  await ctx.replyWithPhoto(
    "https://i.postimg.cc/hvJ2RFFZ/IMG-20250412-220447.jpg",
    {
      caption: welcomeMessage,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "💼 Hustle Now",
              url: "https://t.me/wolfpack_hustle_bot/wolfpack",
            },
            {
              text: "📢 Channel",
              url: "https://t.me/wolfpackhustle_offcial_link",
            },
          ],
          [
            {
              text: "👥 Invite Friends",
              callback_data: "invite",
            },
          ],
        ],
      },
    }
  );
});

// Handle callback query for "Start"
bot.action("invite", async (ctx) => {
  const userId = ctx.from.id;

  // Optional: Answer the callback query so Telegram doesn’t show loading forever
  await ctx.answerCbQuery();

  await ctx.reply(
    `👥 Share this link to invite your friends:\n\nhttps://t.me/wolfpack_hustle_bot/wolfpack?startapp=${userId}`
  );
});

// Launch the bot
bot.launch();

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

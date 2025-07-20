// Web server for uptime
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(port, () => {
  console.log(`Web server running on port ${port}`);
});

// Minecraft bot setup
const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'dttyagi-lol10110.aternos.me',  // Aternos server IP
    port: 40234,                       // Aternos port
    username: 'BETA'                  // Bot username
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in!');
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected, trying to reconnect...');
    setTimeout(createBot, 5000); // Reconnect after 5 seconds
  });

  bot.on('error', err => {
    console.log('❌ Bot error:', err);
  });
}

// Start the bot
createBot();

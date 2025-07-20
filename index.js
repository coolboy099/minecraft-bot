const mineflayer = require('mineflayer');
const fetch = require('node-fetch');
const express = require('express');
const app = express();

const SERVER_IP = 'dttyagi-lol10110.aternos.me';
const SERVER_PORT = 40234;
const VERSION = '1.21.1';
const BOT_PREFIX = 'BETA';
const BOT_START = 3;
const BOT_END = 20;
const CHECK_INTERVAL = 2 * 60 * 1000;
const SWITCH_INTERVAL = 4 * 60 * 60 * 1000;

let botNumber = BOT_START;
let bot;
let switchTimer;
let reconnectAttempts = 0;
const MAX_ATTEMPTS = 5;

app.get('/', (req, res) => res.send('✅ Bot is running!'));
app.listen(3000, () => console.log('🌐 Web server started'));

function getNextBotName() {
  const name = `${BOT_PREFIX}${botNumber}`;
  botNumber = botNumber < BOT_END ? botNumber + 1 : BOT_START;
  return name;
}

async function isServerOnline() {
  try {
    const res = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_IP}:${SERVER_PORT}`);
    const data = await res.json();
    return data.online;
  } catch {
    return false;
  }
}

function tryLogin(bot) {
  bot.chat('/login 1234');
  setTimeout(() => bot.chat('/register 1234 1234'), 5000);
}

function randomMovement(bot) {
  const actions = ['forward', 'back', 'left', 'right'];
  setInterval(() => {
    const action = actions[Math.floor(Math.random() * actions.length)];
    bot.setControlState(action, true);
    setTimeout(() => bot.setControlState(action, false), 1000);
    bot.setControlState('jump', Math.random() < 0.5);
    bot.setControlState('sneak', Math.random() < 0.3);
  }, 5000);
}

async function connectNextBot() {
  if (bot) bot.quit();

  const online = await isServerOnline();
  if (!online) {
    console.log(`🔌 Server offline. Retrying in 2 minutes...`);
    return;
  }

  const botName = getNextBotName();
  console.log(`🤖 Connecting bot: ${botName}`);

  bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: botName,
    version: VERSION,
  });

  bot.on('login', () => {
    console.log(`✅ Logged in as ${botName}`);
    reconnectAttempts = 0;
    tryLogin(bot);
    randomMovement(bot);
  });

  bot.on('end', () => {
    console.log(`❌ Bot disconnected`);
    tryReconnect();
  });

  bot.on('kicked', (reason) => {
    console.log(`⛔ Kicked: ${reason}`);
    tryReconnect();
  });

  bot.on('error', (err) => {
    console.log(`⚠️ Error: ${err.message}`);
    tryReconnect();
  });
}

function tryReconnect() {
  reconnectAttempts++;
  if (reconnectAttempts < MAX_ATTEMPTS) {
    console.log(`⏳ Retry attempt ${reconnectAttempts}...`);
    setTimeout(connectNextBot, 5000);
  } else {
    console.log('🛑 Too many retries. Will try again in 2 mins.');
    reconnectAttempts = 0;
  }
}

function startMonitor() {
  setInterval(async () => {
    if (!bot || !bot.player) {
      const online = await isServerOnline();
      if (online) {
        const name = getNextBotName();
        bot = startBot(name);
      }
    }
  }, CHECK_INTERVAL);
}

function startBotSwitchTimer() {
  switchTimer = setInterval(() => {
    console.log('🔄 4 hours passed. Switching bot...');
    connectNextBot();
  }, SWITCH_INTERVAL);
}

// Start bot
connectNextBot();
startBotSwitchTimer();

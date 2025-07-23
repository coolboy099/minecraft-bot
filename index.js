const mineflayer = require('mineflayer');
const express = require('express');

let bot;
let isBotConnected = false;

function createBot() {
  bot = mineflayer.createBot({
    host: "dttyagi-lol10110.aternos.me", // <-- Aapka Aternos host yahan likhein
    port: 40234, // default port unless it's different
    username: "sonop", // Can be anything for cracked servers
    version: false // Let it auto-detect
  });

  bot.on('login', () => {
    console.log("✅ Bot logged in");
    isBotConnected = true;

    // 10 seconds wait, then register or login
    setTimeout(() => {
      bot.chat("/reg devilkingop09912345 devilkingop09912345");
      setTimeout(() => {
        bot.chat("/login devilkingop09912345");
        startRandomMovement();
      }, 3000); // 3s wait between reg and login
    }, 10000);
  });

  bot.on('end', () => {
    console.log("❌ Bot disconnected, reconnecting in 5s...");
    isBotConnected = false;
    setTimeout(createBot, 5000); // Reconnect after 5 sec
  });

  bot.on('error', err => {
    console.log("❗ Bot error:", err);
  });
}

function startRandomMovement() {
  setInterval(() => {
    if (!bot || !bot.entity || !bot.entity.position) return;

    const pos = bot.entity.position;
    const x = pos.x + (Math.random() * 10 - 5);
    const z = pos.z + (Math.random() * 10 - 5);

    bot.setControlState('forward', true);
    bot.lookAt({ x, y: pos.y, z }, true);

    setTimeout(() => {
      bot.setControlState('forward', false);
    }, 2000);
  }, 5000); // Every 5s, move randomly
}

createBot();

// --- Web Server on Port 3000 ---

const app = express();

app.get("/", (req, res) => {
  res.send(isBotConnected ? "🟢 Bot is connected" : "🔴 Bot is disconnected");
});

app.listen(3000, () => {
  console.log("🌐 Web server running on http://localhost:3000");
});

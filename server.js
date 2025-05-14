const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot Doll attivo!'));
app.listen(3000, () => console.log('Web server online su porta 3000'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log('✅ Doll è online nel server 'doll marine');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  const msg = message.content.toLowerCase();

  if (msg === '!ciao') {
    return message.channel.send('Ciao! 😊');
  }

  if (msg === '!comandi') {
    return message.channel.send('Comandi: !ciao, !info, !kick @utente');
  }

  if (msg === '!info') {
    return message.channel.send('Sono Doll, il bot di 'doll marine! 🤖');
  }

  if (msg.startsWith('!kick')) {
    if (!message.member.permissions.has('KickMembers')) {
      return message.reply('Non hai permessi per espellere.');
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Menziona un utente da espellere.');
    }

    try {
      await member.kick();
      return message.channel.send(`Utente ${member.user.tag} espulso.`);
    } catch {
      return message.channel.send('Errore espulsione.');
    }
  }
});

client.login(process.env.TOKEN);

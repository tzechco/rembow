const { Client, Collection } = require("discord.js");
const bot = new Client({ disableEveryone: true });
const fs = require('fs');
bot.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}
bot.on('ready', async () => {
  console.log(`Online as ${bot.user.tag}`);
  bot.user.setPresence({ activity: { name: `r!help | ${bot.guilds.cache.size}` }, status: 'dnd' });
  setInterval(() => {
    bot.user.setPresence({ activity: { name: `r!help | ${bot.guilds.cache.size}` }, status: 'dnd' })
  }, 3600000);
});
bot.on("message", async (message) => {
  let args = message.content.trim().split(/ +/g);
  if (message.author.bot) return;
  if (!message.guild) return;
  prefix = 'r!';
  args = message.content.slice(prefix.length).trim().split(/ +/g);
  if (message.content.startsWith(prefix)) {
    const command = bot.commands.get(args[0]);
    if (command) command.execute(message, args, bot);
  }
});
bot.login("YOUR_TOKEN_HERE");
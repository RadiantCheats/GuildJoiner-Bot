const { Client, Collection } = require('discord.js');
const DiscordOauth2 = require('discord-oauth2');
const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const { TOKEN, ID, SECRET, REDIRECT } = require('./util/globals.js');

const bot = new Client();
module.exports.client = bot;
module.exports.OAuth2Client = new DiscordOauth2({
  clientId: ID,
  clientSecret: SECRET,
  redirectUri: REDIRECT
});
bot.commands = new Collection();

getFiles('./commands/').then((files) => {
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const command = require(`${file}`);
    bot.commands.set(command.command, command);
    let splicedName = `${file}`.split('\\');
    let commandName = '';
    for (let i = splicedName.length - 1; i >= 0; i--) {
      if (splicedName[i] == 'commands') break;
      commandName = '/' + splicedName[i] + commandName;
    }
  });
});

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.reduce((a, f) => a.concat(f), []);
}

fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

require('./server');

bot.login(TOKEN);

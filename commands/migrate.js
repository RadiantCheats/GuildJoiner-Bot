const { OAuth2Client } = require('..');

const tokenFile = new (require('../util/file'))('tokens.json');

module.exports = {
  command: 'migrate',
  dm: false,
  permissions: (member) => {
    return member.id == require('../util/globals').OWNER;
  },
  async execute(bot, msg, args) {
    const tokens = tokenFile.read();

    const info = await msg.channel.send('Adding members...');

    let added = 0;

    const updater = setInterval(() => {
      info.edit(
        `Added ${added}/${tokens.length} members **[${progressBar(
          added,
          0,
          tokens.length
        )}]**`
      );
    }, 10000);

    for (let token of tokens) {
      try {
        await OAuth2Client.addMember({
          accessToken: token.access_token,
          botToken: bot.token,
          guildId: msg.guild.id,
          userId: token.id
        });
      } catch (e) {
        try {
          await OAuth2Client.tokenRequest({
            scope: 'guilds.join',
            grantType: 'refresh_token',
            refreshToken: token.refreshToken
          });
        } catch {
          console.log(e);
        }
      }

      added++;
      // Rate limit prevention
      await new Promise((_) => setTimeout(_, 1000));
    }

    clearInterval(updater);
    info.edit(`${tokens.length} members migrated to this server.`);
  }
};

function progressBar(val, start, end, inc = 10, fill = '⬜', unfill = '⬛') {
  let out = '';
  for (let i = start; i < end; i += (end - start) / inc) {
    out += val > i ? fill : unfill;
  }
  return out;
}

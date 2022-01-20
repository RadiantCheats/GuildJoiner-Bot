const { MessageEmbed } = require('discord.js');
const { OAuth2Client } = require('..');
const { awaitAuth } = require('../server');
const { ID, REDIRECT } = require('../util/globals');
const crypto = require('crypto');
const tokenFile = new (require('../util/file'))('tokens.json');

module.exports = {
  command: 'authenticate',
  dm: true,
  cooldown: 30 * 60 * 1000,
  permissions: (member) => {
    return true;
  },
  async execute(bot, msg, args) {
    const tokens = tokenFile.read();

    if (tokens.some((t) => t.id == msg.author.id))
      return msg.channel.send('You have already authenticated.');

    const state = crypto.randomBytes(16).toString('hex');
    const embed = new MessageEmbed().setDescription(
      `Click [here](${OAuth2Client.generateAuthUrl({
        scope: 'guilds.join',
        state
      })}) to authenticate!`
    );

    await msg.channel.send(embed);

    try {
      var code = await awaitAuth(state);
    } catch (e) {
      console.log(e);
      return msg.channel.send(`Timed out. Please use the command again.`);
    }

    const { access_token, refresh_token } = await OAuth2Client.tokenRequest({
      code,
      scope: 'guilds.join',
      grantType: 'authorization_code',
      redirectUri: REDIRECT
    });

    tokens.push({
      id: msg.author.id,
      access_token,
      refresh_token
    });

    tokenFile.write(tokens);

    await msg.channel.send('Authorization complete!');
  }
};

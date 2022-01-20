const { PREFIX } = require('./../util/globals.js');

let recentCommands = [];

module.exports = async (bot, msg) => {
  if (msg.author.bot) return;

  let args = [].concat
    .apply(
      [],
      msg.content
        .slice(PREFIX.length)
        .trim()
        .split('"')
        .map(function (v, i) {
          return i % 2 ? v : v.split(' ');
        })
    )
    .filter(Boolean);
  let message = msg.content.substring(0);

  if (message.substring(0, PREFIX.length) == PREFIX) {
    const command =
      bot.commands.get(args[0]) ||
      bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(args[0]));

    if (command) {
      try {
        if (command.guild && !msg.guild) {
          return msg.channel.send('You can only use this command in a server.');
        }
        if (command.permissions && !command.permissions(msg.member)) {
          return msg.channel.send('Access denied.');
        }
        if (command.dm && msg.guild) {
          return msg.channel.send('You can only use this command in DMs.');
        }

        recentCommands.push(`${msg.author.id}-${command.name}`);
        setTimeout(
          () => {
            recentCommands = recentCommands.filter(
              (c) => c != `${msg.author.id}-${command.name}`
            );
          },
          command.cooldown ? command.cooldown : 1000
        );

        await command.execute(
          bot,
          msg,
          args.slice(1).filter((a) => a != ''),
          () => {
            recentCommands = recentCommands.filter(
              (c) => c != `${msg.author.id}-${command.name}`
            );
          }
        );
      } catch (err) {
        console.error(err);
        msg.channel.send(
          `There was an error trying to execute the ${args[0]} command!`
        );
      }
    }
  }
};

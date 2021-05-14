const { MessageEmbed } = require('discord.js');
const toHex = require('colornames');
module.exports = {
  name: 'color',
  async execute(message, args, bot) {
    const regexp = /^[0-9a-fA-F]+$/;
    if (message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
      errorEmbed = new MessageEmbed()
        .setTitle("Invalid Hex Color")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setColor('#ff0000')
        .setDescription("Please try again with a valid hex code or [name](https://htmlcolorcodes.com/color-names).")
        .setFooter(message.member.user.tag, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTimestamp();
      permissionEmbed = new MessageEmbed()
        .setTitle("Missing Permissions")
        .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setColor('#ff0000')
        .setDescription("Looks like I am missing the **MANAGE_ROLES** permission.")
        .setFooter(message.member.user.tag, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTimestamp();

    } else {
      errorEmbed = '**Invalid Hex Color**\nPlease try again with a valid hex code or name (https://htmlcolorcodes.com/color-names).';
      permissionEmbed = '**Missing Permissions**\nLooks like I am missing the **MANAGE_ROLES** permission.'
    }
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(permissionEmbed)
    if (!args[1]) return message.channel.send(errorEmbed);
    let color = args[1].toUpperCase();
    if (toHex(args[1])) color = toHex(args[1]);
    if (color.startsWith('#')) color = color.toUpperCase().slice(1);
    if (!regexp.test(color)) return message.channel.send(errorEmbed);
    switch (color.length) {
      case 1: color = `00000${color}`
        break;
      case 2: color = `0000${color}`
        break;
      case 3: color = `000${color}`
        break;
      case 4: color = `00${color}`
        break;
      case 5: color = `0${color}`
        break;
    }
    if (color.length !== 6) return message.channel.send(errorEmbed);
    if (color == '000000') color = '000001';
    let mroles = message.member.roles.cache.find(role => role.name.indexOf('#') !== -1);
    if (mroles) {
      if (mroles.name.length == 7) {
        if (regexp.test(mroles.name.slice(1)) == true) {
          if (mroles.name == `#${color}`) return;
        }
      }
    }
    if (message.guild.roles.cache.find(role => role.name === `#${color}`)) {
      role = message.guild.roles.cache.find(role => role.name === `#${color}`);
    } else {
      if (message.guild.roles.cache.size > 249) return message.reply('Server has reached the maximum number of roles (250)');
      role = await message.guild.roles.create({
        data: {
          name: `#${color}`,
          color: color,
          position: message.guild.me.roles.highest.position,
        }
      })
    }
    if (message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
      successEmbed = new MessageEmbed()
        .setTitle(`I have set your color to #${color}!`)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setColor(`#${color}`)
        .setDescription("If the color role is too low please ask a server admin to move the **Rembow** role higher!")
        .setFooter(message.member.user.tag, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
        .setTimestamp();
    } else {
      successEmbed = `I have set your color to #${color}\nIf the color role is too low please ask a server admin to move the **Rembow** role higher!`;
    }
    message.channel.send(successEmbed);
    message.member.roles.add(role);
    if(!mroles) return;
    if(mroles.members.size < 2) {
      mroles.delete();
    } else {
      message.member.roles.remove(mroles);
    }
  }
};
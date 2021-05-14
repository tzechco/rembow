const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'remove',
    execute(message, args, bot) {
        const regexp = /^[0-9a-fA-F]+$/;
        if (message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
            permissionEmbed = new MessageEmbed()
                .setTitle("Missing Permissions")
                .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setColor('#ff0000')
                .setDescription("Looks like I am missing the **MANAGE_ROLES** permission.")
                .setFooter(message.member.user.tag, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTimestamp();

        } else {
            permissionEmbed = '**Missing Permissions**\nLooks like I am missing the **MANAGE_ROLES** permission.';
        }
        if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(permissionEmbed);
        if (message.member.roles.cache.size > 1) {
            let mroles = message.member.roles.cache.find(role => role.name.indexOf('#') !== -1);
            if (mroles) {
                if (mroles.name.length == 7) {
                    if (regexp.test(mroles.name.slice(1)) == true) {
                        if (mroles.members.size <= 1) {
                            mroles.delete()
                        } else {
                            message.member.roles.remove(mroles);
                        }
                    }
                }
            }
        }
        if (message.guild.me.permissionsIn(message.channel).has("ADD_REACTIONS")) {
            return message.react('✅')
        } else {
            return message.channel.send('Done!')
        }
    }
}
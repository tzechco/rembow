const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'purge',
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
        if (message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
            userPermissionEmbed = new MessageEmbed()
                .setTitle("Missing Permissions")
                .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setColor('#ff0000')
                .setDescription("Looks like you are missing the **MANAGE_ROLES** permission.")
                .setFooter(message.member.user.tag, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTimestamp();
        } else {
            userPermissionEmbed = `**Missing Permissions**\nLooks like you are missing the **MANAGE_ROLES** permission.`;
        }
        if (!message.member.hasPermission('MANAGE_ROLES', { checkAdmin: true, checkOwner: true })) return message.channel.send(userPermissionEmbed);
        message.guild.roles.cache.forEach(role => {
            if (role.name.startsWith('#')) {
                if (regexp.test(role.name.slice(1))) {
                    role.delete();
                }
            }
        });
        if (message.guild.me.permissionsIn(message.channel).has("ADD_REACTIONS")) {
            return message.react('✅');
        } else {
            return message.channel.send('Done!');
        }
    }
}
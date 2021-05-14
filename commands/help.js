const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'help',
    async execute(message, args, bot) {
        if (message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
            helpEmbed = new MessageEmbed()
                .setTitle("Help")
                .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setColor('#FFA500')
                .setDescription('**r!color** : Changes your color to the specified hex code or [name](https://htmlcolorcodes.com/color-names)\n**r!remove** : Removes your current hex color\n**r!purge** : Deletes all color roles')
                .setFooter(message.member.user.tag, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setTimestamp();
        } else {
            helpEmbed = '**r!color** : Changes your color to the specified hex code or name\n**r!remove** : Removes your current hex color\n**r!purge** : Deletes all color roles';
        }
        message.channel.send(helpEmbed);
    }
}
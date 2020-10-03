const Discord = require('discord.js')

module.exports = {
  name: "addbal",
  aliases: ["addcoins", "add"],
  description: "adds coins to an user, owner only.",
  execute: async(client, message, args, data, db) => {

    let owners = [ "YOUR_USER_ID"]
    if (!owners.includes(message.author.id)) return
    let pay = Number(args[1])
    if (!pay || isNaN(pay)) return message.channel.send(`**Command incorrect!** \n**Try:** \`.bal <MentionAUser> <Coins>\``)
    let user = message.mentions.users.first()
    let logchannel = client.channels.cache.get("746035699303841922")
    let embed = new Discord.MessageEmbed()
    .setTitle('Owner Command')
    .setDescription(`**Owner Name: <@${message.author.id}>!**\n\nAdded **${pay}** coins to <@${user.id}>`)
    .setColor('#ff7542')
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, user.displayAvatarURL({ format: "png", dynamic: true }))
    message.channel.send(embed)
    logchannel.send(embed)
    db.add(`coins_${user.id}`, pay)
  }
}

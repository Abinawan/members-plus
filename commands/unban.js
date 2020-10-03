const Discord = require('discord.js')

module.exports = {
  name: "unban",
  description: "unbans an user from the bot, owner only.",
  execute: async(client, message, args, data, db) => {

    let owners = [ "728602105018843227", "701731392228163587"]

    if (!owners.includes(message.author.id)) return

    let user = client.users.cache.find(user => args.length && message.mentions.users.size < 1 && user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first()

    if (user === undefined) return message.channel.send(`**Incorrect Command** ||Noob Owner||\nUsage: \`-ban [@user/username/userID]\``)

    let embedd = new Discord.MessageEmbed()
    .setTitle('You are Unbanned!')
    .setDescription(`<@${message.author.id}> unbanned you! Congo!!`)
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setFooter(`Users+ v2.0 | 2020 (C) | discord.gg/usersplus`, user.displayAvatarURL({ format: 'png', dynamic: true }))


    if (await db.fetch(`banned_${user.id}`) == true) 
	user.send(embedd)
	message.channel.send('Unbanned!')



    let banned = await db.fetch(`banned_${user.id}`)

    if (banned == false) return message.channel.send(`${user.tag} isn't banned. **BRUH** <:MonkaWae:741915455303843871>`)
    db.set(`banned_${user.id}`, false)
    let unbannedchannel = client.channels.cache.get("745264274615697449")
    let can = new Discord.MessageEmbed()
    .setTitle('User Unbanned!')
    .setDescription(`User Name: **${user.username}**\nUser ID: **${user.id}**\nUnbanned by: <@${message.author.id}>`)
    .setFooter(`Users+ v2.0 | 2020 (C) | discord.gg/usersplus`, user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setColor('BLUE')
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    unbannedchannel.send(can)

    
  }
}

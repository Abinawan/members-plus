const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')

module.exports = {
  name: "pay",
  aliases: ["pay"],
  description: "used to pay coins to the mentioned user.",
  execute: async(client, message, args, data, db) => {

    let amount = args.filter(x => !x.startsWith("<@"))[0]

    if (message.mentions.users.size < 1 || isNaN(amount) || amount < 1) return message.channel.send(`**Command Incorrect!**\n\`-pay <User> <Coins>\`\n*Example: -pay <@728099900176334900> 100*`)

    let user = message.mentions.users.first()


    /*-------------------------------------------------------------------------*/
    let errorembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> You don't have **${amount}** coins! `)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setTimestamp()
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
    /*-------------------------------------------------------------------------*/
    let minimumbruh = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> Minimum Payment is **10** Coins!`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    /*-------------------------------------------------------------------------*/
    let thisisbotbruh = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> You can't send coins to a **bot**!`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    /*-------------------------------------------------------------------------*/
    let youcantpay = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    .setTitle('Error!')
    .setDescription(`<@${message.author.id}> You can't send coins to a **Yourself**!`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor(`#ff0400`)
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    /*-------------------------------------------------------------------------*/

    if (data.coins < Number(amount)) return message.channel.send(errorembed)

    if (Number(amount) < 10) return message.channel.send(minimumbruh)

    if (user.id === message.author.id) return message.channel.send(youcantpay)

    if (user.bot) return message.channel.send(thisisbotbruh)

    /*-------------------------------------------------------------------------*/

    let paidDMembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('You Sent Coins!')
    .setDescription(`<@${message.author.id}> you sent **${amount}** coins to <@${user.id}> !\nNow you have **${data.coins.toFixed(1)}**!`)
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#8a8aff')
    .setTimestamp()
    user.send(paidDMembed)

    /*-------------------------------------------------------------------------*/
        message.channel.send(`You've paid ${user} for **${amount}** coins!`)
    /*-------------------------------------------------------------------------*/
    let paidembed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('You Got Coins!')
    .setDescription(`<@${message.author.id}> sent you **${amount}** Coins! \nNow you have **${data.coins.toFixed(1)}**! **Enjoy!!**`)
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
    .setColor('#8a8aff')
    .setTimestamp()
    user.send(paidembed)
    /*-------------------------------------------------------------------------*/

    data.logs.unshift(`[-${amount}] - You've paid ${user.tag}.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.subtract(`coins_${message.author.id}`, Number(amount))

    data = await get(message, user)

    data.logs.unshift(`[+${amount}] - ${message.author.tag} paid you.`)

    db.set(`logs_${user.id}`, data.logs)

    db.add(`coins_${user.id}`, Number(amount))

    let logchannel = client.channels.cache.get(`745353486140440596`)
    let embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
    .setTitle('Coins Paid [User to User]')
    .setDescription(`Coins Paid By: **${message.author.tag}(${message.author.id})**\nCoins Paid to: **${user.tag}(${user.id})**\nTotal: **${amount}** coins!`)
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
    .setTimestamp()
    .setColor('#8a8aff')
    .setFooter('Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW', message.author.displayAvatarURL({ format: 'png', dynamic: true }))
    logchannel.send(embed)
  }
}

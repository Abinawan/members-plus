const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')
module.exports = {
  name: "bal",
  aliases: ["balance"], 
  description: "shows the log of coins.",
  execute: async(client, message, args, data, db) => {
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || message.author
    if (user.username === undefined) user = user.user
    data = await get(message, user)
    let page = Number(args[0]) 
    if (!page || isNaN(page) || page < 1) page = 1
    let obj = { min: page * 10 - 10, max: page * 10 }
    let tpages = 1
    let n = 10
    data.logs.map((x, y) => {
      if (y == 10) n += 10, tpages++
    })
    if (page > tpages) return message.channel.send(`Page not found.`)
    let logs = []
    data.logs.map((x, y) => {
      if (y >= obj.min && y < obj.max) logs.push(x)
    }) 
    const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor(`${user.username}'s Users+ coins balance`, message.author.displayAvatarURL())
    .setTitle(`Coin Balance: **${data.coins.toFixed(1)}** coins`)
    .setFooter(`Page ${page}/${tpages} | -bal page# | Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`)
    .setDescription(`**Want coins without joining server?**\nBuy coins from our official Discord Server https://discord.gg/2bUeSSW and get upto 25,000 coins a week to grow your server extremly fast. Cool, right?`)
    .addField(`** Coin Transaction History**`, logs.length == 0 ? "No transaction history found!" : logs.join("\n")) 
    message.channel.send(embed) 
  } 
} 
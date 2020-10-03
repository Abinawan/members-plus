const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')

module.exports = {
  name: "bbalance",
  aliases: ["bbal"],
  description: "displays the user's balance.",
  execute: async(client, message, args, data, db) => {
   
     let owners = ["701731392228163587", "728602105018843227"] 
    
    if (!owners.includes(message.author.id)) return
  
    let user = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first() || message.author
    
    //if we got an user by name, we must access to the user property 
    if (user.username === undefined) user = user.user
    
    data = await get(message, user)
    
    let logs = []
    
    data.logs.map((x, y) => {
      if (y < 10) logs.push(x)
    })
    
    const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor(`${user.username}'s Users+ coins balance`, user.displayAvatarURL())
    .setTitle(`Coin Balance: **${data.coins.toFixed(1)}** coins`)
    .setDescription(`**Want coins without joining server?**\nBuy coins from our official Discord Server https://discord.gg/usersplus and get upto 25,000 coins a week to grow your server extremly fast. Cool, right?`)
    .addField(`** Coin Transaction History**`, logs.length == 0 ? "No transaction history found!" : logs.join("\n"))
    .setFooter(`Users+ v3.0 | 2020 (C) | discord.gg/usersplus`)
    message.channel.send(embed) 
  } 
}
const Discord = require('discord.js')

module.exports = {
  name: "order",
  aliases: ["info"],
  description: "shows the current order of the guild.",
  execute: async(client, message, args, data, db) => {
   
    if (data.code == 0) return message.channel.send(`There isn't any order in this guild.`)
    
    let bar = []
    
    let progress = data.uses
    
    for (let i = 0;i < 10;i++) {
      progress = progress - (data.orders / 10)
      if (progress > 0) bar.push(`#`)
      else bar.push(`=`) 
    }
    
    let warn = ""
    
    await client.fetchInvite('https://discord.gg/' + data.code).catch(e => warn = "The invite link of this guild is expired! Please make a new order or no one will be able to join here!")
    
   const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor('Users+', client.user.displayAvatarURL())
    .setTitle(`${message.guild.name} order info:`)
    .setThumbnail(message.channel.guild.iconURL())
    .addField(`Want Faster Orders Completion?`, `Try to vote [Users+](https://top.gg/bot/728099900176334900/vote) on top.gg, You will get faster orders completion!`)
    .setDescription(`Total orders: ${data.orders}\nProgress: ${bar.join("")} ${data.uses}/${data.orders}`)
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`)

    message.channel.send(warn, embed) 
  } 
} 
const Discord = require('discord.js')
const { get } = require('../constructors/sqlite.js')

module.exports = {
  name: "vote",
  execute: async(client, message, args, data, db) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#8a8aff")
    .setAuthor('Users+', client.user.displayAvatarURL)
    .setTitle(`Vote Users+ in top.gg!`)
    .setThumbnail(client.user.displayAvatarURL) 
   .setDescription('**[Click to vote the bot!](https://top.gg/bot/728099900176334900/vote)**')

    .setFooter('Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW')
    message.channel.send(embed) 

  } 
}
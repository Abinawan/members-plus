const Discord = require('discord.js')
const { RichEmbed } = require("discord.js");
module.exports = {
  name: "invite",
  aliases: ["inv", "link", "invites", "invs"],
  description: "Invite Users+ in your server.",
  execute: async(client, message, args, data, db) => {
   
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setThumbnail(client.user.avatarURL())
    .addField('INVITE THE BOT TO YOUR SERVER ',`Invite the bot using this link:  https://discord.com/api/oauth2/authorize?client_id=728099900176334900&permissions=8&scope=bot`)    
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`)
    .setColor("#8a8aff")
    .setImage('https://i.gyazo.com/a65915aa5e7aa181d34d85bea1818be4.png')
    message.channel.send(embed)
      
    
  } 
}
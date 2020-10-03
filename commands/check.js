const Discord = require('discord.js')
const ms = require('parse-ms') 

module.exports = {
  name: "check",
  aliases: ["time"],
  description: "shows you the time left to be able to leave safety.",
  execute: async(client, message, args, data, db) => {
   
    let timeout = 259200000
    
    let time = []
    
    if (data.joinedDate !== null && timeout - (Date.now() - data.joinedDate) > 999) {
      Object.entries(ms(timeout - (Date.now() - data.joinedDate))).map((x, y) => {
        if (x[1] > 0 && y < 4) time.push(`**${x[1]} ${x[0]}**`)      })
      

      const noembed = new Discord.MessageEmbed()
      .setColor('#ac1f1f')
      .setAuthor('Users+', client.user.displayAvatarURL())
      .setTitle(`Server check for ${message.author.username}`)
      .setThumbnail(message.channel.guild.iconURL())
      .setDescription(`You will lose 2 coins if you leave now!`)
      .addField(`Time remaining:`, time.join(", "), false)
      .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`)
      message.channel.send(noembed)    } else {
      const embed = new Discord.MessageEmbed()
      .setColor('#1fa03c')
      .setAuthor('Users+', client.user.displayAvatarURL())
      .setTitle(`Server check for ${message.author.username}`)
      .setThumbnail(message.channel.guild.iconURL())
      .setDescription(`You can leave the server without losing any coins.`)
      .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`)
      message.channel.send(embed) 
    } 
  } 
}
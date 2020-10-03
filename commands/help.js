const Discord = require('discord.js')

module.exports = {
  name: "help",
  aliases: ["help"],
  description: "displays the bot commands list.",
  execute: async(client, message, args, data, db) => {
          
    
    const embed = new Discord.MessageEmbed()
    .setColor("#000000")
    .setAuthor('Users+', client.user.displayAvatarURL())
    .setTitle(`Users+ Commands v2.0 📑`)
    .setThumbnail(client.user.displayAvatarURL())
    .setImage('https://gyazo.com/352838771da39f9dbb3a58803cfd4641')
    .setDescription(`If you need more help, feel free to ask our support team in the server https://discord.gg/2bUeSSW.\n\n\`-help\`: Show help command.\n\`-invite\`: Invite the bot to your server.\n\n\`-find\`: Find some servers to join for coins.\n\`-bal\`: Check your coins balance.\n\`-pay\`: Pay some coins to other.\n\`-check\`: Check where you can leave servers.\n\`-info\`: See your order information.`)
    
    .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`)
    message.channel.send(embed).catch(e => message.channel.send(`I don't have permission to send embed message here!`)) 
  }
}
const Discord = require('discord.js')
const ms = require('parse-ms')

module.exports = {
  name: "stats",
  aliases: ["stats"],
  description: "",
  execute: async(client, message, args, data, db) => {

    let owners = [ "728602105018843227", "701731392228163587"]

	if(!owners.includes(message.author.id)) return;
    owners.map(x => owners.push(client.users.cache.get(x)))

    let uptime = []

    Object.entries(ms(client.uptime)).map((x, y) => {
      if (x[1] > 0 && y < 4) uptime.push(`**${x[1]} ${x[0]}**`)
    })


    const embed = new Discord.MessageEmbed()
    .setColor(process.env.PINK)
    .setTitle(`${client.user.username} stats`)
    .setThumbnail(client.user.displayAvatarURL())
    .addField(`Memory Usage:`, (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + "MB", false)
    .addField(`Servers Count:`, `${client.guilds.cache.size}`, false)
    .addField(`Users Count:`, `${client.users.cache.size}`, false)
    .addField(`Shards:`, `5`, false) 
    .addField(`Uptime:`, uptime.join(", "), false)
    message.channel.send(embed)
  }
}

const Discord = require('discord.js')


module.exports = {
  name: "orderdelete",
  aliases: ["delorders", "del"],
  description: "Delete server's orders",
  execute: async(client, message, args, data, db) => {
    let onwerId = ["701731392228163587"]

    if(!onwerId.includes(message.author.id)) return;

    let serverid = args[0]


    db.delete(`code_${serverid}`)
    db.delete(`description_${serverid}`) 
    db.delete(`orders_${serverid}`)
    console.log(`the order of guild ${serverid} has been deleted!`);
    message.channel.send(`the order of guild **${client.guilds.cache.get(serverid).name}** has been deleted!`);
    let channelll = client.channels.cache.get("744923283941752983")
    let embed = new Discord.MessageEmbed()
    .setTitle(`Server Order Deleted!`)
    .setDescription(`<@${message.author.id}> Deleted **${client.guilds.cache.get(serverid).name}** Orders!`)
    channelll.send(embed)

} 
} 
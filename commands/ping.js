const Discord = require('discord.js')

module.exports = {
  name: "ping",
  aliases: ["ping"],
  description: "returns the bot's latency.",
  execute: async(client, message, args, data, db) => {
   
    console.log(data)
    
    //simple ping command
    message.channel.send(`Pinging...`)
    .then(messageTime => {
      messageTime.edit(`Pong! ${messageTime.createdTimestamp - message.createdTimestamp}ms`) 
    }) 
  } 
} 
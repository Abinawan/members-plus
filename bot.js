const http = require ('http');
const express = require('express');
const app = express();
const { RichEmbed } = require("discord.js");


//require discord library 
const Discord = require('discord.js');

//make a discordN client for the bot

const client = new Discord.Client({ fetchAllMembers: false, messageCacheMaxSize: 5 }); 

//require quick.db for a database
const db = require('quick.db');
const fs = require('fs');
client.commands = new Discord.Collection();
const files = fs.readdirSync('./commands/').filter(file => file.endsWith(".js")); 
for (const commands of files) {
  const command = require(`./commands/${commands}`);
  if (command.name) client.commands.set(command.name, command); 
} 
client.on("ready", async () => {
  const event = require('./events/ready.js').execute(client, db) 
})
client.on("message", async message => {
  try {
  const event = require('./events/message.js').execute(client, message, prefix, db) 
  } catch(e) {
    return message.channel.send(e.message) 
  } 
})

client.on("guildMemberAdd", async member => {
  const event = require('./events/guildMemberAdd.js').execute(client, member, db) 
})
client.on("guildMemberRemove", async member => {
  const event = require('./events/guildMemberRemove.js').execute(client, member, db) 
})

client.on("guildCreate", async guild => {
  console.log("new guild!") 
	const event = require('./events/guildCreate.js').execute(client, guild) 
}) 

client.on("guildDelete", async guild => {
  console.log("Left guild!") 
	const event = require('./events/guildDelete.js').execute(client, guild) 
}) 

client.login('YOUR_BOT_TOKEN')

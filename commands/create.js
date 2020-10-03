const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "giftcode",
    description: "Redeem Code for coins!",
    execute: async(client, message, args, data, db) => {

      if(args[0] == 'create') {

        let COINS = Number(args[1])
        if (!COINS || isNaN(COINS) || COINS < 1) return message.channel.send(`Commanding incorrect!\nIn order to buy giftcard, do \`-giftcode create <numberOfCoins> <Code>\``)
        if (COINS > data.coins) return message.channel.send(`${message.author.username} you don't have enough Balance.\n\n\`If you Are Getting this ! please Try joining Some servers First then Try this command again\``)
        COINS = Math.round(COINS)

      let CODE = args[2]
      message.reply(`Check dm!`)
      message.delete()
      let embed = new Discord.MessageEmbed()
      .setTitle(`Gift Code Generated!`)
      .setDescription(`<@${message.author.id}> You have Converted your coins into Gift Code!`)
      .addField(`Code:`, `${CODE}`, false)
      .addField(`Total Coins:`, `${COINS}`, false)
      .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
      .setTimestamp()
      .setColor("GREEN")
      .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: "png", dynamic: true }))
      message.author.send(embed)
      await new Promise(resolve => setTimeout(resolve, 100))
      db.add(`code_` + CODE, COINS)
      db.subtract(`coins_${message.author.id}`, Number(COINS))
      data.logs.unshift(`[-${COINS}] - Converted Coins into Gift Code.`)

      db.set(`logs_${message.author.id}`, data.logs)

      } else if(args[0] === 'redeem') {
        REDEEMINGCODE = args[1]
        let COINSTOADD = db.fetch(`code_` + REDEEMINGCODE)
        if (COINSTOADD == null || COINSTOADD == 0) {
              message.channel.send('This code has either been redeemed already or is invalid!')
            } else {
                const redeemed = new Discord.MessageEmbed()
                .setColor("#8a8aff")
                .setTitle(`CODE HAS BEEN REDEEMED SUCESSFULLY!`)
                .setFooter(`Users+ v3.0 | 2020 (C) | discord.gg/usersplus`)
                .setDescription(`<:dynoSuccess:744116811049730068> **You redeemed \`${COINSTOADD}\` coins from the Gift code!**`)
                message.channel.send(redeemed)
          data.logs.unshift(`[+${COINSTOADD}] - Redeemed a Gift code.`)
          db.set(`logs_${message.author.id}`, data.logs)
          db.add(`coins_${message.author.id}`, COINSTOADD)
          db.subtract(`code_` + REDEEMINGCODE, COINSTOADD)
            }
        } else {
          let helpembed = new Discord.MessageEmbed()
          .setTitle('Gift Code Command Help!')
          .addField(`\`-giftcode create <Coins> <Code>\``, `Using this you can convert your coins into Gift codes!`, false)
          .addField(`\`-giftcode redeem <Code>\``, `Using this you can redeem Gift Codes!`, false)
          .setFooter(`Users+ v3.0 | 2020 (C) | https://discord.gg/2bUeSSW`, message.author.displayAvatarURL({ format: "png", dynamic: true }))
          .setColor('YELLOW')
        message.channel.send(helpembed)
        }
    
     }

  }

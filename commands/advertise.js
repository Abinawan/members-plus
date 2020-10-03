const Discord = require('discord.js')

module.exports = {
  name: "advertise",
  aliases: ["buy"],
  description: "used to advertise your server and get members on your Server.",
  execute: async(client, message, args, data, db) => {

    let amount = Number(args[0])

    let description = args.slice(1).join(" ")
    if(amount < 5) return message.channel.send('You need atleast **5** coins to buy users for your server!')
    if (data.coins < 5) return message.channel.send(`You need atleast **5** coins to buy users for your server!`)
    if (!amount || isNaN(amount) || amount < 1) return message.channel.send(`Commanding incorrect!\nIn order to buy users for your server do \`-buy <numberOfCoins> <description>\` [1 coin = 1 user]`)

    if (amount > data.coins) return message.channel.send(`${message.author.username} you don't have enough Balance. You only have ${amount} coins.\n\n\`If you Are Getting this ! please Try joining Some servers First then Try this command again\``)

    amount = Math.round(amount)

    let link = data.code

    if (link == 0) {
      link = await message.channel.createInvite({ maxAge: 0 })

      link = link.code
    }

    await client.fetchInvite('https://discord.gg/' + link).catch(async x => {
      link = await message.channel.createInvite({ maxAge: 0 })
      link = link.code
      console.log(link)
    })

    if (description && description.includes("discord.gg")) return message.channel.send(`Unfortunately I don't accept invite links in description. Remove them please!`)
    if (description && description.includes("https://", "http://")) return message.channel.send(`I don't accept Website and Server links`)
    if (description && description.length > 15) return message.channel.send(`The message exceed the limit of 15 words`)

    message.channel.send(`Successfully bought ${amount} coins for your server, you can see the currents order with \`-info\`.`)

    await new Promise(resolve => setTimeout(resolve, 100))

    db.set(`code_${message.guild.id}`, link)

    data.logs.unshift(`[-${amount}] - Advertise ${message.guild.name}(${message.guild.id}) server.`)

    db.set(`logs_${message.author.id}`, data.logs)

    db.set(`description_${message.guild.id}`, `${description === undefined ? "" : description}\nhttps://discord.gg/${link}`)

    db.add(`orders_${message.guild.id}`, amount)

    db.subtract(`coins_${message.author.id}`, amount)

    let logchannel = client.channels.cache.get('746439017738010735')
    let embed = new Discord.MessageEmbed()
    .setTitle('User made Orders')
    .addField(`Server name:`, `${message.guild.name}`, false)
    .addField(`Server Id:`, `${message.guild.id}`, false)
    .addField(`Amount of Orders`, `${Number(args[0])}`, false)
    .addField(`description`, `${args.slice(1).join(" ")}`, false)
    .setColor("YELLOW")
    .setFooter(`Users+ v3.0 | 2020 (C) | discord.gg/usersplus`)
    .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
    logchannel.send(embed)

  }
}

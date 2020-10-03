const db = require("quick.db");
const express = require("express"),
  { post } = require("superagent"),
  app = express();

module.exports = {
  execute: async(client) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get("/", async (req, res) => {
      res.send(`
How to setup
<br>
1. Fork/remix this glitch project: <a href="https://glitch.com/edit/#!/remix/dbl-webhook-example">Link</a>
<br>
2. Add your Discord webhook url to the .env file in the ' Webhook="Url here" '
<br>
3. Add your Authorization password to the .env file in the ' Auth="Password" '
<br>
4. Go to "https://top.gg/bot/YourBotID/edit" scroll down to "Webhook" the put the URL to "http://yourprojectname.glitch.me/dblhook" and set the "Authorization" to what you put in the .env file!
<br>
5. After all of that.. press "Save" on top.gg and then press "Test" and it should work!
`);
    });
    app.post("/dblhook", async (req, res) => {
      let auth = req.headers["authorization"];
      if (!auth)
        return res.json({
          status: "Failed",
          message: `You didn't provide a 'Authorization' header!`
        });
      if (auth !== process.env.Auth)
        return res.json({
          status: "Failed",
          message: `You didn't provide the correct authorization key!`
        });
      if (!req.body)
        return res.json({
          status: "Failed",
          message: `You didn't provide any data!`
        });
      let user = req.body.user,
        bot = req.body.bot;
      let logs = await db.fetch(`logs_${user}`)
if (logs === null) logs = []
logs.unshift(`[+1] - Voted Users+ Bot in Discord Bot List.`)
db.set(`logs_${user}`, logs) 
      db.add(`coins_${user}`, 1)
      post(process.env.Webhook)
        .send({
          embeds: [
            {
              author: {
                name: `New Vote:`,
                icon_url: client.users.get(user).displayAvatarURL, //`https://cdn.discordapp.com/attachments/657989418749263872/662378425956171786/IMG_20200102_202611.jpg`
              },
              description: `${client.users.get(user).tag} Thanks for voting for ${client.user.username}, I rewarded you with 1 coins.`,
              color: 15878608
            }
          ]
        })
        .catch(e => {});
    });
    app.listen(4000, () => console.log(`Website is up and running`));
  }
};

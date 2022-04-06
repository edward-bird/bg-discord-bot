const {Client, Intents, Message} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

const {startDB} = require('./functions/mongoDb');

const {commandHandler} = require('./functions/commandHandler');

const config = require('./config.json');

client.on('ready', async client => {
    await startDB();
    console.log("STARTED");
    client.channels.fetch(config.channelID).then(channel => {
        channel.send('стартанул');
        /*setInterval(() => {
            getUserData('dirtyprophet#2508', (err, response, body) => {
                const allGames = JSON.parse(body)['data']['allGameRecords'];
                const lastGame = allGames[allGames.length - 1];
                const currentMMR = lastGame['mmr'];
                channel.send(`ВЛАД 3к лох, а Глеб ${currentMMR} фрик`);
            });
        }, checkTimer);*/
    });

});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return null;
    if (!msg.content.startsWith(config.prefix)) return null;

    const commandBody = msg.content.slice(config.prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command.length !== 0){
        await commandHandler(command,args,msg);
    }

});

/*client.on('message', async msg => {
    if (msg.author.id !== client.user.id && msg.channel.id === channelID && msg.content === '1') {
        let currentUserID = msg.author.id;
        await userExist(currentUserID).then(async (userExist) => {
            if (userExist) {
                await msg.reply(`ЗДАРОВА`);
            } else {
                msg.channel.send('Пиши BattleID в формате name#id (пример: dirtyprophet#2508)')
                    .then(() => {
                        console.log("work")
                        msg.channel.awaitMessages({
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        })
                            .then(async msg => {
                                const userBattleID = msg.first().content;
                                await createUser(currentUserID, userBattleID);
                                msg.first().channel.send(`ЕСТЬ ${userBattleID} ЕСТЬ`);
                            })
                            .catch(collected => {
                                msg.channel.send('Тормоз-фрик');
                            })
                    })
            }
        });

    }
});*/

client.login(config.token);
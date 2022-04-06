const {Client, Intents, Message} = require('discord.js');
const {createUser, userExist, getBattleID} = require('./dbFunctions');
const {getUserData} = require('./getData');
const {mmrEmbed} = require('./embedGenerator')

const commandHandler = async (command, args, msg) => {
    const currentUserID = msg.author.id;
    switch (command) {
        case 'mmr': {
            await getMmr(currentUserID, args, msg);
            break;
        }
        case 'reg': {
            await registration(currentUserID, msg);
            break;
        }
        default: msg.reply('Нет такой команды');
    }
}

const getMmr = async (id, args, msg) => {
    let battleID = null;
    if (args.length === 0){
        await userExist(id).then(async (userExist)=>{
            if (!userExist){
                msg.reply('Надо зарегестрироваться !reg');
            } else {
                battleID = await getBattleID(id);
            }
        });
    } else {
        battleID = args[0];
    }
    if (battleID !== null){
        await getUserData(battleID, async (err, response, body) =>{
            const allGames = JSON.parse(body)['data']['allGameRecords'];
            if (allGames.length === 0) {
                msg.reply('Тебя нет в базе, фрик');
                return;
            }
            const lastGame = allGames[allGames.length - 1];
            const currentMMR = lastGame['mmr'];
            msg.reply({embeds: [mmrEmbed(battleID, currentMMR.toString())]});
        })
    }

}

const registration = async (id, msg) => {
    if (await userExist(id)) {
        msg.reply('Ты уже зарегистрирован фрик');
        return;
    }
    msg.channel.send('Пиши BattleID в формате name#id (пример: dirtyprophet#2508)')
        .then(() => {
            msg.channel.awaitMessages({
                max: 1,
                time: 60000,
                errors: ['time']
            })
                .then(async msg => {
                    const userBattleID = msg.first().content;
                    await createUser(id, userBattleID);
                    msg.first().channel.send(`ЕСТЬ ${userBattleID} ЕСТЬ`);
                })
                .catch(collected => {
                    msg.channel.send('Тормоз-фрик');
                })
        })
}

module.exports = {commandHandler};
const {Client, Intents, Message} = require('discord.js');
const {createUser, userExist, getBattleID, getAllUsers, setLastGame} = require('./dbFunctions');
const {getUserData} = require('./getData');
const {mmrEmbed} = require('./embedGenerator');
const interval = 60000;
let repeatStarted = false;

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

        case 'repeat':{
            if(repeatStarted){
                msg.reply('Уже наблюдаю');
            } else {
                msg.reply('НАБЛЮДАЮ');
                repeatStarted = true;
                setInterval(() => checkLastGame(msg), interval);
            }
            break;
        }
        default: msg.reply('Нет такой команды');
    }
}

const checkLastGame = async (msg) => {
    console.log('check...');
    const users = await getAllUsers();
    for (let user in users) {
        if (users.hasOwnProperty(user)){
            const battleTag = users[user]['battleTag'];
            const currentBattleID = users[user]['lastBattleID'];
            await getUserData(battleTag, async (err, response, body) => {
                const allGames = JSON.parse(body)['data']['allGameRecords'];
                if (allGames.length !== 0) {
                    const lastGame = allGames[allGames.length - 1];
                    const lastBattleID = lastGame['id'];
                    if (lastBattleID !== currentBattleID){
                        const mmrChangeString = lastGame['mmrChange'].toString();
                        const mmrChangeInt = Number.parseInt(mmrChangeString, 10);
                        await setLastGame(battleTag, lastBattleID);
                        msg.channel.send(`${battleTag} ${mmrChangeResponse(mmrChangeInt)}${mmrChangeInt} ммр`);
                    }
                }
            })
        }
    }
}

const mmrChangeResponse = (mmrChangeInt) =>{
    if (mmrChangeInt >= 0 && mmrChangeInt < 20){
        return "Фрику повезло, поднял ";
    }
    if (mmrChangeInt >= 20 && mmrChangeInt < 60){
        return "Вонючка залез в топ 3 и поднял  ";
    }
    if (mmrChangeInt >= 60){
        return "Сыграл умом и получил ";
    }
    if (mmrChangeInt < 0 && mmrChangeInt >= -20){
        return "Фрику не повезло, потерял ";
    }
    if (mmrChangeInt < -20 && mmrChangeInt >= -60){
        return "Сосалыч ты??? Опустился на ";
    }
    if (mmrChangeInt < -60){
        return "ОСВОИЛ БУТЫЛКУ! проебано "
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
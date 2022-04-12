const {Client, Intents, Message} = require('discord.js');
const {createUser, userExist, getBattleID, getAllUsers, setLastGame} = require('./dbFunctions');
const {getUserData} = require('./getData');
const {mmrEmbed, matchResultEmbed, topMmrEmbed} = require('./embedGenerator');
const interval = 60000;
let repeatStarted = false;
let intervalFunction;

let mmrList = [];
let updateMmrList = [];

const commandHandler = async (command, args, msg) => {
    const currentUserID = msg.author.id;
    switch (command) {
        case 'top':{
            /*await getAllUsersGames(getTopMmr).then(async () => {
                await printTopMmr(msg).then(() => mmrList.length = 0);
            });*/
            break;
        }
        case 'test':{
            await getAllUsersGames(checkLastGames).then(async () => {
                printUpdateMmr(msg).then(() => updateMmrList.length = 0);
            });
            break;
        }
        case 'mmr': {
            await getMmr(currentUserID, args, msg);
            break;
        }
        case 'reg': {
            await registration(currentUserID, msg);
            break;
        }
        case 'watch':{
            if(repeatStarted){
                msg.reply('Уже наблюдаю');
            } else {
                msg.reply('Наблюдаю...');
                repeatStarted = true;
                intervalFunction = setInterval(() => getAllUsersGames(checkLastGames)
                    .then(async () => printUpdateMmr(msg))
                    .then(() => updateMmrList.length = 0), interval);
            }
            if (args.length !== 0 && args[0] === 'stop'){
                repeatStarted = false;
                clearInterval(intervalFunction);
                msg.reply('Не подсматриваю');
            }
            break;
        }
        default: msg.reply('Нет такой команды');
    }
}

const printTopMmr = async (msg) => {
    mmrList.sort((a, b) => a.mmr > b.mmr ? -1 : 1);
    await msg.channel.send({embeds: [topMmrEmbed(mmrList)]});

}

const printUpdateMmr = async (msg) => {
    return Promise.all(updateMmrList.map(async (elem) => {
        await msg.channel.send({embeds: [matchResultEmbed(
                elem['hero'],
                elem['mmrChangeInt'],
                elem['currentMMR'],
                elem['position'],
                elem['battleTag']
            )]});
    }))

}

const getTopMmr = async (user) => {
    return new Promise((resolve, reject) => {
        const battleTag = user['battleTag'];
        getUserData(battleTag, async (err, response, body) => {
            try {
                const allGames = JSON.parse(body)['data']['allGameRecords'];
                if (allGames.length !== 0) {
                    mmrList.push({
                        battleTag: battleTag,
                        mmr: allGames[allGames.length - 1]['mmr']
                    })
                    resolve();
                }
            } catch (e) {
                reject();
            }
        });
    });
}

const checkLastGames = async (user) => {
    console.log('checking new games...');
    return new Promise((resolve, reject) => {
        const battleTag = user['battleTag'];
        getUserData(battleTag, async (err, response, body) => {
            try {
                const allGames = JSON.parse(body)['data']['allGameRecords'];
                if (allGames.length !== 0) {
                    const lastGame = allGames[allGames.length - 1];
                    const lastBattleID = lastGame['id'];
                    if (lastBattleID !== user['lastBattleID']) {
                        updateMmrList.push({
                            battleTag: battleTag,
                            mmrChangeString: lastGame['mmrChange'].toString(),
                            mmrChangeInt: Number.parseInt(lastGame['mmrChange'].toString(), 10),
                            hero: lastGame['hero'],
                            currentMMR: lastGame['mmr'],
                            position: lastGame['position']
                        });
                        await setLastGame(user['battleTag'], lastBattleID);
                    }
                }
                resolve();
            } catch (e) {
                reject();
            }
        });
    });
}

const getAllUsersGames = async (handler) => {
    return new Promise(async (resolve, reject) => {
        const users = await getAllUsers();
        Promise.all(users.map(handler)).then(() => resolve());
    });

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
            let allGames;
            try {
                allGames = JSON.parse(body)['data']['allGameRecords'];
            } catch (e) {
                console.log(e);
            }
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
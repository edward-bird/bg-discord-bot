const { MessageEmbed } = require('discord.js');
const bgHeroes = require('../hs-bg.json');
const prettyLink = require('prettylink');
//HsJI8XPxeS

const mmrImages = [
    'https://vk.com/doc128984411_592674013?hash=f59fa72b596586f3d2&dl=6ccd3e61f0db31568a&wnd=1',
    'https://c.tenor.com/ed007AHDBp0AAAAC/silver-name-rage.gif',
    'https://c.tenor.com/9rddk-jAU3MAAAAd/silver-name-rage.gif',
    'https://c.tenor.com/k6-aoEHN4OoAAAAd/silvername.gif',
    'https://c.tenor.com/GniZtqoqxSQAAAAd/silver-name-rage.gif',
    'https://c.tenor.com/8fic23MFgcEAAAAi/jijaedeb.gif',
    'https://c.tenor.com/mu52sraP18gAAAAC/skinnytown.gif',
    'https://c.tenor.com/ee-5VJ4J9WoAAAAd/wild-q-hearthstone.gif',
    'https://c.tenor.com/m1dhXPDU9GcAAAAd/battlegrounds-hearthstone.gif',
]

const afterGameImages = [
    'https://media1.tenor.com/images/173a57cec462b751a130ac297ca44fcd/tenor.gif?itemid=25349731',
    'https://media1.tenor.com/images/90a1fa14e3b07bb41a60c5e4d2f9c086/tenor.gif?itemid=25349747',
    'https://c.tenor.com/g2kCTsNgDBYAAAAd/monkey-exercise-zzsoobn.gif',
    'https://c.tenor.com/tOsBzTwsVFUAAAAC/dont-lose-giants-gaming.gif',
    'https://media1.tenor.com/images/16af6595ad8be21e2bf2ec490c7a1cef/tenor.gif?itemid=25349806',
    'https://media1.tenor.com/images/72de4bb616e39c05fda85f47dda7f51f/tenor.gif?itemid=25349783',
    'https://c.tenor.com/kpQ-_wIRCEAAAAAd/rage-mad.gif',
    'https://media1.tenor.com/images/ffd5aebebe135c9ddbcffab8e1d96706/tenor.gif?itemid=25349768'
]

const mmrEmbed = (battleID, mmr) => {
    const battleIDSeparated = battleID.split('#');
    return (new MessageEmbed()
            .setColor('#8c00ff')
            .setTitle(battleID.toString())
            .addField('Забустился доооо:', `${mmr} ММР`, true)
            .setURL(`http://bgstats.cintrest.com/${battleIDSeparated[0]}-${battleIDSeparated[1]}`)
            .setImage(mmrImages[Math.floor(Math.random() * mmrImages.length)])
            .setFooter({
                text: 'Ну и фрик конечно!',
                iconURL: 'https://i.kym-cdn.com/photos/images/newsfeed/001/454/633/14f.png'
            })
            .setTimestamp()

    )

}

const helpEmbed = () => {
    return (new MessageEmbed()
            .setColor('#f4fd85')
            .setTitle("Список всех команд")
            .addFields(
                {name: '!mmr', value: 'Ммр'},
                      {name: '!top', value: 'Топ ммра данного дискорд канала', inline: true},
                      {name: '!graph', value: 'График изменения ммра, последние 250 игр'},
                      {name: '!last', value: 'Последние 10 игр', inline: true},
                      {name: '!watch', value: 'Мониторинг новых игр и вывод в канал (по умолчанию включено)'},
                      {name: '!watch stop', value: 'Остановить мониторинг', inline: true},
            )
            .setDescription("Команда без аргументов возвращает твои значения, возможен аргумент BattleTag игрока")

    )

}

const graphEmbed = async (battleID, graph) => {
    const tinyImgUrl = new prettyLink.TinyURL();
    const result = await tinyImgUrl.short(graph);
    return (new MessageEmbed()
            .setColor('#ff8b8b')
            .setTitle(battleID.toString())
            .setImage(result)
    )

}

const lastGamesEmbed = (battleID, lastGames) => {
    const battleIDSeparated = battleID.split('#');
    return (new MessageEmbed()
            .setColor('#aaff85')
            .setTitle(`Последние 10 игр ${battleID.toString()}`)
            .setURL(`http://bgstats.cintrest.com/${battleIDSeparated[0]}-${battleIDSeparated[1]}`)
            .setDescription(lastGames)
            .setFooter({
                text: 'как же он бустится',
                iconURL: 'https://c.tenor.com/o9mGGS0CDRwAAAAi/scratch-cat.gif'
            })
    )

}
const topMmrEmbed = (mmrList) => {
    let toEmbed = '';
    mmrList.forEach((item, i) => {
        toEmbed += `Топ #${i + 1}: ${item['battleTag']} -------- ${item['mmr']} ммр\n\n`;
    });
    return new MessageEmbed()
        .setColor('#85ff95')
        .setTitle('ТОП ММРа ДАННОГО ДИСКОРД КАНАЛА: ')
        .setFooter({
            text: 'До завупача вам еще расти и расти',
            iconURL: 'https://media1.tenor.com/images/8cddf9bddd6f59a3a2636cbb21319cef/tenor.gif?itemid=25360393'})
        .setDescription(toEmbed);


    /*mmrList.forEach((item, i) => {
        /!*embed.addField(`\u200B`, `#${i+1}`, true);
        embed.addField(`\u200B`, `${item['battleTag']}`, true);
        embed.addField(`\u200B`, `${item['mmr']}`, true);
        embed.addField(`\u200B`, '\u200B', false);*!/
        /!*embed.addField(`${i+1}:`, '\u200B');
        embed.addField(`${item['mmr']}`, 'aa', true);*!/
    })*/
}

const matchResultEmbed = (hero, mmrChange, currentMMR, position, battleID) => {
    const battleIDSeparated = battleID.split('#');
    return (new MessageEmbed()
            .setColor('#ffdb52')
            .setTitle(`${battleID.toString()} скатал каточку!`)
            .setURL(`http://bgstats.cintrest.com/${battleIDSeparated[0]}-${battleIDSeparated[1]}`)
            .addFields(
                {name: '\u200B', value: '\u200B'},
                      {name: 'Забустился до: ', value: `${currentMMR.toString()} ммр`, inline: true},
                      {name: `${(mmrChange >= 0 ? 'Поднял' : 'Потерял' )}`, value: mmrChange.toString(), inline: true},
                      {name: 'Закончил на', value: `${position.toString()} месте`, inline: true}
            )
            .setTimestamp()
            .setThumbnail(bgHeroes[hero])
            .setDescription(mmrChangeResponse(mmrChange))
            .setImage(afterGameImages[parseInt(position, 10) - 1])
    )
};

const mmrChangeResponse = (mmrChangeInt) =>{
    if (mmrChangeInt >= 0 && mmrChangeInt < 20){
        return "Фрику повезло";
    }
    if (mmrChangeInt >= 20 && mmrChangeInt < 60){
        return "Вонючка залез в топ 3";
    }
    if (mmrChangeInt >= 60){
        return "Сыграл умом";
    }
    if (mmrChangeInt < 0 && mmrChangeInt >= -20){
        return "Фрику не повезло";
    }
    if (mmrChangeInt < -20 && mmrChangeInt >= -60){
        return "Сосалыч ты???";
    }
    if (mmrChangeInt < -60){
        return "ОСВОИЛ БУТЫЛКУ!"
    }
}

module.exports = {mmrEmbed, matchResultEmbed, topMmrEmbed, lastGamesEmbed, graphEmbed, helpEmbed};
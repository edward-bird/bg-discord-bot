const { MessageEmbed } = require('discord.js');
const bgHeroes = require('../hs-bg.json');

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
    'https://psv4.userapi.com/c812737/u128984411/docs/3c8910d99e91/giphy.gif?extra=a2L3zk14h7TX_UHRlzq4rVy_D6rXpJHz9lSSx-7JvD2GTZV51MV8P2f9wQiUp3nhzAvpu_w30aNCp_LJCwgKslMBNx6jD0QzX8UeDUB6GZ6jy4xH0LKOXS9oqshzfEkYO0gPr53yCfD2hyJriEmLkwP58w',
    'https://psv4.userapi.com/c414620/u2000039553/docs/568ff4417858/file.gif?extra=CaTIshWdaW8Drj7JLtSPldwciWzpBlEgUujb8St226iw8u58Z0VXh6dwDfWOQn6wln62Y99rLTYL75lzMZEp_nFuaZ57piwgYlTkFQKcqLypkvKjqcopfxpj0lg6cj_YksZajbKFm-uO9jQefKqgoSBz7A',
    'https://c.tenor.com/g2kCTsNgDBYAAAAd/monkey-exercise-zzsoobn.gif',
    'https://c.tenor.com/tOsBzTwsVFUAAAAC/dont-lose-giants-gaming.gif',
    'https://psv4.userapi.com/c536132/u181849065/docs/d3/c3842ac478d7/proschay_bebra.gif?extra=XGIWi1J4agbhqNnuCPFFh2GAH3ghmi34O-_wtMq1uoCepy40r7x7Xhtgkuxcg3o3rluUFvwkhysZZPX4jr-heQeUykpf3klsszW-tWlKbQgUdPX2Ud7eBTWDaIazbGXPDjxlUxS4SD0-ah4fDDcuLj4gsA',
    'https://psv4.userapi.com/c816124/u2000038128/docs/5bef20350988/file.gif?extra=6k3HdO4ryHOg1cUo_EGcNhyTLfFZxZ7mCJPJ-tjehUaLk53QNsDjfQ5v0HwO2P2XCZZ9S6oSgiPx6GJV9kNT07D8z4XdnuAFQm2GtIr8ii-xfKOlhwCPcGBEOrhPnYvHJMaEGull78Kg9iM4NgAwdJn5Dw',
    'https://c.tenor.com/kpQ-_wIRCEAAAAAd/rage-mad.gif',
    'https://psv4.userapi.com/c537232/u405430912/docs/d33/91def1552e78/195.gif?extra=2lcBqVV-LLtEs0KSWybIjEtciHu4hJb5mVj546r2wGR3JDrz9_JDhFC4gaKhMzSb5kZw19homtT6r702NXmvGiVPA79lI_-dtMv9bd2VH5GudD3pcXVBxx1foU8jQK8PcOarZc8ZZP8txyYiJxyDmViVIQ'
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

module.exports = {mmrEmbed, matchResultEmbed};
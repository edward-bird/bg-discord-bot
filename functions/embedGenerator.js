const { MessageEmbed } = require('discord.js');

const images = [
    'https://c.tenor.com/jwgmQHsOOjoAAAAd/silvername-rage.gif',
    'https://c.tenor.com/ed007AHDBp0AAAAC/silver-name-rage.gif',
    'https://c.tenor.com/9rddk-jAU3MAAAAd/silver-name-rage.gif',
    'https://c.tenor.com/k6-aoEHN4OoAAAAd/silvername.gif',
    'https://c.tenor.com/GniZtqoqxSQAAAAd/silver-name-rage.gif',
    'https://c.tenor.com/8fic23MFgcEAAAAi/jijaedeb.gif',
    'https://c.tenor.com/mu52sraP18gAAAAC/skinnytown.gif',
    'https://c.tenor.com/ee-5VJ4J9WoAAAAd/wild-q-hearthstone.gif',
    'https://c.tenor.com/m1dhXPDU9GcAAAAd/battlegrounds-hearthstone.gif'
]

const mmrEmbed = (battleID, mmr) => {
    const battleIDSeparated = battleID.split('#');
    return (new MessageEmbed()
            .setColor('#8c00ff')
            .setTitle(battleID.toString())
            .addField('Забустился до:', `${mmr} ММР`, true)
            .setURL(`http://bgstats.cintrest.com/${battleIDSeparated[0]}-${battleIDSeparated[1]}`)
            .setImage(images[Math.floor(Math.random() * images.length)])
            .setFooter({
                text: 'Ну и фрик конечно',
                iconURL: 'https://i.kym-cdn.com/photos/images/newsfeed/001/454/633/14f.png'
            })
            .setTimestamp()

    )

}

module.exports = {mmrEmbed};
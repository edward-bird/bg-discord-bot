const request = require('request')
const URL = 'http://bgstats.cintrest.com/graphql';

const getUserData = async (user, callback) => {
    try {
        await request.post(
            {
                url: URL,
                form: {
                    "operationName": null,
                    "variables": {},
                    "query": `{\n allGameRecords(player: \"${user}\")
                           {\n position\n mmr\n mmrChange\n hero\n id\n dateTime\n}\n}\n`
                },
            },
            callback)
    } catch (e){
        console.log('error:\n'+e);
    }

}
module.exports = {getUserData};
const request = require('request')
const URL = 'http://bgstats.cintrest.com/graphql';

const getUserData = async (user, callback) => {
    console.log(user);
    request.post(
        {
            url: URL,
            form: {
                "operationName": null,
                "variables": {},
                "query": `{\n allGameRecords(player: \"${user}\")
                           {\n position\n mmr\n mmrChange\n hero\n }\n}\n`
            },
        },
        callback)
}
module.exports = {getUserData};
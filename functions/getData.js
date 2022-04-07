const request = require('request')
const URL = 'http://bgstats.cintrest.com/graphql';

const getUserData = async (user, callback) => {
    request.post(
        {
            url: URL,
            form: {
                "operationName": null,
                "variables": {},
                "query": `{\n allGameRecords(player: \"${user}\")
                           {\n position\n mmr\n mmrChange\n hero\n id\n}\n}\n`
            },
        },
        callback)
}
module.exports = {getUserData};
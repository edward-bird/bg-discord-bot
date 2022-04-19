const {Schema, model} = require('mongoose');

const schema = new Schema({
    ID: {type: String, required: true},
    battleTag: {type: String, required: true},
    lastBattleID: {type: String, required: true},
    serverID: {type: String, required: true}
})

module.exports = model('User', schema);
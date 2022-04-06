const {Schema, model} = require('mongoose');

const schema = new Schema({
    ID: {type: String, required: true},
    battleTag: {type: String, required: true},
    lastBattleId: {type: String, required: false},
})

module.exports = model('User', schema);
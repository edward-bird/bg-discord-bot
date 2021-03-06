const User = require('../schemas/user');

const createUser = async (discordID, serverID, battleID) => {
    const newUser = new User({
        ID: discordID,
        battleTag: battleID,
        lastBattleID: 0,
        serverID: serverID
    })
    await newUser.save();
}

const userExist = async (discordID) => {
    const user = await User.find({ID: discordID});
    return (Object.keys(user).length !== 0);
}

const getBattleID = async (discordID) => {
    const user = await User.find({ID: discordID});
    return user[0]['battleTag'];
}

const getAllUsers = async (serverID) => {
    return await User.find({serverID: serverID});
}

const setLastGame = async (battleTag, gameID) => {
    await User.updateOne({battleTag: battleTag}, {lastBattleID: gameID});
}

module.exports = {createUser, userExist, getBattleID, getAllUsers, setLastGame};

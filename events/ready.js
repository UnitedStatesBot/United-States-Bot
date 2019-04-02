const mongoose = require("mongoose");
const config = require("../config.json");

mongoose.connect('mongodb://localhost:27017/Warns', {
    useNewUrlParser: true
}, (err) => {
    if (err) return console.error(err);
    console.log('[LOGS] Connected to MongoDB');
});

module.exports = async bot => {
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(`[LOGS] Logged in as ${bot.user.username}\n[LOGS] Invite Link: ${link}`);
    bot.user.setActivity("the United States Army", {
        type: "WATCHING"
    });
};

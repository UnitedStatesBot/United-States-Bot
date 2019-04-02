const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Warns");

const warnSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    warnedUser: String,
    warnedUserID: String,
    moderator: String,
    moderatorID: String,
    serverID: String,
    reason: String
});

module.exports = mongoose.model("Warn", warnSchema)

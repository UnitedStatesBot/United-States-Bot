const discord = require("discord.js");
const colours = require("../colours.json");
const mongoose = require("mongoose");
const bconfig = require("../config.json");
const Warn = require("../models/warn.js");
const {
    caseNumber
} = require(`../util/caseNumber.js`);

mongoose.connect("mongodb://localhost:27017/Warns", {
    useNewUrlParser: true
});

exports.run = async (client, message, args) => {
    let embed = new discord.RichEmbed()
        .setColor(colours.red)
        .setAuthor(`Insufficient Permissions`)
        .setDescription(`You must have the Headquarters or Server Handler role to execute this command.`)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp();

    let embed1 = new discord.RichEmbed()
        .setColor(colours.red)
        .setAuthor(`Insufficient Arguments`)
        .setDescription(`You must either tag a user to warn or enter their User ID.`)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp();

    let embed2 = new discord.RichEmbed()
        .setColor(colours.red)
        .setAuthor(`Error`)
        .setDescription(`Please create a channel called '\`usbot_logs\`'`)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp();

    if (!message.member.roles.has("561859008248545320") && !message.member.roles.has("561859008248545320")) return message.channel.send(embed);

    let wUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!wUser) return message.channel.send(embed1);

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"

    message.delete();

    let wChannel = message.guild.channels.find(c => c.name === "usbot_logs")
    let caseNum = await caseNumber(client, wChannel);
    if (!wChannel) return message.channel.send(embed2);

    let wembed = new discord.RichEmbed()
        .setColor(colours.green)
        .setAuthor(`Warning System`, message.guild.iconURL)
        .addField(`Warned User: `, `<@${wUser.id}> (${wUser.id})`)
        .addField(`Moderator: `, `<@${message.author.id}> (${message.author.id})`)
        .addField(`Reason: `, reason)
        .setFooter(`Case ${caseNum}`)
        .setTimestamp();

    const warn = new Warn({
        _id: mongoose.Types.ObjectId(),
        warnedUser: wUser.user.username,
        warnedUserID: wUser.id,
        moderator: message.author.username,
        moderatorID: message.author.id,
        serverID: message.guild.id,
        reason: reason
    });

    warn.save().catch(err => console.log(err));
    let idkembed = new discord.RichEmbed()
        .setColor(colours.green)
        .setAuthor(`Success`)
        .setDescription(`The warn of ${wUser} has been successfully saved to our database.`)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setTimestamp();

    message.channel.send(`<@${message.author.id}>`).then(m => m.delete());
    message.channel.send(idkembed);
    wChannel.send(wembed);
};

exports.help = {
    name: "warn"
};

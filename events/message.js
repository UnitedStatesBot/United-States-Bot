const config = require(`../config.json`);

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;

    if (message.content.startsWith(prefix)) {
        let commandFile = client.commands.get(command.slice(prefix.length));
        if (commandFile) commandFile.run(client, message, args);
    };
};

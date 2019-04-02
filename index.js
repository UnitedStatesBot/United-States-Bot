const discord = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");

const config = require("./config.json");

const client = new discord.Client({
    disableEveryone: true
});

client.commands = new discord.Collection();

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`[LOGS] Loaded event: ${evtName}`);
        client.on(evtName, evt.bind(null, client));
    });
});

fs.readdir('./commands/', async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        console.log(`[LOGS] Loaded command: ${cmdName}`);
        client.commands.set(props.help.name, props);
    });
});

client.login(process.env.BOT_TOKEN);

var fs = require('fs');

const { Client, Collection, Intents, GatewayIntentBits, Partials } = require('discord.js');
const config = require('./src/config/config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildWebhooks
    ],
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction
    ],
    ws: {
    properties: {
    $browser: "Discord iOS" 
    }}
});

const Discord = require('discord.js');

require('dotenv').config()

module.exports = client;

client.discord = Discord;
client.commands = new Collection();
client.slashCommands = new Collection();

require("./src/handler")(client);

client.login(config.token);

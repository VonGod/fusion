const Discord = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  name: "ip",
  description: "「Minecraft」Confira o status do servidor.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let canal_comandos = interaction.guild.channels.cache.get("1051648167910838304");

    if (interaction.channel.id != canal_comandos) {interaction.reply({ content: `Comandos permitidos apenas no canal <#1051648167910838304>`, ephemeral: true })} else {
     
     const ip = ("jogar.redefusion.net");

      if (!ip)
        return interaction.reply(
          `${interaction.user}, você deve inserir o IP de um servidor primeiro.`
        );
  
      const server = await fetch(
        `https://mcapi.us/server/status?ip=${ip}`
      ).then((res) => res.json());
  
      if (server.online) {
        let e = new Discord.EmbedBuilder()
  
          .setTitle(`INFORMAÇÕES DO SERVIDOR`)
          .setDescription(`:video_game: Endereço IP: \`\`${ip}\`\`\ \n Contamos com **${server.players.now.toLocaleString()}/${server.players.max.toLocaleString()}** jogadores online!\n\n **Site:** https://loja.redefusion.net/`)
          .setImage(`http://status.mclive.eu/${ip}/${ip}/banner.png`)
          .setColor('Gold')
          .setThumbnail(`https://mc-api.net/v3/server/favicon/${ip}`);
  
        await interaction.reply({embeds: [e]});;
      } else {
        interaction.reply({content: `${interaction.user}, o servidor do IP: **${ip}** encontra-se offline ou não existe.`, ephemeral: true});
      }
    }
}};
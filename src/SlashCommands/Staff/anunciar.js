const Discord = require("discord.js");

module.exports = {
    name: "anunciar", // Coloque o nome do comando
    description: "「Staff」Envie um anuncio de forma personalizada.",
    type: Discord.ApplicationCommandType.ChatInput,
  
    options: [
      {
          name: "canal",
          description: "Mencione o canal que o anuncio será enviado",
          type: Discord.ApplicationCommandOptionType.Channel,
          required: true
      },
      {
          name: "titulo",
          description: "Escreva um titulo para o anuncio.",
          type: Discord.ApplicationCommandOptionType.String,
          required: true
      },
    ],
    run: async (client, interaction) => {
  
      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
          interaction.reply(`Você não possui permissão para enviar um anuncio.`);
      } else {

        let canal = interaction.options.getChannel("canal")
        let titulo = interaction.options.getString("titulo")

        let filter = m => m.author.id === interaction.user.id
        const collector = interaction.channel.createMessageCollector({ filter, max: 1 });
        
        collector.on('collect', m => {
            interaction.channel.bulkDelete(1)
            let e = new Discord.EmbedBuilder()
            .setColor('DarkButNotBlack')
            .setTitle(titulo)
            .setDescription(`${m.content}`)
            .setTimestamp()
            .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
    
            canal.send({embeds: [e]});;
            interaction.channel.send(`O anúncio foi enviado para o canal ${canal} com sucesso!`)
            setTimeout(() => {
              interaction.channel.bulkDelete(1);
            }, 5000);
        });

        interaction.reply({content: `Envie a descrição do anúncio neste chat`, ephemeral: true})

      }
    }}
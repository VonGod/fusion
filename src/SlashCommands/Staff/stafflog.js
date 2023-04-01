const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "stafflog", 
  description: "「Staff」Enviar uma log de alteração da staff",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "staff",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Insira aqui o nick do staff",
        required: true,
      },
    {
        name: "cargo",
        type: Discord.ApplicationCommandOptionType.Role,
        description: "Insira aqui o cargo do staff",
        required: true,
      },
    {
        name: "log",
        type: Discord.ApplicationCommandOptionType.String,
        description: "Selecione a log a ser enviada.",
        required: true,
        choices: [
          {
            name: "Adicionado",
            value: "Adicionado",
          },
          {
            name: "Upado",
            value: "Upado",
          },
          {
            name: "Removido",
            value: "Removido",
          },
        ],
      },
  ],

  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })

    } else {
      let staff = interaction.options.getString("staff");
      let cargo = interaction.options.getRole("cargo");
      let log = interaction.options.getString("log");

      moment.locale('pt-br');
      let dia = moment().format('DD');
      let mes = moment().format('MM');
      let ano = moment().format('YYYY');

      let canal = interaction.guild.channels.cache.get("1051647752943194285")


      const embeds = {
        Adicionado: new Discord.EmbedBuilder()
        .setTitle(`**CHANGE-LOG | (${dia}/${mes}/${ano})**`)
        .setColor('Green')
        .setThumbnail(`https://mc-heads.net/avatar/${staff}/50`)
        .setDescription(`• **${staff}** Ingressou na equipe com o cargo ${cargo}`),
        Removido: new Discord.EmbedBuilder()
        .setTitle(`**CHANGE-LOG | (${dia}/${mes}/${ano})**`)
        .setColor('Red')
        .setThumbnail(`https://mc-heads.net/avatar/${staff}/50`)
        .setDescription(`• **${staff}** Foi exonerado(a) da equipe`),
        Upado: new Discord.EmbedBuilder()
        .setTitle(`**CHANGE-LOG | (${dia}/${mes}/${ano})**`)
        .setColor('Gold')
        .setThumbnail(`https://mc-heads.net/avatar/${staff}/50`)
        .setDescription(`• **${staff}** Foi promovido(a) para o cargo ${cargo}`)
    };
  
    canal.send({ embeds: [embeds[log]] });
      }

      interaction.reply({content: `Log enviada com sucesso!`, ephemeral: true})

    }
  }

const Discord = require("discord.js");

module.exports = {
  name: "ticket",
  description: "「Staff」Abra o painel de tickets.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
      interaction.reply(`Você não possui permissão para enviar um anuncio.`);
  } else {

    let canal = interaction.guild.channels.cache.get("1051649268462669854")

    const row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.StringSelectMenuBuilder()
      .setCustomId("Ticket")
      .setPlaceholder('Selecione a categoria do atendimento!')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label:"Dúvidas Gerais",
          description:"Tire suas dúvidas a respeito do servidor",
          value:"duvidas",
          emoji:"❓" 
        },
        {
          label:"Dúvidas Financeiras" ,
          description:"Tire suas dúvidas sobre compras de produtos",
          value:"compras",
          emoji:"🛒" 
        },
        {
          label:"Fazer uma Denúncia",
          description:"Realize denúncias de BUGS ou Jogadores",
          value:"denuncias",
          emoji:"⛔" 
        },
        {
          label:"Solicitar Tag",
          description:"Solicite a sua tag",
          value:"solicitar",
          emoji:"📋" 
        },
        
        ])
      )
    
    const embed = new Discord.EmbedBuilder ()
    .setTitle("📬 CENTRAL DE ATENDIMENTO")
    .setImage("https://i.imgur.com/5FIlRES.png")
    .setColor("Gold")
    .setDescription("Olá, seja bem-vindo(a) a central de atendimento **FUSION**, \n para iniciar seu atendimento é simples basta selecionar \n a categoria no menu a baixo  que um staff irá lhe auxiliar. \n\n`O mau uso do atendimento resultará em uma punição`\n")
    .addFields([
        {
          name: `Horário de atendimento:`,
          value: '🕒 **Seg. á Sex.** `10:00 as 20:00` \n 🕒 **Sab. á Dom.** `13:00 as 17:00`',
          inline: true
        },
        {
          name: `Utilitário:`,
          value: `🌐 [Já visitou nossa loja?](https://loja.redefusion.net/) \n 🎮 **jogar.redefusion.net**`,
          inline: true
        }
    ])

    canal.send({embeds: [embed], components: [row]})
    
    }}
    }

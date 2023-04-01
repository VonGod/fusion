const Discord = require("discord.js")

module.exports = {
  name: "verificar",
  description: "「Staff」Envie a mensagem de verificação",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "cargo",
        description: "Mencione o cargo que deseja ser adicionado no botão.",
        type: Discord.ApplicationCommandOptionType.Role,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let cargo = interaction.options.getRole("cargo");
        let servericon = interaction.guild.iconURL();

        let embed = new Discord.EmbedBuilder()
        .setColor("Gold")
        .setTitle('SISTEMA DE VERIFICAÇÃO')
        .setDescription(`Olá, seja bem vindo(a) ao discord oficial da Rede Fusion!
        precisamos verificar que você realmente é um humano
        então para isso apenas clique no botão logo abaixo 
        \nSe o botão não funcionar, entre em contato com nossa equipe 
        \n> **IP:** jogar.redefusion.net
        > **Loja:** https://loja.redefusion.net/ `)
        .setImage("https://cdn.discordapp.com/attachments/538462760158363658/1053047617141092534/Verificacao.png")

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("cargo_b" + interaction.id)
            .setLabel("Clique Aqui!")
            .setEmoji("🔓")
            .setStyle(Discord.ButtonStyle.Success)
        );

        interaction.channel.send({ embeds: [embed], components: [botao] }).then( () => {
            let coletor = interaction.channel.createMessageComponentCollector();

            coletor.on("collect", (c) => {
                if (!c.member.roles.cache.get(cargo.id)) {
                    c.member.roles.add(cargo.id)
                    c.reply({ content: `Olá **${c.user.username}**, você foi verificado com sucesso.`, ephemeral: true })
                } else if (c.member.roles.cache.get(cargo.id)) {
                    c.reply({ content: `Você já está verificado`, ephemeral: true })
                }
                
            })
        })
    }


  }
}
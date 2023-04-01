const client = require('../../../index');
const { QuickDB } = require('quick.db');
const Discord = require('discord.js');
const db = new QuickDB();
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

client.on('interactionCreate', async interaction => {
	try {
		if (!interaction.isButton()) return;

		const message = await interaction.channel.messages.fetch(interaction.message.id);

		const acceptCount = (await db.get(`accept_${interaction.message.id}`)) || 0;
		const rejectCount = (await db.get(`reject_${interaction.message.id}`)) || 0;
    const acceptVerify = (await db.get(`acceptv_${interaction.user.id}`)) || 1;
		const rejectVerify = (await db.get(`rejectv_${interaction.user.id}`)) || 1;

		if (interaction.customId === 'Sugest') {
			const warnModal = new ModalBuilder()
				.setCustomId('avisosmodal') //de preferencia não mudar isso
				.setTitle('Avisos');

			const suggestionInput = new TextInputBuilder()
				.setCustomId('sugestao')
				.setLabel('Digite a sua sugestão!')
				.setStyle(TextInputStyle.Paragraph)
				.setMaxLength(1000)
				.setMinLength(10)
				.setRequired(true);

			const suggestionComponent = new ActionRowBuilder().addComponents(suggestionInput);
			warnModal.addComponents(suggestionComponent);

			await interaction.showModal(warnModal);
		}

		if (interaction.customId === 'Accept') {
      await interaction.deferUpdate();

      if (rejectCount >= 1 && rejectVerify >= 1) {

        const newCountAccept = await db.add(`accept_${interaction.message.id}`, 1);
        const newCountReject = await db.sub(`reject_${interaction.message.id}`, 1);

        let buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('Sugest')
                  .setLabel(`Enviar Sugestão`)
                  .setEmoji('📨')
                  .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                  .setCustomId('Accept')
                  .setLabel(`Aceitar (${newCountAccept})`)
                  .setEmoji('✅')
                  .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                  .setCustomId('Reject')
                  .setLabel(`Negar (${newCountReject})`)
                  .setEmoji('❌')
                  .setStyle(Discord.ButtonStyle.Danger));

			await message.edit({ components: [buttons] });
  
      } else 

      if (acceptCount >= 1 && acceptVerify >= 1) {

        const newCountAccept = await db.sub(`accept_${interaction.message.id}`, 1);

        let buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('Sugest')
                  .setLabel(`Enviar Sugestão`)
                  .setEmoji('📨')
                  .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                  .setCustomId('Accept')
                  .setLabel(`Aceitar (${newCountAccept})`)
                  .setEmoji('✅')
                  .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                  .setCustomId('Reject')
                  .setLabel(`Negar (${rejectCount})`)
                  .setEmoji('❌')
                  .setStyle(Discord.ButtonStyle.Danger));

			await message.edit({ components: [buttons] });
  
      } else {
      
			const newCount = await db.add(`accept_${interaction.message.id}`, 1);

            let buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('Sugest')
                  .setLabel(`Enviar Sugestão`)
                  .setEmoji('📨')
                  .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                  .setCustomId('Accept')
                  .setLabel(`Aceitar (${newCount})`)
                  .setEmoji('✅')
                  .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                  .setCustomId('Reject')
                  .setLabel(`Negar (${rejectCount})`)
                  .setEmoji('❌')
                  .setStyle(Discord.ButtonStyle.Danger));

			await message.edit({ components: [buttons] });
		}}

		if (interaction.customId === 'Reject') {
      await interaction.deferUpdate();

      if (acceptCount >= 1 && acceptVerify >= 1) {

        const newCountAccept = await db.sub(`accept_${interaction.message.id}`, 1);
        const newCountReject = await db.add(`reject_${interaction.message.id}`, 1);

        let buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('Sugest')
                  .setLabel(`Enviar Sugestão`)
                  .setEmoji('📨')
                  .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                  .setCustomId('Accept')
                  .setLabel(`Aceitar (${newCountAccept})`)
                  .setEmoji('✅')
                  .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                  .setCustomId('Reject')
                  .setLabel(`Negar (${newCountReject})`)
                  .setEmoji('❌')
                  .setStyle(Discord.ButtonStyle.Danger));

			await message.edit({ components: [buttons] });
  
      } else 

      if (rejectCount >= 1 && rejectVerify >= 1) {

        const newCountReject = await db.sub(`reject_${interaction.message.id}`, 1);

        let buttons = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId('Sugest')
                  .setLabel(`Enviar Sugestão`)
                  .setEmoji('📨')
                  .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                  .setCustomId('Accept')
                  .setLabel(`Aceitar (${acceptCount})`)
                  .setEmoji('✅')
                  .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                  .setCustomId('Reject')
                  .setLabel(`Negar (${newCountReject})`)
                  .setEmoji('❌')
                  .setStyle(Discord.ButtonStyle.Danger));

			await message.edit({ components: [buttons] });
  
      } else {

                const newCount = await db.add(`reject_${interaction.message.id}`, 1);

                let buttons = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                      .setCustomId('Sugest')
                      .setLabel(`Enviar Sugestão`)
                      .setEmoji('📨')
                      .setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder()
                      .setCustomId('Accept')
                      .setLabel(`Aceitar (${acceptCount})`)
                      .setEmoji('✅')
                      .setStyle(Discord.ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                      .setCustomId('Reject')
                      .setLabel(`Negar (${newCount})`)
                      .setEmoji('❌')
                      .setStyle(Discord.ButtonStyle.Danger));

			await message.edit({ components: [buttons] });
		}}
	} catch (e) {
		console.error(e);
		interaction.followUp({ content: e.message, ephemeral: true });
	}
});
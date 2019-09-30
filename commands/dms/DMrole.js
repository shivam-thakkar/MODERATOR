const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');

class DMroleCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dmrole`,
            group: 'dms',
            memberName: 'dmrole',
            description: 'Sends message provided to all members of the specified role.',
            examples: [ 'Hey everyone! This might reach more people than an announcement...' ]
        });
    }

    async run(message, args){
        let role = message.mentions.roles.first();
        let msg = message.content;


        if(!role) {
            message.author.send("No valid role mentioned!");
            return;
        }

        try {
            msg = msg.substring(msg.indexOf(">") + 1);
        } catch(error) {
            console.log(error);
            return;
        }

        if(!msg || msg.length <= 1) {
            const embed = new Discord.RichEmbed()
                .addField(":x: Failed to send", "Message not specified")
                .addField(":eyes: Listen up!", "Every character past the role mention will be sent,\nand apparently there was nothing to send.");
            message.channel.send({ embed: embed });
            return;
        }


        let memberarray = role.members.array();
        let membercount = memberarray.length;
        console.log(`Responding to ${message.author.username} :  Sending message to all ${membercount} members of role ${role.name}.`)
        for (var i = 0; i < membercount; i++) {
            let timeout = Math.floor((Math.random() * (config.wait - 0.01)) * 1000) + 10;
            let member = memberarray[i];
            await sleep(timeout);
            if(i == (membercount-1)) {
                console.log(`Waited ${timeout}ms.\t\\/\tDMing ${member.user.username}`);
            } else {
                console.log(`Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}`);
            }
            member.send(`${msg} \n\n [${timeout}]`);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DMroleCommand;
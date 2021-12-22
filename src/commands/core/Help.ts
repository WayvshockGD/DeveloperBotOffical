import { CommandMapParamData } from "../CommandCreator";
import { Command } from "./Module";

export = Command({
    name: "help",
    dev: 0,
    create(client, { commands, modules, message }) {
        let command = commands.filter(c => c.opts.dev === 0);
        let commandMap: CommandMapParamData[] = [];

        command.forEach((item) => commandMap.push(item.opts.name));

        message.channel.send({
            embeds: [{
                description: `\`${command.size}\` command(s) available, \`${modules.size}\` modules count`,
                fields: [{
                    name: "Commands",
                    value: commandMap.join(", ")
                }],
                color: "RED"
            }]
        });
    }
});
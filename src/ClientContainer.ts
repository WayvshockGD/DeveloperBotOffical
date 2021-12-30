import chalk, { Chalk } from "chalk";
import { Client, Collection, Message } from "discord.js";
import { CommandMap, CommandModules } from "./commands/CommandCreator";
import { Config } from "./Config";
import { LoadCommands } from "./util/CommandLoader";
import MessageUtil from "./util/MessageUtil";

type LogTypes = "warn" | "error" | "info";

export class ClientContainer {
    public commands: CommandMap;
    public modules: CommandModules;

    public constructor() {
        this.commands = new Collection();
        this.modules = new Collection();
    }

    static log(message: string, type: LogTypes) {
        let color: Chalk;
        let date = new Date().toISOString();

        if (type === "info") {
            color = chalk.blue;
        } else if (type === "warn") {
            color = chalk.yellow;
        } else if (type === "error") {
            color = chalk.red;
        } else {
            color = chalk.white;
        }

        console.log(`[${date}][${type.toUpperCase()}] => ${color(message)}`);
    }

    get log() {
        return ClientContainer.log;
    }

    static onReady() {
        return (client: Client) => {
            this.log(`Client is ready on ${client.user?.username}`, "info");
        };
    }

    static onMessage(client: Client, container: ClientContainer) {
        return (message: Message) =>  {
            let prefix = Config.getEnv("PREFIX") as string;

            if (!message.content.startsWith(prefix)) {
                return;
            };

            let args = message.content.slice(prefix.length).trim().split(" ");
            let command = container.commands.get(args[0]);

            if (!command) {
                return;
            }

            let module = container.modules.get(command.options.name);

            if (!module) return;

            if (command.opts.dev === 1 && !Config.getEnv("OWNER").includes(message.author.id)) {
                return;
            }

            if (command.opts.onlyForChannels?.length && !command.opts.onlyForChannels.includes(message.channel.id)) {
                message.channel.send("Sending that command isn't allowed in this channel.");
                return;
            }

            args = args.slice(1);

            command.opts.create({ 
                container, 
                bot: client,
                data: module.data
            }, { 
                args, 
                message: {
                    data: message,
                    util: new MessageUtil(message)
                },
                commands: container.commands,
                modules: container.modules
            });
        };
    }
}

export let client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS"
    ]
});
let container = new ClientContainer();

LoadCommands(container);

client.on("ready", ClientContainer.onReady());
client.on("messageCreate", ClientContainer.onMessage(client, container));
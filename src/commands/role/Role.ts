import { Command } from "./Module";
import Roles from "../RoleList.json";
import Channels from "../ChannelList.json";
import { Message } from "discord.js";
import ms from "ms";

type RoleType = keyof (typeof Roles.list);

export = Command({
    name: "role",
    dev: 0,
    onlyForChannels: [Channels.roles],
    async create(client, { message, args }) {
        let role = Roles.list[args[0].toLowerCase() as RoleType];

        if (typeof (role) === "undefined") {
            if (typeof args[0] === "undefined") args[0] = "nothing";
            return message.util.create(`The role \`${args[0]}\` wasn't found.`);
        };

        if (!message.data.member?.roles.cache.has(role)) {
            await message.data.member?.roles.add([role]);
            await message.data.delete();
            let m = (await message.util.create(createMessage(true)));
            del(m);
        } else {
            await message.data.member?.roles.remove([role]);
            await message.data.delete();
            let m = (await message.util.create(createMessage(false)));
            del(m);
        }

        function del(message: Message) {
            setTimeout(() => {
                message.delete();
            }, ms("5s")); 
        }

        function createMessage(has: boolean) {
            return has ? `Added the role \`${args[0]}\` to \`${message.data.author.username}\``
                       : `Removed the role \`${args[0]}\` from \`${message.data.author.username}\``;
        }
    }
});
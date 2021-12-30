import { Message, MessagePayload, MessageOptions } from "discord.js";

export = class MessageUtil {
    private data: Message;

    public constructor(message: Message) {
        this.data = message;
    }

    public create(content: string | MessagePayload | MessageOptions) {
        return this.data.channel.send(content);
    }
}
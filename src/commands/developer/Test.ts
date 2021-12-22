import { Command } from "./Module";

export = Command({
    name: "test",
    dev: 1,
    create(client, { message }) {
        message.channel.send("test");
    }
});
import { Client } from "discord.js";
import dotenv from "dotenv";
dotenv.config();


export class Config {
    public client: Client;

    public constructor(client: Client) {
        this.client = client;
    }
    
    static getEnv(item: keyof (typeof ConfigTree)) {
        if (item === "OWNER") {
            return ConfigTree.OWNER.split(",");
        }

        return ConfigTree[item];
    }
}

export let ConfigTree = {
    TOKEN: process.env.BOT_TOKEN!,
    PREFIX: process.env.BOT_PREFIX ?? "&",
    OWNER: process.env.OWNERS!
};

export enum ConfigEnum {
    token = "TOKEN",
    prefix = "PREFIX"
}
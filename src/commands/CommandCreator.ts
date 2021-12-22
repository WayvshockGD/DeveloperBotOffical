import { Client, Collection, Message } from "discord.js";
import { ClientContainer } from "../ClientContainer";

export interface CommandCreatorOptions<A> {
    name: string;
    usage: string;
    group: number;
}

export type CommandCreatorDevOptions = 0 | 1;

export type CommandMap = Collection<string, CommandMapParamData>;
export type CommandModules = Collection<string, CommandCreatorOptions<any>>;

export interface CommandExecution {
    args: string[];
    message: Message;
    commands: CommandMap;
    modules: CommandModules;
}

export interface CommandMapParamData {
    options: CommandCreatorOptions<any>;
    opts: CommandCreateCallbackOptions<any>

}

interface CommandExecutionClient {
    container: ClientContainer;
    bot: Client;
}

export interface CommandCreateCallbackOptions<T> {
    name: T;
    dev: CommandCreatorDevOptions;
    create(client: CommandExecutionClient, ctx: CommandExecution): any;
}

export function createCommand<T>(options: CommandCreatorOptions<T>) {
    return function(opts: CommandCreateCallbackOptions<T>) {
        return { options, opts };
    }
}
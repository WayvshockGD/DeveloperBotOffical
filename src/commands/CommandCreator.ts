import { Client, Collection, Message } from "discord.js";
import { ClientContainer } from "../ClientContainer";
import MessageUtil from "../util/MessageUtil";

export interface CommandCreatorOptions<A, S> {
    name: string;
    usage: string;
    group: number;

    // Used for setting up state data.
    data: S;
}

export type CommandCreatorDevOptions = 0 | 1;

export type CommandMap = Collection<string, CommandMapParamData>;
export type CommandModules = Collection<string, CommandCreatorOptions<any, {}>>;

export interface CommandExecution {
    args: string[];
    message: {
        data: Message;
        util: MessageUtil;
    };
    commands: CommandMap;
    modules: CommandModules;
}

export interface CommandMapParamData {
    options: CommandCreatorOptions<any, {}>;
    opts: CommandCreateCallbackOptions<any, {}>

}

interface CommandExecutionClient<S> {
    container: ClientContainer;
    bot: Client;
    data: S;
}

export interface CommandCreateCallbackOptions<T, S> {
    name: T;
    dev: CommandCreatorDevOptions;
    onlyForChannels?: string[];
    create(client: CommandExecutionClient<S>, ctx: CommandExecution): any;
}

export function createCommand<T, S>(options: CommandCreatorOptions<T, S>) {
    return function(opts: CommandCreateCallbackOptions<T, S>) {
        return { options, opts };
    }
}
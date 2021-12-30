import { createCommand } from "../CommandCreator";

type Names = "help" | "info";

export let Command = createCommand<Names, {}>({ 
    name: "core",
    usage: "The core commands of the client.",
    group: 1,
    data: {}
});
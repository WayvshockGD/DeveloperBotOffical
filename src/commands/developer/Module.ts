import { createCommand } from "../CommandCreator";

type Names = "test" | "eval";

export let Command = createCommand<Names>({
    name: "developer",
    usage: "Developer plugin to eval, test and do other dev things ig.",
    group: 2,
});
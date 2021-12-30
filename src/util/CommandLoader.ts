import { glob } from "glob-promise";
import { ClientContainer } from "../ClientContainer";
import { CommandCreatorOptions } from "../commands/CommandCreator";

export function LoadCommands(container: ClientContainer) {
    glob("./build/src/commands/**/*.js", (err, files) => {
        for (let file of files) {
            let sliced = file.slice(11);
            let module = require(`..${sliced}`);

            if (!checkCommand(module)) {
                container.commands.set(module.opts.name, module);
                container.modules.set(module.options.name, module);
            }
        }
    });
}

function checkCommand(c: any) {
    if (!!c.createCommand) {
        return true;
    } else if (!!c.Command) {
        return true;
    }
}
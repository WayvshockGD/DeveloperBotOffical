import { glob } from "glob-promise";
import { ClientContainer } from "../ClientContainer";
import { CommandCreatorOptions } from "../commands/CommandCreator";

export function LoadCommands(container: ClientContainer) {
    glob("./build/src/commands/**/*.js", (err, files) => {
        for (let file of files) {
            let sliced = file.slice(11);
            let module = require(`..${sliced}`);

            if (!checkCommand(module)) {
                if (!!module.Command) {
                    container.modules.set(module.Command.name, module.Command);
                }  else {
                    container.commands.set(module.opts.name, module);
                }
            }
        }
    });
}

function checkCommand(c: any) {
    if (!!c.createCommand) {
        return true;
    }
}
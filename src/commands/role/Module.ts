import { createCommand } from "../CommandCreator";
import RoleList from "../RoleList.json";

type Names = "role";

export let Command = createCommand<Names, {}>({ 
    name: "role",
    group: 3,
    usage: "Used to add or remove roles depending..",
    data: {}
});
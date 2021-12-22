import { client } from "./src/ClientContainer";
import { Config, ConfigEnum } from "./src/Config";

(async () => {
    await client.login(Config.getEnv(ConfigEnum.token) as string);
})();
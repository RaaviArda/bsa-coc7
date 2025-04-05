import {coc7} from "./coc7.ts";
import {NAMESPACE,coc7Settings} from "./coc7Settings.ts";

Hooks.on("beavers-system-interface.init", async function(){
    beaversSystemInterface.register(new coc7());
});
Hooks.on("beavers-system-interface.ready", async function(){
    game[NAMESPACE] = game[NAMESPACE] || {};
    game[NAMESPACE].Settings = new coc7Settings();
    import("./skillTest.ts");
    import("./abilityTest.ts");
})
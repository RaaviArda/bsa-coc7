import {coc7} from "./coc7.js";
import {NAMESPACE,coc7Settings} from "./coc7Settings.js";

Hooks.on("beavers-system-interface.init", async function(){
    beaversSystemInterface.register(new coc7());
});
Hooks.on("beavers-system-interface.ready", async function(){
    game[NAMESPACE] = game[NAMESPACE] || {};
    game[NAMESPACE].Settings = new coc7Settings();
    import("./skillTest.js");
    import("./abilityTest.js");
})
import {CoC7} from "./CoC7.js";
import {NAMESPACE,CoC7Settings} from "./CoC7Settings.js";

Hooks.on("beavers-system-interface.init", async function(){
    beaversSystemInterface.register(new CoC7());
});
Hooks.on("beavers-system-interface.ready", async function(){
    game[NAMESPACE] = game[NAMESPACE] || {};
    game[NAMESPACE].Settings = new CoC7Settings();
    import("./SkillTest.js");
    import("./AbilityTest.js");
})
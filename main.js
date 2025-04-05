import {coc7} from "./coc7.js";

Hooks.on("beavers-system-interface.init", async function(){
    beaversSystemInterface.register(new coc7());
});
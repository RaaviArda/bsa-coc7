import {CoC7} from "./src/CoC7.js";

Hooks.on("beavers-system-interface.init", async function(){
    beaversSystemInterface.register(new CoC7());
});
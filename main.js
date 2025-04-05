import {CoC7} from "./CoC7.ts";

Hooks.on("beavers-system-interface.init", async function(){
    beaversSystemInterface.register(new CoC7());
});
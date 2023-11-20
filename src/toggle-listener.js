"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webextension_polyfill_1 = require("webextension-polyfill");
function toggle() {
    webextension_polyfill_1.default.commands.onCommand.addListener(function (command) {
        if (command === "toggle") {
            console.log("rererere");
        }
    });
}
toggle();

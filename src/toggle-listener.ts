import browser from "webextension-polyfill";

function toggle() {
  browser.commands.onCommand.addListener((command) => {
    if (command === "toggle") {
      browser.runtime.connect('tab_finder@whatsyouridea.com')
    }
  });
}

toggle();

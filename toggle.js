function toggle() {
  browser.commands.onCommand.addListener((command) => {
    if (command === "toggle") {
      browser.runtime.reload()
    }
  });
}

toggle()

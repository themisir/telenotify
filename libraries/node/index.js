const fetch =
  typeof require === "function" ? require("node-fetch") : window.fetch;

function TelenotifyClient(settings) {
  if (!settings.server) {
    throw error("Telenotify server address should be defined.");
  }

  if (!settings.key) {
    throw error("Telenotify key should be defined.");
  }

  this.settings = settings;
}

TelenotifyClient.prototype.send = function(message) {
  const url = `${this.settings.server}?key=${this.settings.key}&text=${message}`;
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .catch(function() {
      return null;
    });
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = TelenotifyClient;
}

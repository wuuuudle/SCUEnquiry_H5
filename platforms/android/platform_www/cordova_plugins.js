cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-sqlite-storage.SQLitePlugin",
      "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
      "pluginId": "cordova-sqlite-storage",
      "clobbers": [
        "SQLitePlugin"
      ]
    },
    {
      "id": "cordova-plugin-x-toast.Toast",
      "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
      "pluginId": "cordova-plugin-x-toast",
      "clobbers": [
        "window.plugins.toast"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-sqlite-storage": "3.2.1",
    "cordova-plugin-x-toast": "2.7.2"
  };
});
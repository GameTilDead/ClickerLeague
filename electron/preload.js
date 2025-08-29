const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('CLNative', {
    loadConfig: () => ipcRenderer.invoke('config:load'),
    saveConfig: (cfg) => ipcRenderer.invoke('config:save', cfg),
    launchCL: () => ipcRenderer.invoke('cl:launch'),
});
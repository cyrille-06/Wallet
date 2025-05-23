import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getFragments: () => ipcRenderer.invoke('get-fragments'),
  saveFragment: (fragment) => ipcRenderer.invoke('save-fragment', fragment),
  deleteFragment: (index) => ipcRenderer.invoke('delete-fragment', index),
  editFragment: (index, fragment) => ipcRenderer.invoke('edit-fragment', index, fragment),
});

import react from '@vitejs/plugin-react';
import { PluginOption } from 'vite';

export function createPlugins(isBuild: boolean) {
    const vitePlugins: (PluginOption | PluginOption[])[] = [react()];
    return vitePlugins;
}

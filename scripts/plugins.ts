import react from '@vitejs/plugin-react';

export function createplugins(isbuild: boolean) {
    const vitePlugins: (pluginoption | pluginoption[])[] = [react()];
    vitePlugins;
    return vitePlugins;
}

import { InjectionToken } from '@angular/core';

export interface ThyOverlayGlobalConfig {
    /**
     * Whether overlay-based components can automatically choose a better position
     * from their fallback positions when the preferred placement does not fit.
     */
    flexiblePosition?: boolean;
}

export interface ThyGlobalConfig {
    overlay?: ThyOverlayGlobalConfig;
}

export const THY_GLOBAL_CONFIG = new InjectionToken<ThyGlobalConfig>('thy-global-config');

export function getOverlayGlobalConfig(globalConfig?: ThyGlobalConfig | null): ThyOverlayGlobalConfig {
    return globalConfig?.overlay ?? {};
}

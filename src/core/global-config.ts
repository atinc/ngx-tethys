import { EnvironmentProviders, InjectionToken, Provider, makeEnvironmentProviders } from '@angular/core';

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

export type ThyTethysFeature = Provider | EnvironmentProviders;

export function getOverlayGlobalConfig(globalConfig?: ThyGlobalConfig | null): ThyOverlayGlobalConfig {
    return globalConfig?.overlay ?? {};
}

export function provideTethys(...features: ThyTethysFeature[]): EnvironmentProviders {
    return makeEnvironmentProviders(features);
}

export function withGlobalConfig(config: ThyGlobalConfig): EnvironmentProviders {
    return makeEnvironmentProviders([{ provide: THY_GLOBAL_CONFIG, useValue: config }]);
}
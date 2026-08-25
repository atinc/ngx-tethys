import { EnvironmentProviders, Provider, makeEnvironmentProviders } from '@angular/core';
import { THY_GLOBAL_CONFIG, ThyGlobalConfig } from './global-config';

export type ThyTethysFeature = Provider | EnvironmentProviders;

export function provideTethys(...features: ThyTethysFeature[]): EnvironmentProviders {
    return makeEnvironmentProviders(features);
}

export function withGlobalConfig(config: ThyGlobalConfig): EnvironmentProviders {
    return makeEnvironmentProviders([{ provide: THY_GLOBAL_CONFIG, useValue: config }]);
}

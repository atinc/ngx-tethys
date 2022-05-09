import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { ROOT_STATE_TOKEN, FEATURE_STATE_TOKEN } from './types';
import { Store } from './store';

@NgModule()
export class ThyRootStoreModule {}

@NgModule()
export class ThyFeatureStoreModule {}

/**
 * @deprecated please use @tethys/store
 */
@NgModule({})
export class ThyStoreModule {
    static forRoot(stores: Type<Store>[] = []): ModuleWithProviders<ThyRootStoreModule> {
        return {
            ngModule: ThyRootStoreModule,
            providers: [
                ...stores,
                {
                    provide: ROOT_STATE_TOKEN,
                    useValue: stores
                }
            ]
        };
    }

    static forFeature(stores: Type<Store>[] = []): ModuleWithProviders<ThyFeatureStoreModule> {
        return {
            ngModule: ThyFeatureStoreModule,
            providers: [
                ...stores,
                {
                    provide: FEATURE_STATE_TOKEN,
                    multi: true,
                    useValue: stores
                }
            ]
        };
    }
}

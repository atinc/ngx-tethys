import { NgModule, ModuleWithProviders, Type, Injector, NgModuleRef } from '@angular/core';
import { ROOT_STATE_TOKEN, FEATURE_STATE_TOKEN } from './types';
import { Store } from './store';
import { clearInjector, setInjector } from './internals/static-injector';

@NgModule()
export class ThyRootStoreModule {
    constructor(ngModuleRef: NgModuleRef<any>) {
        setInjector(ngModuleRef.injector);
        ngModuleRef.onDestroy(clearInjector);
    }
}

@NgModule()
export class ThyFeatureStoreModule {}

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

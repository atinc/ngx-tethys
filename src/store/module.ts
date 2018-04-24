import { NgModule, ModuleWithProviders } from '@angular/core';
import { ROOT_STATE_TOKEN, FEATURE_STATE_TOKEN } from './types';

@NgModule()
export class RootStoreModule {

}

@NgModule()
export class FeatureStoreModule {

}
@NgModule({})
export class ThyStoreModule {

    static forRoot(stores: any[] = []): ModuleWithProviders {
        return {
            ngModule: RootStoreModule,
            providers: [
                ...stores,
                {
                    provide: ROOT_STATE_TOKEN,
                    useValue: stores
                }
            ]
        };
    }

    static forFeature(stores: any[] = []): ModuleWithProviders {
        return {
            ngModule: FeatureStoreModule,
            providers: [
                ...stores,
                {
                    provide: FEATURE_STATE_TOKEN,
                    useValue: stores
                }
            ]
        };
    }
}

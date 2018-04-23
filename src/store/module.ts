import { NgModule, ModuleWithProviders } from '@angular/core';
import { ROOT_STATE_TOKEN } from './types';

@NgModule()
class RootStoreModule {

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
}

import { NgModule, Injector } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ThyStoreModule, Store } from '../index';
import { getInjector } from '../internals/static-injector';

interface RootStateModel {
    foo: string;
}

class RootStore extends Store<RootStateModel> {
    constructor() {
        super({
            foo: 'Hello'
        });
    }

    getFoo(state: RootStateModel) {
        return state.foo;
    }
}

class FeatureState {
    zoo: string;
}

class FeatureStore extends Store<FeatureState> {
    constructor() {
        super(new FeatureState());
    }
}

@NgModule({
    imports: [ThyStoreModule.forRoot([RootStore])]
})
class RootModule {}

@NgModule({
    imports: [ThyStoreModule.forFeature([FeatureStore])]
})
class FeatureModule {}

describe('module', () => {
    it('should configure and return `RootStore`', () => {
        TestBed.configureTestingModule({
            imports: [RootModule]
        });

        expect(TestBed.inject(RootStore)).toBeTruthy();
    });

    it('should get correct injector by getInjector', () => {
        TestBed.configureTestingModule({
            imports: [RootModule]
        });
        const expectedInjector = TestBed.inject(Injector);
        expect(getInjector()).toEqual(expectedInjector);
        expect(TestBed.inject(RootStore)).toEqual(getInjector().get(RootStore));
    });

    it('should initialize all modules state', async(() => {
        TestBed.configureTestingModule({
            imports: [RootModule]
        });

        const store = TestBed.inject(RootStore) as RootStore;
        expect(store).toBeTruthy();
        store.select(store.getFoo).subscribe(foo => expect(foo).toEqual('Hello'));
    }));

    it('should configure feature module and return `RootStore` and `FeatureStore`', () => {
        TestBed.configureTestingModule({
            imports: [RootModule, FeatureModule]
        });

        expect(TestBed.inject(RootStore)).toBeTruthy();
        expect(TestBed.inject(FeatureModule)).toBeTruthy();
        expect(TestBed.inject(FeatureStore)).toBeTruthy();
    });
});

import { NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ThyStoreModule, Store } from '../index';


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
    imports: [
        ThyStoreModule.forRoot([RootStore])
    ]
})
class RootModule { }

@NgModule({
    imports: [
        ThyStoreModule.forFeature([FeatureStore])
    ]
})
class FeatureModule { }


describe('module', () => {

    it('should configure and return `RootStore`', () => {
        TestBed.configureTestingModule({
            imports: [RootModule]
        });

        expect(TestBed.get(RootStore)).toBeTruthy();
    });

    it('should initialize all modules state', async(() => {
        TestBed.configureTestingModule({
            imports: [RootModule]
        });

        const store = TestBed.get(RootStore) as RootStore;
        expect(store).toBeTruthy();
        store.select(store.getFoo).subscribe((foo: string) => expect(foo).toEqual('Hello'));
    }));

    it('should configure feature module and return `RootStore` and `FeatureStore`', () => {
        TestBed.configureTestingModule({
          imports: [RootModule, FeatureModule]
        });

        expect(TestBed.get(RootStore)).toBeTruthy();
        expect(TestBed.get(FeatureModule)).toBeTruthy();
        expect(TestBed.get(FeatureStore)).toBeTruthy();
      });
});

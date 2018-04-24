import { NgModule } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { ThyStoreModule, Store } from '../store';


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


@NgModule({
    imports: [
        ThyStoreModule.forRoot([RootStore])
    ]
})
class RootModule { }


describe('module', () => {
    // it('should configure and run with no states', () => {
    //     TestBed.configureTestingModule({
    //         imports: [ThyStoreModule.forRoot()]
    //     });

    //     expect(TestBed.get(RootStore)).toBeTruthy();
    // });

    it('should configure and return `RootStore`', () => {
        TestBed.configureTestingModule({
            imports: [RootModule]
        });

        expect(TestBed.get(RootStore)).toBeTruthy();
    });


    it('should initialize all  modules state', async(() => {
        TestBed.configureTestingModule({
            imports: [RootModule]
        });

        const store = TestBed.get(RootStore) as RootStore;
        expect(store).toBeTruthy();
        store.select(store.getFoo).subscribe((foo: string) => expect(foo).toEqual('Hello'));
    }));
});

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ThyStoreModule, Store } from '../index';

class StringSelectState {
    baz: string;
    boo: string;
}
class StringSelectStore extends Store<StringSelectState> {
    constructor() {
        super({
            baz: 'Hello',
            boo: 'Worktile'
        });
    }
}

describe('select', () => {
    it('should select the correct state using string', async(() => {
        @Component({
            selector: 'my-component-0',
            template: ''
        })
        class StringSelectComponent {
            // @Select('counter') state: Observable<StateModel>;
            // @Select('counter.boo') subState: Observable<SubStateModel>;
            // @Select('counter.boo.baz') subSubState: Observable<SubSubStateModel>;

            state: Observable<StringSelectState>;

            subState: Observable<string>;

            constructor(store: StringSelectStore) {
                this.state = store.select((state) => {
                    return state;
                }) as Observable<StringSelectState>;

                this.subState = store.select((state: StringSelectState) => {
                    return state.baz;
                });
            }

        }

        TestBed.configureTestingModule({
            imports: [
                ThyStoreModule.forRoot([
                    StringSelectStore
                ])],
            declarations: [
                StringSelectComponent
            ]
        });

        const comp = TestBed.createComponent(StringSelectComponent);

        comp.componentInstance.state.subscribe(state => {
            expect(state.baz).toBe('Hello');
            expect(state.boo).toBe('Worktile');
        });

        comp.componentInstance.subState.subscribe(state => {
            expect(state).toBe('Hello');
        });
    }));
});

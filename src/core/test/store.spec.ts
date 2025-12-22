import { Injectable } from '@angular/core';
import { produce } from 'ngx-tethys/util';
import { MiniStore, MiniAction } from 'ngx-tethys/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Animal {
    id: number;
    name: string;
}

interface FooEntity {
    id: number;
    name: string;
    description: string;
}

class ZoomState {
    animals!: Animal[];
    foo: FooEntity | null = null;
}

@Injectable()
class ZoomStore extends MiniStore<ZoomState> {
    static animalsSelector = (state: ZoomState) => {
        return state.animals;
    };

    getStoreInstanceId(): string {
        return 'ZoomStore';
    }

    @MiniAction()
    addAnimal(animal: Animal) {
        return of(animal).pipe(
            tap(() => {
                this.setState({
                    animals: produce(this.getState().animals).add(animal)
                });
            })
        );
    }

    @MiniAction()
    removeAnimal(id: number) {
        this.setState({
            animals: produce(this.getState().animals).remove(id)
        });
    }

    @MiniAction()
    addAnimalWithError(animal: Animal, executeFn: () => void) {
        return of(animal).pipe(
            tap(() => {
                executeFn();
                throw new Error(`add animal failed`);
            })
        );
    }
}

describe('#mini-store', () => {
    function createSomeAnimals(): Animal[] {
        return ['cat', 'dog', 'chicken', 'duck'].map((name, index) => {
            return {
                name: name,
                id: index + 1
            };
        });
    }

    describe('#initialize', () => {
        it('should get initial state value is null with initialize', () => {
            const store = new ZoomStore();
            store.initialize(null);
            expect(store.getState()).toBeNull();
        });

        it('should get initial state value is empty with initialize', () => {
            const store = new ZoomStore();
            store.initialize({
                animals: [],
                foo: null
            });
            expect(store.getState()).toEqual({
                animals: [],
                foo: null
            });
        });

        it('should get initial state value has data with initialize', () => {
            const animals = createSomeAnimals();
            const foo = { id: 1, name: 'Foo', description: 'This is a foo' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: foo
            });
            expect(store.getState()).toEqual({
                animals: animals,
                foo: foo
            });
        });

        it('should get correct data through subscribe select animals stream', () => {
            const animals = createSomeAnimals();
            const foo = { id: 1, name: 'Foo', description: 'This is a foo' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: foo
            });
            const animalsSpy = jasmine.createSpy('animals spy');
            store.select(ZoomStore.animalsSelector).subscribe(animalsSpy);
            expect(animalsSpy).toHaveBeenCalled();
            expect(animalsSpy).toHaveBeenCalledWith(animals);
        });
    });

    describe('#state', () => {
        it('should get correct state value', () => {
            const animals = createSomeAnimals();
            const foo = { id: 1, name: 'foo name', description: 'foo description' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: foo
            });
            expect(store.getState()).toEqual({
                animals: animals,
                foo: foo
            });
        });

        it('should deliver whole state value to setState function success', () => {
            const animals = createSomeAnimals();
            const foo = { id: 1, name: 'foo name', description: 'foo description' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: foo
            });
            const setStateSpy = jasmine.createSpy('setState spy');
            store.setState(setStateSpy);
            expect(setStateSpy).toHaveBeenCalledWith({
                animals: animals,
                foo: foo
            });
        });

        it('should set state success through set new partial state object', () => {
            const animals = createSomeAnimals();
            const newFoo = { id: 100, name: 'new foo name', description: 'new foo description' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: null
            });
            store.setState({
                foo: newFoo
            });
            expect(store.getState()).toEqual({
                animals: animals,
                foo: newFoo
            });
        });

        it('should set state success through invoke setState function', () => {
            const animals = createSomeAnimals();
            const newFoo = { id: 100, name: 'new foo name', description: 'new foo description' };
            const addAnimalMonster = { id: 100, name: 'monster' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: null
            });
            store.setState(state => {
                return {
                    foo: newFoo,
                    animals: [...state.animals, addAnimalMonster]
                };
            });
            expect(store.getState()).toEqual({
                animals: [...animals, addAnimalMonster],
                foo: newFoo
            });
        });

        it('should set state success through invoke setState function which return partial state object', () => {
            const animals = createSomeAnimals();
            const newFoo = { id: 100, name: 'new foo name', description: 'new foo description' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: null
            });
            store.setState(state => {
                return {
                    foo: newFoo
                };
            });
            expect(store.getState()).toEqual({
                animals: animals,
                foo: newFoo
            });
        });

        it('should clear state success', () => {
            const animals = createSomeAnimals();
            const foo = { id: 1, name: 'foo name', description: 'foo description' };
            const newFoo = { id: 10, name: 'new foo name', description: 'new foo description' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: foo
            });
            store.setState({
                animals: [{ id: 100, name: 'new' }],
                foo: newFoo
            });
            expect(store.getState()).toEqual({
                animals: [{ id: 100, name: 'new' }],
                foo: newFoo
            });
            store.clearState();
            expect(store.getState()).toEqual({
                animals: animals,
                foo: foo
            });
        });

        it('should get correct snapshot', () => {
            const animals = createSomeAnimals();
            const foo = { id: 1, name: 'foo name', description: 'foo description' };
            const newFoo = { id: 10, name: 'new foo name', description: 'new foo description' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals,
                foo: foo
            });
            expect(store.snapshot).toEqual({
                animals: animals,
                foo: foo
            });
            store.setState({
                animals: [{ id: 100, name: 'new' }],
                foo: newFoo
            });
            expect(store.snapshot).toEqual({
                animals: [{ id: 100, name: 'new' }],
                foo: newFoo
            });
        });
    });

    describe('#action', () => {
        it('should auto subscribe action result stream when invoke action', () => {
            const animals = createSomeAnimals();
            const addAnimalMonster = { id: 100, name: 'monster' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals
            });
            const animalsSpy = jasmine.createSpy('animals selector spy');
            store.select(ZoomStore.animalsSelector).subscribe(animalsSpy);
            expect(animalsSpy).toHaveBeenCalledTimes(1);
            store.addAnimal(addAnimalMonster);
            expect(animalsSpy).toHaveBeenCalledTimes(2);
            expect(animalsSpy).toHaveBeenCalledWith([...animals, addAnimalMonster]);
        });

        it('should get correct value when subscribe action result stream by invoke action', () => {
            const animals = createSomeAnimals();
            const addAnimalMonster = { id: 100, name: 'monster' };
            const store = new ZoomStore();
            store.initialize({
                animals: animals
            });
            const animalsSpy = jasmine.createSpy('animals selector spy');
            const addAnimalSpy = jasmine.createSpy('add animal next spy');
            store.select(ZoomStore.animalsSelector).subscribe(animalsSpy);
            expect(animalsSpy).toHaveBeenCalledTimes(1);
            store.addAnimal(addAnimalMonster).subscribe(addAnimalSpy);
            expect(animalsSpy).toHaveBeenCalledTimes(2);
            expect(animalsSpy).toHaveBeenCalledWith([...animals, addAnimalMonster]);
            expect(addAnimalSpy).toHaveBeenCalledTimes(1);
            expect(addAnimalSpy).toHaveBeenCalledWith(addAnimalMonster);
        });
    });

    describe('#getStoreInstanceId', () => {
        it('should get correct InstanceId', () => {
            const store = new ZoomStore();
            store.initialize({});
            expect(store.getStoreInstanceId()).toEqual('ZoomStore');
        });
    });

    describe('#error', () => {
        it('should call once action when action throw error', () => {
            const store = new ZoomStore();
            store.initialize({});
            const executeSpy = jasmine.createSpy('execute spy in action');
            const successSpy = jasmine.createSpy('success spy');
            const errorSpy = jasmine.createSpy('error spy');
            expect(() => {
                store.addAnimalWithError({ id: 100, name: '' }, executeSpy).subscribe(successSpy, errorSpy);
                expect(executeSpy).toHaveBeenCalledTimes(1);
                expect(successSpy).toHaveBeenCalledTimes(0);
                expect(errorSpy).toHaveBeenCalledTimes(1);
                expect(errorSpy).toHaveBeenCalledWith(new Error(`add animal failed`));
            });
        });
    });
});

import { Subject } from 'rxjs';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { actionBehavior, setDefaultErrorHandler } from '@tethys/cdk/behaviors';

describe('action-behavior', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    function run(fn: Function): void {
        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            fn();
        });
    }

    it('should execute success', () => {
        run(() => {
            const subject = new Subject<number>();
            const action = actionBehavior(() => {
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let success = false;
            let result!: number;
            action.execute(data => {
                success = true;
                result = data;
            });
            expect(action.saving()).toEqual(true);
            subject.next(100);
            expect(action.saving()).toEqual(false);
            expect(success).toBe(true);
            expect(result).toBe(100);
        });
    });

    it('should execute success by pass parameters', () => {
        run(() => {
            const subject = new Subject<number>();
            let parameters!: [string, number];
            const action = actionBehavior((param1: string, param2: number) => {
                parameters = [param1, param2];
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let success = false;
            let result!: number;
            action('hello', 100).execute(data => {
                success = true;
                result = data;
            });
            expect(parameters).toEqual(['hello', 100]);
            subject.next(100);
            expect(result).toBe(100);
        });
    });

    it('should clear parameters of last execution ', () => {
        run(() => {
            const subject = new Subject<number>();
            let parameters!: [string, number];
            const action = actionBehavior((param1: string, param2: number) => {
                parameters = [param1, param2];
                return subject.asObservable();
            });
            action('hello', 100).execute();
            expect(parameters).toEqual(['hello', 100]);
            subject.next(100);
            action.execute();
            expect(parameters).toEqual([undefined, undefined]);
        });
    });

    it('should not re-execute before the last execution', () => {
        run(() => {
            const subject = new Subject<void>();
            let actionExecutionTimes = 0;
            const action = actionBehavior(() => {
                actionExecutionTimes++;
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let execution1 = false;
            action.execute(() => {
                execution1 = true;
            });
            expect(actionExecutionTimes).toBe(1);
            let execution2 = false;
            action.execute(() => {
                execution2 = true;
            });
            expect(actionExecutionTimes).toBe(1);
            subject.next();
            expect(actionExecutionTimes).toBe(1);
            expect(execution1).toBe(true);
            expect(execution2).toBe(false);
        });
    });

    it('should execute when complete', () => {
        run(() => {
            const subject = new Subject<number>();
            const action = actionBehavior(() => {
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let result!: number;
            action.execute(data => {
                result = data;
            });
            expect(action.saving()).toEqual(true);
            subject.complete();
            expect(action.saving()).toEqual(false);
            expect(result).toEqual(undefined);
        });
    });

    it('should execute when error', () => {
        run(() => {
            const subject = new Subject<void>();
            const action = actionBehavior(() => {
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let error!: Error;
            action.execute({
                error: _error => {
                    error = _error;
                }
            });
            expect(action.saving()).toEqual(true);
            const mockError = new Error('mock error');
            subject.error(mockError);
            expect(action.saving()).toEqual(false);
            expect(error).toBe(mockError);
        });
    });

    it('should execute when direct throw error', () => {
        run(() => {
            const mockError = new Error('mock error');
            const action = actionBehavior(() => {
                throw mockError;
            });
            expect(action.saving()).toEqual(false);
            let error!: Error;
            action.execute(undefined, _error => {
                error = _error;
            });
            expect(action.saving()).toEqual(false);
            expect(error).toBe(mockError);
        });
    });

    it('should execute use defaultErrorHandler when error', () => {
        run(() => {
            const subject = new Subject<void>();
            const action = actionBehavior(() => {
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let handleError!: Error;
            setDefaultErrorHandler(error => {
                handleError = error;
            });
            action.execute();
            expect(action.saving()).toEqual(true);
            const mockError = new Error('mock error');
            subject.error(mockError);
            expect(action.saving()).toEqual(false);
            expect(handleError).toBe(mockError);
        });
    });

    it('should subscribe the return result of execute successfully', () => {
        run(() => {
            const subject = new Subject<number>();
            const action = actionBehavior(() => {
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let success = false;
            let result!: number;
            const successSpy = jasmine.createSpy('success');
            const errorSpy = jasmine.createSpy('error');
            action
                .execute(data => {
                    success = true;
                    result = data;
                })
                .subscribe({
                    next: successSpy,
                    error: errorSpy
                });
            expect(action.saving()).toEqual(true);
            subject.next(100);
            expect(action.saving()).toEqual(false);
            expect(success).toBe(true);
            expect(result).toBe(100);

            expect(successSpy).toHaveBeenCalled();
            expect(successSpy).toHaveBeenCalledWith(result);
            expect(errorSpy).not.toHaveBeenCalled();
        });
    });

    it('should subscribe the return result of execute error', () => {
        run(() => {
            const subject = new Subject<void>();
            const action = actionBehavior(() => {
                return subject.asObservable();
            });
            expect(action.saving()).toEqual(false);
            let error!: Error;
            const successSpy = jasmine.createSpy('success');
            const errorSpy = jasmine.createSpy('error');
            action
                .execute({
                    error: _error => {
                        error = _error;
                    }
                })
                .subscribe({
                    next: successSpy,
                    error: errorSpy
                });
            expect(action.saving()).toEqual(true);
            const mockError = new Error('mock error');
            subject.error(mockError);
            expect(action.saving()).toEqual(false);
            expect(error).toBe(mockError);

            expect(successSpy).not.toHaveBeenCalled();
            expect(errorSpy).toHaveBeenCalled();
            expect(errorSpy).toHaveBeenCalledWith(mockError);
        });
    });

    it('should execute when direct throw error', () => {
        run(() => {
            const mockError = new Error('mock error');
            const action = actionBehavior(() => {
                throw mockError;
            });
            expect(action.saving()).toEqual(false);
            let error!: Error;
            const successSpy = jasmine.createSpy('success');
            const errorSpy = jasmine.createSpy('error');
            action
                .execute(undefined, _error => {
                    error = _error;
                })
                .subscribe({
                    error: errorSpy,
                    next: successSpy
                });
            expect(action.saving()).toEqual(false);
            expect(error).toBe(mockError);

            expect(successSpy).not.toHaveBeenCalled();
            expect(errorSpy).toHaveBeenCalled();
            expect(errorSpy).toHaveBeenCalledWith(mockError);
        });
    });
});

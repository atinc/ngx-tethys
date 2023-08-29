import { TestBed } from '@angular/core/testing';
import { useAsync } from '../async-behavior';
import { Subject } from 'rxjs';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';

describe('use-async', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [] });
    });

    function run(fn: Function): void {
        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            fn();
        });
    }

    it('should execute', () => {
        run(() => {
            const subject = new Subject<void>();
            const async = useAsync(() => {
                return subject.asObservable();
            });
            expect(async.state).toEqual('pending');
            expect(async.loadingDone).toEqual(true);
            expect(async.loading).toEqual(false);
            async.execute();
            expect(async.state).toEqual('loading');
            expect(async.loadingDone).toEqual(false);
            expect(async.loading).toEqual(true);
            subject.next();
            expect(async.state).toEqual('success');
            expect(async.loadingDone).toEqual(true);
            expect(async.loading).toEqual(false);
        });
    });

    it('should execute success by pass parameters', () => {
        run(() => {
            const subject = new Subject<number>();
            let parameters: [string, number];
            const async = useAsync((param1: string, param2: number) => {
                parameters = [param1, param2];
                return subject.asObservable();
            });
            let result: number;
            async('hello', 100).execute(data => {
                result = data;
            });
            expect(parameters).toEqual(['hello', 100]);
            subject.next(100);
            expect(result).toBe(100);
        });
    });

    it('should execute error', () => {
        run(() => {
            const subject = new Subject<void>();
            const async = useAsync(() => {
                return subject.asObservable();
            });
            expect(async.state).toEqual('pending');
            let executeError: Error;
            async.execute({
                error: error => {
                    executeError = error;
                }
            });
            expect(async.state).toEqual('loading');
            const error = new Error('mock error');
            subject.error(error);
            expect(async.state).toEqual('error');
            expect(async.error).toEqual(error);
            expect(executeError).toEqual(error);
        });
    });

    it('should execute when direct throw error', () => {
        run(() => {
            const mockError = new Error('mock error');
            const async = useAsync(() => {
                throw mockError;
            });
            expect(async.loading).toEqual(false);
            let error: Error;
            async.execute(undefined, _error => {
                error = _error;
            });
            expect(async.loading).toEqual(false);
            expect(async.error).toBe(mockError);
            expect(error).toBe(mockError);
        });
    });
});

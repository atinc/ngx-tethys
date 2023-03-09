import { useAction } from '../action-behavior';
import { Subject } from 'rxjs';
import { setDefaultErrorHandler } from '../error-handler';

describe('use-action', () => {
    it('should execute success', () => {
        const subject = new Subject<number>();
        const action = useAction(() => {
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        let success = false;
        let result: number;
        action.execute(data => {
            success = true;
            result = data;
        });
        expect(action.saving).toEqual(true);
        subject.next();
        expect(action.saving).toEqual(false);
        expect(success).toBe(true);
    });

    it('should execute success by pass parameters', () => {
        const subject = new Subject<number>();
        let parameters: [string, number];
        const action = useAction((param1: string, param2: number) => {
            parameters = [param1, param2];
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        let success = false;
        let result: number;
        action('hello', 100).execute(data => {
            success = true;
            result = data;
        });
        expect(parameters).toEqual(['hello', 100]);
        subject.next(100);
        expect(result).toBe(100);
    });

    it('should clear parameters of last execution ', () => {
        const subject = new Subject<number>();
        let parameters: [string, number];
        const action = useAction((param1: string, param2: number) => {
            parameters = [param1, param2];
            return subject.asObservable();
        });
        action('hello', 100).execute();
        expect(parameters).toEqual(['hello', 100]);
        subject.next(100);
        action.execute();
        expect(parameters).toEqual([undefined, undefined]);
    });

    it('should not re-execute before the last execution', () => {
        const subject = new Subject<void>();
        let actionExecutionTimes = 0;
        const action = useAction(() => {
            actionExecutionTimes++;
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
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

    it('should execute when complete', () => {
        const subject = new Subject<number>();
        const action = useAction(() => {
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        let result: number;
        action.execute(data => {
            result = data;
        });
        expect(action.saving).toEqual(true);
        subject.complete();
        expect(action.saving).toEqual(false);
        expect(result).toEqual(undefined);
    });

    it('should execute when error', () => {
        const subject = new Subject<void>();
        const action = useAction(() => {
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        let error: Error;
        action.execute({
            error: _error => {
                error = _error;
            }
        });
        expect(action.saving).toEqual(true);
        const mockError = new Error('mock error');
        subject.error(mockError);
        expect(action.saving).toEqual(false);
        expect(error).toBe(mockError);
    });

    it('should execute when direct throw error', () => {
        const mockError = new Error('mock error');
        const action = useAction(() => {
            throw mockError;
        });
        expect(action.saving).toEqual(false);
        let error: Error;
        action.execute(undefined, _error => {
            error = _error;
        });
        expect(action.saving).toEqual(false);
        expect(error).toBe(mockError);
    });

    it('should execute use defaultErrorHandler when error', () => {
        const subject = new Subject<void>();
        const action = useAction(() => {
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        let handleError: Error;
        setDefaultErrorHandler(error => {
            handleError = error;
        });
        action.execute();
        expect(action.saving).toEqual(true);
        const mockError = new Error('mock error');
        subject.error(mockError);
        expect(action.saving).toEqual(false);
        expect(handleError).toBe(mockError);
    });
});

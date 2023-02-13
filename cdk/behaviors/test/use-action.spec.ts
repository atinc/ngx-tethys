import { useAction } from '../use-action';
import { Subject } from 'rxjs';

describe('use-action', () => {
    it('should execute success', () => {
        const subject = new Subject<void>();
        const action = useAction(() => {
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        let success = false;
        action
            .success(result => {
                success = true;
            })
            .execute();
        expect(action.saving).toEqual(true);
        subject.next();
        expect(action.saving).toEqual(false);
        expect(success).toBe(true);
    });

    it('should execute when complete', () => {
        const subject = new Subject<void>();
        const action = useAction(() => {
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        action.execute();
        expect(action.saving).toEqual(true);
        subject.complete();
        expect(action.saving).toEqual(false);
    });

    it('should execute when error', () => {
        const subject = new Subject<void>();
        const action = useAction(() => {
            return subject.asObservable();
        });
        expect(action.saving).toEqual(false);
        let error: Error;
        action
            .error(_error => {
                error = _error;
            })
            .execute();
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
        action
            .error(_error => {
                error = _error;
            })
            .execute();
        expect(action.saving).toEqual(false);
        expect(error).toBe(mockError);
    });
});

import { useAsync } from '../use-async';
import { Subject } from 'rxjs';

describe('use-async', () => {
    it('should execute', () => {
        const subject = new Subject<void>();
        const async = useAsync(() => {
            return subject.asObservable();
        });
        expect(async.state).toEqual('pending');
        async.execute().subscribe();
        expect(async.state).toEqual('loading');
        subject.next();
        expect(async.state).toEqual('success');
    });

    it('should execute error', () => {
        const subject = new Subject<void>();
        const async = useAsync(() => {
            return subject.asObservable();
        });
        expect(async.state).toEqual('pending');
        async.execute().subscribe({
            error: error => {}
        });
        expect(async.state).toEqual('loading');
        const error = new Error('mock error');
        subject.error(error);
        expect(async.state).toEqual('error');
        expect(async.error).toEqual(error);
    });
});

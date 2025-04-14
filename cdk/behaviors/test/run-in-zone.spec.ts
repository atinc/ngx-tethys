import { runInZone } from '@tethys/cdk/behaviors';
import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';

describe('runInZone', () => {
    it('should runInZone', () => {
        const subject = new Subject<void>();
        let calledTimes = 0;
        const mockNgZone = {
            run: (fn: () => void) => {
                calledTimes = calledTimes + 1;
                fn();
            }
        };
        subject.pipe(runInZone(mockNgZone as unknown as NgZone)).subscribe();
        expect(calledTimes).toBe(0);
        subject.next();
        expect(calledTimes).toBe(1);
    });

    it('should runInZone when error', () => {
        const subject = new Subject<void>();
        let calledTimes = 0;
        const mockNgZone = {
            run: (fn: () => void) => {
                calledTimes = calledTimes + 1;
                fn();
            }
        };
        subject.pipe(runInZone(mockNgZone as unknown as NgZone)).subscribe({
            error: error => {}
        });
        expect(calledTimes).toBe(0);
        subject.error(new Error('mock error'));
        expect(calledTimes).toBe(1);
    });

    it('should runInZone when complete', () => {
        const subject = new Subject<void>();
        let calledTimes = 0;
        const mockNgZone = {
            run: (fn: () => void) => {
                calledTimes = calledTimes + 1;
                fn();
            }
        };
        subject.pipe(runInZone(mockNgZone as unknown as NgZone)).subscribe({
            error: error => {}
        });
        expect(calledTimes).toBe(0);
        subject.complete();
        expect(calledTimes).toBe(1);
    });
});

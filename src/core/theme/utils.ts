import { MutationObserverFactory } from '@angular/cdk/observers';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';

export function observeTheme(
    observer: MutationObserver,
    destroyRef: DestroyRef,
    callBack: Function
): Observable<Subject<MutationRecord[]>> {
    observer?.disconnect();
    return new Observable(observe => {
        const stream = new Subject<MutationRecord[]>();
        observer = new MutationObserverFactory().create(mutations => stream.next(mutations));
        if (observer) {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['theme']
            });
        }
        stream.pipe(takeUntilDestroyed(destroyRef)).subscribe(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'theme') {
                    callBack();
                }
            }
        });
        observe.next(stream);
        return () => {
            observer?.disconnect();
        };
    });
}

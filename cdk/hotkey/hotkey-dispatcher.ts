import { coerceElement } from '@angular/cdk/coercion';
import { Injectable, NgZone, ElementRef } from '@angular/core';
import { ThyEventDispatcher } from '@tethys/cdk/event';
import { fromEvent, Observable, OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isFormElement, isString, isUndefinedOrNull } from '@tethys/cdk/is';
import { isHotkey } from './hotkey';

function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
    return source => {
        return new Observable(observer => {
            const onNext = (value: T) => zone.run(() => observer.next(value));
            const onError = (e: any) => zone.run(() => observer.error(e));
            const onComplete = () => zone.run(() => observer.complete());
            return source.subscribe(onNext, onError, onComplete);
        });
    };
}

@Injectable({ providedIn: 'root' })
export class ThyHotkeyDispatcher extends ThyEventDispatcher {
    eventName = 'keydown';

    private createKeydownObservable(scope: Element | Document) {
        if (scope === this.document) {
            return this.subscribe(null);
        } else {
            return fromEvent(scope, 'keydown');
        }
    }

    /**
     *  热键事件订阅
     */
    keydown(hotkey: string | string[], scope?: ElementRef<Element> | Element | Document): Observable<KeyboardEvent> {
        const hotkeys = isString(hotkey) ? hotkey.split(',') : hotkey;
        const scopeElement = coerceElement(isUndefinedOrNull(scope) ? this.document : scope);
        const keydown = this.createKeydownObservable(scopeElement);
        return new Observable<KeyboardEvent>(subscriber => {
            const subscription = keydown
                .pipe(filter((event: KeyboardEvent) => hotkeys.some(key => isHotkey(event, key))))
                .subscribe((event: KeyboardEvent) => {
                    // 如果当前焦点的元素是表单元素并且焦点原色不是Hotkey绑定元素则忽略快捷键
                    if (isFormElement(this.document.activeElement) && this.document.activeElement !== scope) {
                        return;
                    }
                    subscriber.next(event);
                });
            return () => {
                subscription.unsubscribe();
            };
        }).pipe(runInZone(this.ngZone));
    }
}

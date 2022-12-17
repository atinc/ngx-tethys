import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, ElementRef } from '@angular/core';
import { ThyEventDispatcher } from '@tethys/cdk/event';
import { fromEvent, Observable, Subscriber } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isString, isUndefinedOrNull } from '@tethys/cdk/is';
import { isHotkey } from './hotkey';

@Injectable({ providedIn: 'root' })
export class ThyHotkeyDispatcher extends ThyEventDispatcher {
    private keydownSubscriber: Subscriber<KeyboardEvent>;

    constructor(@Inject(DOCUMENT) document: any, ngZone: NgZone) {
        super(document, ngZone, 'keydown');
    }

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
                    this.keydownSubscriber = subscriber;
                    this.ngZone.run(() => {
                        // setTimeout 是为了解决 Hotkey 冲突时仅执行最后订阅的事件
                        setTimeout(() => {
                            this.keydownSubscriber?.next(event);
                            this.keydownSubscriber = null;
                        });
                    });
                });
            return () => {
                subscription.unsubscribe();
            };
        });
    }
}

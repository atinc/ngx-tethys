import { coerceElement } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, ElementRef } from '@angular/core';
import { ThyEventDispatcher } from '@tethys/cdk/event';
import { fromEvent, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { isString } from '@tethys/cdk/is';
import { isHotkey } from './hotkey';

/**
 *  @private
 */
@Injectable({ providedIn: 'root' })
export class ThyHotkeyDispatcher extends ThyEventDispatcher {
    private hotkeyRecords: { scope: Element | Document; hotkeys: string[] }[] = [];

    constructor(@Inject(DOCUMENT) document: any, ngZone: NgZone) {
        super(document, ngZone, 'keydown');
    }

    private createKeydownObservable(scope: Element | Document) {
        if (scope === this.document) {
            return this.subscribe();
        } else {
            return fromEvent(scope, 'keydown');
        }
    }

    private checkHotkeyConflict(scope: Element | Document, hotkeys: string[]) {
        return this.hotkeyRecords.every(record => {
            if (scope === record.scope) {
                return hotkeys.every(hotkey => {
                    if (record.hotkeys.includes(hotkey)) {
                        throw new Error(`'${hotkey}' hotkey conflict detected`);
                    }
                    return true;
                });
            } else {
                return true;
            }
        });
    }

    keydown(hotkey: string | string[], scope: ElementRef<Element> | Element | Document = this.document): Observable<KeyboardEvent> {
        const hotkeys = isString(hotkey) ? hotkey.split(',') : hotkey;
        const scopeElement = coerceElement(scope);
        if (!this.checkHotkeyConflict(scopeElement, hotkeys)) {
            return;
        }
        const hotkeyRecord = { scope: scopeElement, hotkeys };
        this.hotkeyRecords.push(hotkeyRecord);
        const keydown = this.createKeydownObservable(scopeElement);
        return new Observable<KeyboardEvent>(observer => {
            keydown.pipe(
                filter((event: KeyboardEvent) => {
                    return hotkeys.some(key => isHotkey(key, event));
                }),
                tap(event => event.stopPropagation())
            );
            const subscription = keydown
                .pipe(filter((event: KeyboardEvent) => hotkeys.some(key => isHotkey(key, event))))
                .subscribe((event: KeyboardEvent) => {
                    event.stopPropagation();
                    observer.next(event);
                });
            return () => {
                subscription.unsubscribe();
                this.hotkeyRecords = this.hotkeyRecords.filter(record => record !== hotkeyRecord);
            };
        });
    }
}

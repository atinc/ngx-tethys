import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { isFormElement, isString } from '@tethys/cdk/is';
import { ThyHotkeyDispatcher } from './hotkey-dispatcher';

@Directive({ selector: '[thyHotkey]' })
export class ThyHotkeyDirective implements OnInit, OnDestroy {
    /**
     *  热键对应 Code，多个热键组合支持通过数组或逗号分割的形式传入
     */
    @Input() thyHotkey: string | string[];

    /**
     *  配置热键触发范围，默认绑定在 document 上
     */
    @Input() thyHotkeyScope?: string | Element | ElementRef<Element>;

    /**
     *  热键触发后的事件
     */
    @Output() thyHotkeyListener: EventEmitter<KeyboardEvent> = new EventEmitter();

    private subscription: Subscription = null;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private hotkeyDispatcher: ThyHotkeyDispatcher,
        private elementRef: ElementRef<HTMLElement>
    ) {}

    ngOnInit(): void {
        const scope = isString(this.thyHotkeyScope) ? this.document.querySelector(this.thyHotkeyScope) : this.thyHotkeyScope;
        this.subscription = this.hotkeyDispatcher.keydown(this.thyHotkey, scope).subscribe(event => {
            event.preventDefault();
            if (this.thyHotkeyListener.observers.length > 0) {
                this.thyHotkeyListener.emit(event);
            } else {
                if (isFormElement(this.elementRef)) {
                    this.elementRef.nativeElement.focus();
                } else {
                    this.elementRef.nativeElement.click();
                }
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

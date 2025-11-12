
import { Directive, ElementRef, OnInit, OnDestroy, inject, input, output, DOCUMENT } from '@angular/core';
import { Subscription } from 'rxjs';
import { isFormElement, isString } from '@tethys/cdk/is';
import { ThyHotkeyDispatcher } from './hotkey-dispatcher';

/**
 * @name thyHotkey
 */
@Directive({ selector: '[thyHotkey]' })
export class ThyHotkeyDirective implements OnInit, OnDestroy {
    private document = inject(DOCUMENT);
    private hotkeyDispatcher = inject(ThyHotkeyDispatcher);
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /**
     *  热键对应 Code，多个热键组合支持通过数组或逗号分割的形式传入
     */
    readonly thyHotkey = input<string | string[]>();

    /**
     *  配置热键触发范围，默认绑定在 document 上
     */
    readonly thyHotkeyScope = input<string | Element | ElementRef<Element>>();

    /**
     *  热键触发后的事件
     */
    readonly thyHotkeyListener = output<KeyboardEvent>();

    private subscription: Subscription = null;

    ngOnInit(): void {
        const hotkeyScope = this.thyHotkeyScope();
        const scope = isString(hotkeyScope) ? this.document.querySelector(hotkeyScope) : hotkeyScope;
        this.subscription = this.hotkeyDispatcher.keydown(this.thyHotkey(), scope).subscribe(event => {
            event.preventDefault();
            event.stopPropagation();
            if (isFormElement(this.elementRef)) {
                this.elementRef.nativeElement.focus();
            } else {
                this.elementRef.nativeElement.click();
            }
            this.thyHotkeyListener.emit(event);
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

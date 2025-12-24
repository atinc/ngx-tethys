import {
    AfterViewInit,
    DestroyRef,
    Directive,
    ElementRef,
    inject,
    Injector,
    Input,
    OnDestroy,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThyPopover, ThyPopoverRef } from 'ngx-tethys/popover';

import { ThyNativeTableEditEventDispatcher } from './edit-event-dispatcher.service';
import { ThyNativeTableEditRef } from './edit-ref';

@Directive({
    selector: 'td[thyCellPopoverEdit]',

    providers: [ThyNativeTableEditRef],
    host: {
        class: 'thy-native-table-cell-edit'
    }
})
export class ThyNativeTableTdPopoverEditDirective implements AfterViewInit, OnDestroy {
    private elementRef = inject(ElementRef<HTMLElement>);
    private viewContainerRef = inject(ViewContainerRef);
    private popover = inject(ThyPopover);
    private dispatcher = inject(ThyNativeTableEditEventDispatcher);
    private destroyRef = inject(DestroyRef);

    @Input('thyCellPopoverEdit') editTemplate!: TemplateRef<any>;

    private popoverRef?: ThyPopoverRef<any>;
    private focusoutUnsubscribe?: () => void;

    ngAfterViewInit(): void {
        this.dispatcher
            .editingCell(this.elementRef.nativeElement)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(isEditing => {
                if (isEditing) {
                    this.openPopover();
                } else {
                    this.closePopover();
                }
            });
    }

    private openPopover(): void {
        if (this.popoverRef) {
            return;
        }

        if (!this.editTemplate) {
            return;
        }

        const tdElement = this.elementRef.nativeElement;
        const rect = tdElement.getBoundingClientRect();

        this.popoverRef = this.popover.open(this.editTemplate, {
            origin: tdElement,
            viewContainerRef: this.viewContainerRef,
            placement: 'bottom',
            offset: -rect.height,
            hasBackdrop: false,
            panelClass: 'thy-native-table-popover-edit',
            originActiveClass: 'thy-native-table-cell-editing',
            animationDisabled: true
        });

        this.popoverRef?.afterOpened().subscribe(() => {
            const popoverElement = document.querySelector('.thy-native-table-popover-edit') as HTMLElement;
            if (popoverElement) {
                popoverElement.style.width = `${rect.width}px`;
                popoverElement.style.minWidth = `${rect.width}px`;
                popoverElement.style.height = `${rect.height}px`;
                popoverElement.style.minHeight = `${rect.height}px`;
                this.listenFocusout(popoverElement);
            }
        });

        this.popoverRef?.afterClosed().subscribe(() => {
            this.popoverRef = undefined;
            this.focusoutUnsubscribe?.();
        });
    }

    private listenFocusout(popoverElement: HTMLElement): void {
        const handler = () => {
            // 延迟 100ms 检查焦点是否还在 popover 内
            // 避免在 popover 内部元素之间切换焦点时误关闭
            setTimeout(() => {
                if (document.activeElement && !popoverElement.contains(document.activeElement)) {
                    this.dispatcher.stopEditing();
                }
            }, 100);
        };

        popoverElement.addEventListener('focusout', handler);
        this.focusoutUnsubscribe = () => {
            popoverElement.removeEventListener('focusout', handler);
        };
    }

    private closePopover(): void {
        this.popoverRef?.close();
    }

    ngOnDestroy(): void {
        this.closePopover();
    }
}

import {
    Component, OnInit, ElementRef,
    HostBinding, Inject,
    Renderer2, ViewEncapsulation, HostListener, NgZone, OnDestroy, DoCheck, AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PopBoxRef } from './pop-box-ref.service';
import { PopBoxOptions } from './pop-box-options.class';
import { ThyPositioningService } from '../positioning/positioning.service';

@Component({
    selector: 'pop-box-container',
    templateUrl: './pop-box-container.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PopBoxContainerComponent implements OnInit, OnDestroy, DoCheck, AfterViewInit {

    @HostBinding('style.z-index') _zIndex: number | string;

    public popBoxRef: PopBoxRef;

    public showMask = false;

    private _originHeight: number;

    _unsubscribe: () => void;

    constructor(
        protected elementRef: ElementRef,
        private renderer: Renderer2,
        public config: PopBoxOptions,
        @Inject(DOCUMENT) private document: Document,
        private ngZone: NgZone,
        private thyPositioningService: ThyPositioningService
    ) {
        this.showMask = this.config.showMask;
    }

    ngOnInit(): void {
        this._zIndex = this.config.zIndex || '';
        this.ngZone.runOutsideAngular(() => {
            this._unsubscribe = this.renderer.listen(this.document, 'click', this.onDocumentClick.bind(this));
        });
    }

    ngAfterViewInit() {
        this._originHeight = (+this.elementRef.nativeElement.clientHeight);
    }


    hide(): void {
        this.popBoxRef.hide();
    }

    clickPopBox(event: Event): void {
        if (this.config.stopPropagation) {
            event.stopPropagation();
        }
        if (this.showMask && this.config.insideAutoClose) {
            this.hide();
        }
    }

    clickMask(event: Event): void {
        if (this.config.outsideAutoClose) {
            this.hide();
        } else {
            return;
            // this.closePopBox(event);
        }
    }

    @HostListener('window:keydown.esc', ['$event'])
    onEsc(event: any): void {
        if (this.config.keyboardESCClose) {
            event.preventDefault();
            this.hide();
        }
    }

    // @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        if (this.config.showMask) {
            return;
        }
        // 是否点击了 pop box 内部区域
        const isClickPopBoxInner = this.elementRef.nativeElement.contains(event.target);
        let needClose = false;
        if (this.config.outsideAutoClose) {
            // 没有 target，说明是 直接传入的 position，点击外部元素直接关闭即可
            if (!this.config.target && !isClickPopBoxInner) {
                needClose = true;
            } else if (this.config.target && !this.config.target.contains(event.target) && !isClickPopBoxInner) {
                // 点击事件元素不是原来的触发弹出元素，并且不是 pob box 内部元素点击
                needClose = true;
            }
        }
        if (this.config.insideAutoClose && isClickPopBoxInner) {
            needClose = true;
        }

        if (needClose) {
            this.ngZone.run(() => {
                this.hide();
            });
        }
    }

    ngDoCheck(): void {
        const height = (+this.elementRef.nativeElement.clientHeight);
        if (height !== this._originHeight) {
            this._originHeight = height;
            this.thyPositioningService.setPosition({
                target: this.elementRef,
                attach: this.config.target,
                placement: this.config.placement,
                offset: this.config.offset,
                appendToBody: true,
                position: this.config.position,
                autoAdapt: true
            });
        }
    }

    ngOnDestroy() {
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }
    }
}

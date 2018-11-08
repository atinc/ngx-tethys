import {
    Directive, ElementRef,
    Input, OnInit, Renderer2, HostBinding,
    AfterViewInit, AfterViewChecked, HostListener,
    ChangeDetectorRef, OnDestroy,
    NgZone
} from '@angular/core';
import { UpdateHostClassService } from '../shared';
import { NgForm, AbstractControl } from '@angular/forms';
import { keycodes } from '../util';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

// 1. submit 按 Enter 键提交, Textare 除外，需要按 Ctrl | Command + Enter 提交
// 2. alwaysSubmit 不管是哪个元素 按 Enter 键都提交
// 3. forbidSubmit Enter 键禁止提交
// 默认 submit
export enum ThyEnterKeyMode {
    submit = 'submit',
    alwaysSubmit = 'alwaysSubmit',
    forbidSubmit = 'forbidSubmit'
}

@Directive({
    selector: '[thyForm]',
    providers: [UpdateHostClassService]
})
export class ThyFormDirective implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

    private _layout: ThyFormLayout = 'horizontal';

    private _formControlKeys = new Array<string>();

    @Input()
    set thyLayout(value: ThyFormLayout) {
        this._layout = value;
    }

    get thyLayout(): ThyFormLayout {
        return this._layout;
    }

    @Input() thyEnterKeyMode: ThyEnterKeyMode;

    @HostBinding('class.thy-form') isThyForm = true;

    @HostBinding('class.was-validated') wasValidated = false;

    onSubmitSuccess: ($event: any) => void;

    private _unsubscribe: () => void;

    constructor(
        private ngForm: NgForm,
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
        private updateHostClassService: UpdateHostClassService) {
    }

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this._unsubscribe = this.renderer.listen(this.elementRef.nativeElement, 'keydown', this.onKeydown.bind(this));
        });
    }

    ngAfterViewInit() {
    }

    ngAfterViewChecked() {
    }

    submit($event: any) {
        this.ngForm.onSubmit($event);
        if (this.ngForm.valid) {
            this.onSubmitSuccess($event);
        } else {
            this.wasValidated = true;
        }
    }

    submitRunInZone($event: any) {
        this.ngZone.run(() => {
            this.submit($event);
        });
    }

    onKeydown($event: KeyboardEvent) {
        const currentInput = document.activeElement;
        const key = $event.which || $event.keyCode;
        if (key === keycodes.ENTER && currentInput.tagName) {
            if (!this.thyEnterKeyMode || this.thyEnterKeyMode === ThyEnterKeyMode.submit) {
                // TEXTAREA Ctrl + Enter 或者 Command + Enter 阻止默认行为并提交
                if (currentInput.tagName === 'TEXTAREA') {
                    if ($event.ctrlKey || $event.metaKey) {
                        $event.preventDefault();
                        this.submitRunInZone($event);
                    }
                } else {
                    // 不是 TEXTAREA Enter 阻止默认行为并提交
                    $event.preventDefault();
                    this.submitRunInZone($event);
                }
            } else if (this.thyEnterKeyMode === ThyEnterKeyMode.alwaysSubmit) {
                $event.preventDefault();
                this.submitRunInZone($event);
            } else {
                // do nothing
            }
        }
    }

    ngOnDestroy() {
        if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
        }
    }
}

import {
    Directive, ElementRef,
    Input, OnInit, Renderer2, HostBinding,
    AfterViewInit, AfterViewChecked, HostListener
} from '@angular/core';
import { UpdateHostClassService } from '../shared';
import { NgForm, AbstractControl } from '@angular/forms';

export type ThyFormLayout = 'horizontal' | 'vertical' | 'inline';

// 1. submit 按 Enter 键提交, Textare 除外，需要按 Ctrl | Command + Enter 提交
// 2. alwaysSubmit 不管是哪个元素 按 Enter 键都提交
// 3. forbidSubmit Enter 键禁止提交
// 默认 submit
export enum ThyEnterKeyModel {
    submit = 'submit',
    alwaysSubmit = 'alwaysSubmit',
    forbidSubmit = 'forbidSubmit'
}

@Directive({
    selector: '[thyForm]',
    providers: [UpdateHostClassService]
})
export class ThyFormDirective implements OnInit, AfterViewInit, AfterViewChecked {

    private _layout: ThyFormLayout = 'horizontal';

    private _formControlKeys = new Array<string>();

    @Input()
    set thyLayout(value: ThyFormLayout) {
        this._layout = value;
    }

    get thyLayout(): ThyFormLayout {
        return this._layout;
    }

    @Input() thyEnterKeyModel: ThyEnterKeyModel;

    @HostBinding('class.thy-form') isThyForm = true;

    @HostBinding('class.was-validated') wasValidated = false;

    onSubmitSuccess: ($event: any) => void;

    constructor(
        private ngForm: NgForm,
        private elementRef: ElementRef,
        private updateHostClassService: UpdateHostClassService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
    }

    ngAfterViewChecked() {
        // if (this._formControlKeys.length > 0) {
        //     return;
        // }
        // for (const key in this.ngForm.controls) {
        //     if (this.ngForm.controls.hasOwnProperty(key)) {
        //         this._formControlKeys.push(key);
        //         this.ngForm.controls[key].valueChanges.subscribe((value) => {
        //         });
        //     }
        // }
    }

    submit($event: any) {
        this.ngForm.onSubmit($event);
        if (this.ngForm.valid) {
            this.onSubmitSuccess($event);
        } else {
            this.wasValidated = true;
        }
    }

    @HostListener('keydown', ['$event'])
    enter($event: KeyboardEvent) {
        const currentInput = document.activeElement;
        const key = $event.which || $event.keyCode;
        if (key === 13 && currentInput.tagName) {
            if (!this.thyEnterKeyModel || this.thyEnterKeyModel === ThyEnterKeyModel.submit) {
                // TEXTAREA Ctrl + Enter 或者 Command + Enter 阻止默认行为并提交
                if (currentInput.tagName === 'TEXTAREA') {
                    if ($event.ctrlKey || $event.metaKey) {
                        $event.preventDefault();
                        this.submit($event);
                    }
                } else {
                    // 不是 TEXTAREA Enter 阻止默认行为并提交
                    $event.preventDefault();
                    this.submit($event);
                }
            } else if (this.thyEnterKeyModel === ThyEnterKeyModel.alwaysSubmit) {
                $event.preventDefault();
                this.submit($event);
            } else {
                // do nothing
            }
        }
    }
}

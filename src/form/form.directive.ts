import { keycodes } from 'ngx-tethys/util';

import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    inject,
    input,
    afterRenderEffect,
    effect,
    afterNextRender
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { ThyFormValidatorService } from './form-validator.service';
import { THY_FORM_CONFIG, ThyFormConfig, ThyFormLayout, ThyFormValidatorConfig } from './form.class';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

// 1. submit 按 Enter 键提交, Textare或包含[contenteditable]属性的元素 除外，需要按 Ctrl | Command + Enter 提交
// 2. alwaysSubmit 不管是哪个元素 按 Enter 键都提交
// 3. forbidSubmit Enter 键禁止提交
// 默认 submit
export enum ThyEnterKeyMode {
    submit = 'submit',
    alwaysSubmit = 'alwaysSubmit',
    forbidSubmit = 'forbidSubmit'
}

/**
 * 表单
 * @name thyForm,[thy-form]
 * @order 10
 */
@Directive({ selector: '[thyForm],[thy-form]', providers: [ThyFormValidatorService], exportAs: 'thyForm', host: { class: 'thy-form' } })
export class ThyFormDirective implements OnInit, AfterViewInit, OnDestroy {
    private ngForm = inject(ControlContainer);
    private elementRef = inject(ElementRef);
    private renderer = inject(Renderer2);
    private ngZone = inject(NgZone);
    readonly validator = inject(ThyFormValidatorService);
    private config = inject(THY_FORM_CONFIG);

    private hostRenderer = useHostRenderer();

    /**
     * 布局，默认水平居中 horizontal，其他2种布局待开发
     * @type horizontal | vertical | inline
     * @default horizontal
     */
    readonly thyLayout = input<ThyFormLayout>(undefined);

    get isHorizontal() {
        return this.layout === 'horizontal';
    }

    private get layout() {
        return this.thyLayout() || this.config.layout;
    }

    /**
     * Enter 键提交模式。`submit`: Textarea 需要 Ctrl | Command + Enter 提交，其他元素直接 Enter 提交； `alwaysSubmit`: 不管是什么元素 Enter 都提交； `forbidSubmit`: Enter 不提交
     * @type submit | alwaysSubmit | forbidSubmit
     * @default submit
     */
    readonly thyEnterKeyMode = input<ThyEnterKeyMode>(undefined);

    /**
     * 表单验证规则配置项 （更多内容查看：thyFormValidatorConfig）
     */
    readonly thyFormValidatorConfig = input<ThyFormValidatorConfig>();

    @HostBinding('class.was-validated') wasValidated = false;

    onSubmitSuccess: ($event: any) => void;

    private _unsubscribe: () => void;

    @ContentChildren(NgControl, { descendants: true })
    public controls: QueryList<NgControl>;

    constructor() {
        effect(() => {
            this.updateClasses();
        });

        effect(() => {
            const config = this.thyFormValidatorConfig();
            if (config) {
                this.validator.setValidatorConfig(config);
            }
        });

        // TODO:: replace ngAfterViewInit with afterNextRender
        // afterNextRender(() => {
        //     this.validator.initialize(this.ngForm as NgForm, this.elementRef.nativeElement);
        //     this.validator.initializeFormControlsValidation(this.controls.toArray());
        //     this.controls.changes.subscribe(controls => {
        //         this.validator.initializeFormControlsValidation(this.controls.toArray());
        //     });
        // });
    }

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this._unsubscribe = this.renderer.listen(this.elementRef.nativeElement, 'keydown', this.onKeydown.bind(this));
        });
    }

    ngAfterViewInit() {
        this.validator.initialize(this.ngForm as NgForm, this.elementRef.nativeElement);
        this.validator.initializeFormControlsValidation(this.controls.toArray());
        this.controls.changes.subscribe(controls => {
            this.validator.initializeFormControlsValidation(this.controls.toArray());
        });
    }

    submit($event: Event) {
        const result = this.validator.validateWithDetail($event);
        if (result.valid) {
            if (this.onSubmitSuccess) {
                this.onSubmitSuccess($event);
            }
        } else {
            const invalidElement = result.invalidControls[0].element;
            invalidElement.focus();
        }
    }

    updateClasses() {
        this.hostRenderer.updateClassByMap({ [`thy-form-${this.layout}`]: true });
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
            const thyEnterKeyMode = this.thyEnterKeyMode();
            if (!thyEnterKeyMode || thyEnterKeyMode === ThyEnterKeyMode.submit) {
                // TEXTAREA或包含[contenteditable]属性的元素 Ctrl + Enter 或者 Command + Enter 阻止默认行为并提交
                if (currentInput.tagName === 'TEXTAREA' || coerceBooleanProperty(currentInput.getAttribute('contenteditable'))) {
                    if ($event.ctrlKey || $event.metaKey) {
                        $event.preventDefault();
                        this.submitRunInZone($event);
                    }
                } else {
                    // 不是 TEXTAREA Enter 阻止默认行为并提交
                    $event.preventDefault();
                    this.submitRunInZone($event);
                }
            } else if (thyEnterKeyMode === ThyEnterKeyMode.alwaysSubmit) {
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

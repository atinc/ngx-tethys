import { Component, HostBinding, ViewEncapsulation, OnInit, Input, ContentChild, TemplateRef, inject } from '@angular/core';
import { ThyFormDirective } from '../form.directive';
import { ThyFormGroupFooterAlign, THY_FORM_CONFIG, ThyFormConfig } from '../form.class';
import { NgClass, NgTemplateOutlet } from '@angular/common';

/**
 * 表单组底部组件
 * @name thy-form-group-footer
 * @order 55
 */
@Component({
    selector: 'thy-form-group-footer',
    templateUrl: './form-group-footer.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgClass, NgTemplateOutlet]
})
export class ThyFormGroupFooter implements OnInit {
    private thyParentForm = inject(ThyFormDirective, { optional: true })!;
    private defaultConfig = inject(THY_FORM_CONFIG);

    @HostBinding('class.form-group') _isFormGroup = true;

    @HostBinding('class.row') isHorizontal = true;

    @ContentChild('description') description: TemplateRef<any>;

    /**
     * 对齐方式
     * @type left | right | center
     * @default left
     */
    @Input() thyAlign: ThyFormGroupFooterAlign;

    public footerClassMap = {};

    private get align() {
        return !!this.thyAlign ? this.thyAlign : this.defaultConfig.footerAlign;
    }

    ngOnInit() {
        if (this.thyParentForm) {
            this.isHorizontal = this.thyParentForm.isHorizontal;
        }
        this.setFooterClassMap();
    }

    setFooterClassMap() {
        this.footerClassMap = {
            'form-group-footer': true,
            'col-sm-10 offset-sm-2 col-form-control': this.isHorizontal,
            [`form-group-footer-align-${this.align}`]: true
        };
    }
}

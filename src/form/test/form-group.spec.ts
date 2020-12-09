import { ThyFormModule } from './../module';
import { ThyFormValidatorConfig } from '../form.class';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'form-group',
    template: `
        <form thyForm name="demoForm" [thyFormValidatorConfig]="validateConfig" class="myForm" #demoForm="thyForm" thyLayout="'vertical'">
            <thy-form-group thyLabelRequired>
                <input thyInput name="username" [(ngModel)]="model.name" required placeholder="请输入用户名" />
            </thy-form-group>
            <thy-form-group-footer>
                <button [thyButton]="'primary'" thyLoadingText="确定" (thyFormSubmit)="submit()">
                    登录
                </button>
            </thy-form-group-footer>
        </form>
    `
})
export class FormGroupComponent {
    model = {
        name: ''
    };
    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            username: {
                required: '用户名不能为空'
            }
        }
    };

    submit() {}
}

describe('form-group', () => {
    let fixture: ComponentFixture<FormGroupComponent>;
    let component: FormGroupComponent;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [FormGroupComponent],
            imports: [ThyFormModule, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(FormGroupComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(fixture).toBeTruthy();
    });

    it('should hide label when thyLayout vertical and thyLabelText is empty', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector(`.form-label`)).not.toBeTruthy();
    });
});

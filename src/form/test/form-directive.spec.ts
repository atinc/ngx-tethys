import { ThyFormModule } from './../module';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyFormDirective } from '../form.directive';
import { ThyLayoutModule } from '../../layout/layout.module';
import { FormsModule } from '@angular/forms';
import { THY_FORM_CONFIG } from '../form.class';

@Component({
    selector: 'thy-demo-form-directive',
    template: `
        <form thyForm [thyLayout]="thyLayout"></form>
    `
})
export class ThyDemoFormDirectiveComponent {
    thyLayout = '';
}

describe('form basic directive', () => {
    let fixture: ComponentFixture<ThyDemoFormDirectiveComponent>;
    let basicTestComponent: ThyDemoFormDirectiveComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ThyDemoFormDirectiveComponent],
            imports: [ThyFormModule, FormsModule, ThyLayoutModule],
            providers: []
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoFormDirectiveComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
    });

    it('Global config is not set, it should be horizontal', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-horizontal')).toBe(true);
    });

    it('When setting thyLayout to horizontal, it should be horizontal', () => {
        basicTestComponent.thyLayout = 'horizontal';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-horizontal')).toBe(true);
    });

    it('When setting thyLayout to vertical, it should be vertical', () => {
        basicTestComponent.thyLayout = 'vertical';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-vertical')).toBe(true);
    });

    it('When setting thyLayout to inline, it should be inline', () => {
        basicTestComponent.thyLayout = 'inline';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-inline')).toBe(true);
    });
});

describe('form directive global config', () => {
    let fixture: ComponentFixture<ThyDemoFormDirectiveComponent>;
    let basicTestComponent: ThyDemoFormDirectiveComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, FormsModule, ThyLayoutModule],
            declarations: [ThyDemoFormDirectiveComponent],
            providers: [
                {
                    provide: THY_FORM_CONFIG,
                    useValue: {
                        layout: 'vertical'
                    }
                }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoFormDirectiveComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyFormDirective));
    });

    it('When setting global to vertical, it should be vertical', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-vertical')).toBe(true);
    });

    it('When setting thyLayout to horizontal, it should be horizontal', () => {
        basicTestComponent.thyLayout = 'horizontal';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-horizontal')).toBe(true);
    });

    it('When setting thyLayout to vertical, it should be vertical', () => {
        basicTestComponent.thyLayout = 'vertical';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-vertical')).toBe(true);
    });

    it('When setting thyLayout to inline, it should be inline', () => {
        basicTestComponent.thyLayout = 'inline';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('thy-form-inline')).toBe(true);
    });
});

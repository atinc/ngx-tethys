import { ThyNativeSelect } from 'ngx-tethys/select';
import { Component, DebugElement, Sanitizer, SecurityContext, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThySelectModule } from 'ngx-tethys/select';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'app-basic-select-demo',
    template: `
        <thy-native-select
            [thySize]="size"
            [disabled]="disabled"
            [(ngModel)]="value"
            (ngModelChange)="change($event)"
            [thyAllowClear]="allowClear">
            <option value="">请选择</option>
            <option value="option1">选项1</option>
            <option value="option2">选项2</option>
        </thy-native-select>
    `,
    imports: [ThySelectModule, FormsModule]
})
class BasicNativeSelectComponent {
    readonly selectComponent = viewChild<ThyNativeSelect>(ThyNativeSelect);

    value = '';
    allowClear = false;
    size = '';
    disabled = true;
    change(): void {}
}

describe(`select`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                {
                    provide: Sanitizer,
                    useValue: {
                        sanitize: (context: SecurityContext, html: string) => html
                    }
                }
            ]
        }).compileComponents();

        // inject([ThyIconRegistry], (iconRegistry: ThyIconRegistry) => {
        //     iconRegistry.addSvgIconLiteral(
        //         'angle-down',
        //         `<svg viewBox="0 0 16 16" id="angle-down" xmlns="http://www.w3.org/2000/svg">
        //             <path d="M7.978 11.997l-.005.006L2.3 6.33l.83-.831 4.848 4.848L12.826 5.5l.83.83-5.673 5.673-.005-.006z"/>
        //         </svg>`
        //     );
        // })();
    });

    describe(`basic`, () => {
        let fixture: ComponentFixture<BasicNativeSelectComponent>;
        let testComponent: BasicNativeSelectComponent;
        let debugComponent: DebugElement;
        let selectElement: any;
        let selectElementChildren: any[];

        beforeEach(() => {
            fixture = TestBed.createComponent(BasicNativeSelectComponent);
            testComponent = fixture.debugElement.componentInstance;
            debugComponent = fixture.debugElement.query(By.directive(ThyNativeSelect));
            selectElement = debugComponent.nativeElement;
            selectElementChildren = selectElement.children;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(debugComponent).toBeTruthy();
            expect(selectElement).toBeTruthy();
        });

        it('should create correct DOM structure', fakeAsync(() => {
            expect(debugComponent.name).toEqual('thy-native-select');
            expect(selectElementChildren.length).toEqual(2);
            expect(selectElementChildren[0].nodeName).toEqual('SELECT');
            expect(selectElementChildren[0].nodeType).toEqual(1);
            expect(selectElementChildren[0].parentNode.nodeName).toEqual('THY-NATIVE-SELECT');
            expect(selectElementChildren[0].nextElementSibling.nodeName).toEqual('THY-ICON');
            expect(selectElementChildren[0].attributes[0].nodeName).toEqual('thyinput');
            expect(selectElementChildren[0].attributes[0].nodeType).toEqual(2);
            expect(selectElementChildren[1].nodeName).toEqual('THY-ICON');
            expect(selectElementChildren[1].nodeType).toEqual(1);
            fixture.detectChanges();
            expect(selectElementChildren[1].classList.value.includes('thy-icon-angle-down')).toBe(true);
        }));

        it('should has correct size', () => {
            const sizes = ['xs', 'sm', 'md', 'lg'];
            testComponent.size = '';
            fixture.detectChanges();
            sizes.forEach(size => {
                expect(selectElementChildren[0].classList.value.includes(`form-control-${size}`)).toBe(false);
            });
            sizes.forEach(size => {
                testComponent.size = size;
                fixture.detectChanges();
                expect(selectElementChildren[0].classList.value.includes(`form-control-${size}`)).toBe(true);
            });
        });

        it('thyAllowClear', () => {
            testComponent.allowClear = true;
            fixture.detectChanges();
            expect(selectElementChildren[0].classList.value.includes('thy-select-selection-allow-clear')).toBe(true);
            testComponent.allowClear = false;
            fixture.detectChanges();
            expect(selectElementChildren[0].classList.value.includes('thy-select-selection-allow-clear')).toBe(false);
        });

        it('should exist remove btn when allowClear is true and value is not null', fakeAsync(() => {
            fixture.componentInstance.allowClear = true;
            fixture.componentInstance.value = '有值了';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            const removeBtn = debugComponent.nativeElement.querySelector('.thy-select-remove');
            const removeIcon = debugComponent.nativeElement.querySelector('.remove-link-icon');
            expect(removeBtn).toBeTruthy();
            expect(removeIcon).toBeTruthy();

            expect(removeBtn.nodeName).toEqual('A');
            expect(removeIcon.nodeName).toEqual('THY-ICON');
            expect(removeIcon.attributes['thyiconname'].nodeType).toEqual(2);
            expect(removeIcon.attributes['thyiconname'].nodeValue).toEqual('close-circle-bold-fill');
            expect(removeIcon.attributes['class'].nodeType).toEqual(2);
            expect(removeIcon.attributes['class'].nodeValue).toContain('thy-icon remove-link-icon thy-icon-close-circle-bold-fill');
        }));

        it('show clear value when click remove btn', fakeAsync(() => {
            const spy = spyOn(fixture.componentInstance, 'change');
            fixture.componentInstance.allowClear = true;
            fixture.componentInstance.value = '有值了';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(debugComponent.componentInstance.innerValue()).toBe('有值了');
            const removeBtn = debugComponent.nativeElement.querySelector('.thy-select-remove');
            expect(removeBtn).toBeTruthy();

            removeBtn.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(debugComponent.componentInstance.innerValue()).toBe('');
            expect(spy).toHaveBeenCalled();
        }));

        it('should work when disabled is changed', fakeAsync(() => {
            fixture.detectChanges();
            const selectNativeElement = fixture.debugElement.query(By.css('select')).nativeElement;
            const component = debugComponent.componentInstance;
            const changeSpy = spyOn(testComponent, 'change');

            expect(component.disabled()).toBe(false);
            expect(selectNativeElement.disabled).toBe(false);
            selectNativeElement.value = 'option1';
            dispatchFakeEvent(selectNativeElement, 'change');
            fixture.detectChanges();
            tick();
            expect(testComponent.value).toBe('option1');
            expect(changeSpy).toHaveBeenCalled();

            component.setDisabledState(true);
            fixture.detectChanges();
            tick();
            expect(selectNativeElement.disabled).toBe(true);
            changeSpy.calls.reset();
            const previousValue = testComponent.value;
            selectNativeElement.click();
            fixture.detectChanges();
            tick();
            expect(testComponent.value).toBe(previousValue);
            expect(changeSpy).not.toHaveBeenCalled();
        }));

        it('should call blur methods when blur', fakeAsync(() => {
            fixture.detectChanges();
            const touchSpy = spyOn<any>(fixture.componentInstance.selectComponent(), 'onTouchedFn');
            const blurSpy = spyOn<any>(fixture.componentInstance.selectComponent(), 'onBlur').and.callThrough();
            const trigger = fixture.debugElement.query(By.css('select')).nativeElement;
            dispatchFakeEvent(trigger, 'blur');
            fixture.detectChanges();
            expect(touchSpy).toHaveBeenCalled();
            expect(blurSpy).toHaveBeenCalled();
        }));

        it('should call blur and not call onTouchFn when blur', fakeAsync(() => {
            fixture.detectChanges();

            const blurSpy = spyOn<any>(fixture.componentInstance.selectComponent(), 'onTouchedFn');
            const trigger = fixture.debugElement.query(By.css('select')).nativeElement;
            fixture.componentInstance.selectComponent().onBlur({ relatedTarget: trigger } as FocusEvent);

            fixture.detectChanges();

            expect(blurSpy).not.toHaveBeenCalled();
        }));

        it('should call onFocus methods when focus', fakeAsync(() => {
            fixture.detectChanges();
            const focusSpy = spyOn<any>(fixture.componentInstance.selectComponent(), 'onFocus').and.callThrough();

            dispatchFakeEvent(selectElement, 'focus');
            fixture.detectChanges();

            expect(focusSpy).toHaveBeenCalled();
        }));
    });
});

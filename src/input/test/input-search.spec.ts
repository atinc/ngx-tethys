import { dispatchEvent, dispatchFakeEvent, dispatchMouseEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { Component, DebugElement, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyInputSearch, ThyInputSearchIconPosition } from '../input-search.component';
import { ThyInputDirective } from 'ngx-tethys/input';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-input-search-basic-test',
    template: `
        <thy-input-search
            name="search"
            placeholder="Please type"
            [disabled]="disabled"
            [thyTheme]="thyTheme"
            [thySearchFocus]="searchFocus"
            [(ngModel)]="searchText"
            (ngModelChange)="modelChange($event)"
            (thyClear)="onClear()"
            [thySize]="thySize"
            [thyIconPosition]="iconPosition"></thy-input-search>
    `,
    imports: [ThyInputSearch, FormsModule]
})
class TestInputSearchBasicComponent {
    readonly inputSearchComponent = viewChild(ThyInputSearch);

    searchFocus = true;
    searchText = '';
    thySize = 'sm';
    thyTheme = ``;
    disabled = false;
    iconPosition: ThyInputSearchIconPosition;
    onClear() {}

    modelChange($event: string) {}
}

describe('input search', () => {
    let fixture: ComponentFixture<TestInputSearchBasicComponent> | undefined = undefined;
    let basicTestComponent: TestInputSearchBasicComponent | undefined = undefined;
    let debugInputElement: DebugElement | undefined = undefined;
    let debugSearchElement: DebugElement | undefined = undefined;
    let searchElement: HTMLElement | undefined = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInputSearchBasicComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugInputElement = fixture.debugElement.query(By.directive(ThyInputDirective));
        debugSearchElement = fixture.debugElement.query(By.directive(ThyInputSearch));
        searchElement = debugSearchElement.nativeElement;
        injectDefaultSvgIconSet();
    });

    it('should create thy-input-search', () => {
        fixture.detectChanges();
        expect(debugSearchElement.componentInstance).toBeTruthy();
        expect(debugInputElement.componentInstance).toBeTruthy();
        expect(searchElement.classList.contains('thy-input')).toBeTruthy();
        expect(searchElement.classList.contains('form-control')).toBeTruthy();
        expect(searchElement.classList.contains('thy-input-search')).toBeTruthy();
        expect(debugInputElement.nativeElement.classList.contains('input-search-control')).toBeTruthy();
        expect(debugInputElement.nativeElement.placeholder).toBe('Please type');
        const prependIcon: HTMLElement = searchElement.querySelector('.input-prepend');
        expect(prependIcon).toBeTruthy();
        expect(prependIcon.classList.contains('thy-icon-search')).toBeTruthy();
    });

    it('should set after icon', fakeAsync(() => {
        basicTestComponent.iconPosition = 'after';
        fixture.detectChanges();
        expect(searchElement.querySelector('.input-prepend')).toBeFalsy();
        const appendElement = searchElement.querySelector('.input-append');
        expect(appendElement).toBeTruthy();
        expect(appendElement.classList.contains(`input-append-divider`)).toBeTruthy();
        expect(appendElement.classList.contains(`input-append-divider`)).toBeTruthy();
        expect(appendElement.querySelector('.thy-icon-search')).toBeTruthy();

        basicTestComponent.searchText = 'New Text';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(appendElement.querySelector('.thy-icon-search')).toBeFalsy();
        expect(appendElement.querySelector('.thy-icon-close')).toBeTruthy();
        expect(appendElement.querySelector('.close')).toBeTruthy();
    }));

    it('should trigger ngModel change', fakeAsync(() => {
        const modelChangeSpy = spyOn(basicTestComponent, 'modelChange');
        fixture.detectChanges();
        expect(modelChangeSpy).not.toHaveBeenCalled();
        debugInputElement.nativeElement.value = 'new value';
        dispatchEvent(debugInputElement.nativeElement, new Event('input'));
        fixture.detectChanges();
        tick();
        expect(modelChangeSpy).toHaveBeenCalled();
    }));

    it('should set theme', () => {
        basicTestComponent.thyTheme = 'default';
        fixture.detectChanges();
        expect(searchElement.classList.contains('thy-input-search-ellipse')).toBe(false);

        basicTestComponent.thyTheme = 'ellipse';
        fixture.detectChanges();
        expect(searchElement.classList.contains('thy-input-search-ellipse')).toBe(true);

        basicTestComponent.thyTheme = 'transparent';
        fixture.detectChanges();
        expect(searchElement.classList.contains('thy-input-search-transparent')).toBe(true);
        expect(searchElement.classList.contains('thy-input-search-ellipse')).toBe(false);
    });

    it('thyClear EventEmitter', fakeAsync(() => {
        basicTestComponent.searchText = 'New Text';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const closeIcon = debugSearchElement.nativeElement.querySelector('.input-append');
        expect(closeIcon).toBeTruthy();

        const afterClearSpy = jasmine.createSpy('after clear spy');
        debugSearchElement.componentInstance.thyClear.subscribe(() => {
            afterClearSpy();
        });

        closeIcon.click();
        fixture.detectChanges();
        expect(afterClearSpy).toHaveBeenCalled();
    }));

    it('after clear input should focus', fakeAsync(() => {
        basicTestComponent.searchText = 'New Text';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const closeIcon = debugSearchElement.nativeElement.querySelector('.input-append');
        closeIcon.click();
        fixture.detectChanges();
        const inputEle = debugSearchElement.nativeElement.querySelector('input');
        expect(inputEle === document.activeElement).toBeTruthy();
    }));

    it('focus and blur', fakeAsync(() => {
        fixture.detectChanges();
        expect(searchElement.classList.contains('form-control-active')).toBe(true);

        const debugInputInstance = fixture.debugElement.query(By.directive(ThyInputSearch)).componentInstance;
        debugInputInstance.focused.set(false);
        fixture.detectChanges();
        expect(searchElement.classList.contains('form-control-active')).toBe(false);
    }));

    it('disabled and dont support clear when disabled', fakeAsync(() => {
        basicTestComponent.disabled = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(debugSearchElement.componentInstance.disabled()).toBe(true);

        basicTestComponent.searchText = 'New Text';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const afterClearSpy = jasmine.createSpy('after clear spy');
        debugSearchElement.componentInstance.thyClear.subscribe(() => {
            afterClearSpy();
        });
        const prependIcon = searchElement.querySelector('.input-prepend');
        dispatchMouseEvent(prependIcon, 'click');
        fixture.detectChanges();
        expect(afterClearSpy).not.toHaveBeenCalled();
    }));

    it('thySize', () => {
        fixture.detectChanges();
        expect(debugSearchElement.nativeElement.children[1].classList.contains('form-control-sm')).toBe(true);
        basicTestComponent.thySize = 'lg';
        fixture.detectChanges();
        expect(debugSearchElement.nativeElement.children[1].classList.contains('form-control-lg')).toBe(true);
    });

    it('should call blur methods when blur', fakeAsync(() => {
        fixture.detectChanges();
        const touchSpy = spyOn<any>(fixture.componentInstance.inputSearchComponent(), 'onTouchedFn');
        const trigger = fixture.debugElement.query(By.css('.input-search-control')).nativeElement;
        dispatchFakeEvent(trigger, 'blur');
        fixture.detectChanges();
        expect(touchSpy).toHaveBeenCalled();
    }));

    it('should be focused when focus', fakeAsync(() => {
        fixture.detectChanges();
        dispatchFakeEvent(searchElement, 'focus');
        fixture.detectChanges();
        expect(fixture.componentInstance.inputSearchComponent().focused()).toBe(true);
    }));

    it('should call blur and call __onBlurValidation when input blur', fakeAsync(() => {
        fixture.detectChanges();

        const onBlurValidationSpy = spyOn(
            fixture.componentInstance.inputSearchComponent() as unknown as { __onBlurValidation: Function },
            '__onBlurValidation'
        );

        dispatchFakeEvent(fixture.componentInstance.inputSearchComponent().inputElement().nativeElement, 'focus');

        dispatchFakeEvent(fixture.componentInstance.inputSearchComponent().inputElement().nativeElement, 'blur');
        fixture.detectChanges();
        expect(onBlurValidationSpy).toHaveBeenCalledTimes(1);
    }));

    it('should call blur and not call __onBlurValidation when input-search blur and auto focus input', fakeAsync(() => {
        fixture.componentInstance.searchFocus = false;
        fixture.detectChanges();

        const onBlurValidationSpy = spyOn(
            fixture.componentInstance.inputSearchComponent() as unknown as { __onBlurValidation: Function },
            '__onBlurValidation'
        );

        const inputAutoFocusSpy = spyOn(
            fixture.componentInstance.inputSearchComponent().inputElement().nativeElement,
            'focus'
        ).and.callThrough();

        const inputSearchTrigger = fixture.debugElement.query(By.css('.thy-input-search')).nativeElement;
        dispatchFakeEvent(inputSearchTrigger, 'focus');
        fixture.detectChanges();
        expect(inputAutoFocusSpy).toHaveBeenCalled();

        const inputTrigger = fixture.debugElement.query(By.css('.input-search-control')).nativeElement;
        dispatchFakeEvent(inputTrigger, 'focus');
        expect(onBlurValidationSpy).not.toHaveBeenCalled();
    }));
});

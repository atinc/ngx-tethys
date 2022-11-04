import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyInputSearchComponent, ThyInputSearchIconPosition } from '../input-search.component';
import { ThyInputDirective } from './../input.directive';
import { ThyInputModule } from './../module';
import { dispatchMouseEvent, dispatchEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-input-search-basic-test',
    template: `
        <thy-input-search
            name="search"
            placeholder="Please type"
            [disabled]="disabled"
            [thyTheme]="thyTheme"
            [thySearchFocus]="true"
            [(ngModel)]="searchText"
            (ngModelChange)="modelChange($event)"
            (thyClear)="onClear()"
            [thySize]="thySize"
            [thyIconPosition]="iconPosition"
        ></thy-input-search>
    `
})
class TestInputSearchBasicComponent {
    searchText = '';
    thySize = 'sm';
    thyTheme = ``;
    disabled = false;
    iconPosition: ThyInputSearchIconPosition;
    onClear() {}

    modelChange($event: string) {}
}

@NgModule({
    imports: [ThyInputModule, FormsModule],
    declarations: [TestInputSearchBasicComponent],
    exports: []
})
export class InputSearchTestModule {}

describe('input search', () => {
    let fixture: ComponentFixture<TestInputSearchBasicComponent>;
    let basicTestComponent: TestInputSearchBasicComponent;
    let debugInputElement: DebugElement;
    let debugSearchElement: DebugElement;
    let searchElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyInputModule, FormsModule],
            declarations: [TestInputSearchBasicComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestInputSearchBasicComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugInputElement = fixture.debugElement.query(By.directive(ThyInputDirective));
        debugSearchElement = fixture.debugElement.query(By.directive(ThyInputSearchComponent));
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

    fit('should highlight border when focus', fakeAsync(() => {
        fixture.detectChanges();
        expect(searchElement.classList.contains('form-control-active')).toBe(true);
    }));

    it('disabled and dont support clear when disabled', fakeAsync(() => {
        basicTestComponent.disabled = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges;
        expect(debugSearchElement.componentInstance.disabled).toBe(true);

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
});

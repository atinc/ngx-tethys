import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../../testing';
import { A } from '../../util/keycodes';
import { ThyInputSearchComponent } from '../input-search.component';
import { ThyInputDirective } from '../input.directive';
import { ThyInputModule } from '../module';

@Component({
    selector: 'test-bed',
    template: `
        <thy-input-search
            name="search"
            placeholder="请输入"
            [thyTheme]="thyTheme"
            [thySearchFocus]="true"
            (clear)="onClear()"
            [thySize]="thySize"
        ></thy-input-search>
    `
})
class TestBedComponent {
    thySize = 'sm';
    thyTheme = ``;
    checkClear;
    onClear() {
        this.checkClear = true;
    }
}

@NgModule({
    imports: [ThyInputModule],
    declarations: [TestBedComponent],
    exports: []
})
export class InputSearchTestModule {}

describe('input search', () => {
    let fixture: ComponentFixture<TestBedComponent>;
    let basicTestComponent: TestBedComponent;
    let debugElement: DebugElement;
    let debugContainerElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [InputSearchTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBedComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyInputDirective));
        debugContainerElement = fixture.debugElement.query(By.directive(ThyInputSearchComponent));
    });

    it('placeholder', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.placeholder).toBe('请输入');
    });

    it('thyTheme', () => {
        expect(debugContainerElement.nativeElement.classList.contains('input-search-ellipse')).toBe(false);
        basicTestComponent.thyTheme = 'ellipse';
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.classList.contains('input-search-ellipse')).toBe(true);
    });

    it('clear EventEmitter', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.placeholder).toBe('请输入');
    });

    it('thySize', () => {
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.children[1].classList.contains('form-control-sm')).toBe(true);
        basicTestComponent.thySize = 'lg';
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.children[1].classList.contains('form-control-lg')).toBe(true);
    });

    it('search with space', fakeAsync(() => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        debugContainerElement.nativeElement.querySelector('input').value = '  cc';
        const inputElement = debugContainerElement.nativeElement.querySelector('input');
        dispatchKeyboardEvent(inputElement, 'input', A);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(inputElement.value).toBe('cc');
    }));
});

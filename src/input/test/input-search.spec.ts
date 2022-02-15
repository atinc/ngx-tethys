import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyInputSearchComponent } from '../input-search.component';
import { ThyInputDirective } from './../input.directive';
import { ThyInputModule } from './../module';

@Component({
    selector: 'test-bed',
    template: `
        <thy-input-search
            name="search"
            placeholder="请输入"
            [disabled]="disabled"
            [thyTheme]="thyTheme"
            [thySearchFocus]="true"
            [(ngModel)]="searchText"
            (clear)="onClear()"
            [thySize]="thySize"
        ></thy-input-search>
    `
})
class TestBedComponent {
    searchText = '';
    thySize = 'sm';
    thyTheme = ``;
    disabled = false;

    onClear() {}
}

@NgModule({
    imports: [ThyInputModule, FormsModule],
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
        basicTestComponent.thyTheme = 'default';
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.classList.contains('input-search-ellipse')).toBe(false);

        basicTestComponent.thyTheme = 'ellipse';
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.classList.contains('input-search-ellipse')).toBe(true);
    });

    it('clear EventEmitter', fakeAsync(() => {
        basicTestComponent.searchText = '花花';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const closeIcon = debugContainerElement.nativeElement.querySelector('.input-suffix-icon');
        expect(closeIcon).toBeTruthy();

        const afterClearSpy = jasmine.createSpy('after clear spy');
        debugContainerElement.componentInstance.clear.subscribe(() => {
            afterClearSpy();
        });

        closeIcon.click();
        fixture.detectChanges();
        expect(afterClearSpy).toHaveBeenCalled();
    }));

    it('disabled and dont support clear when disabled', fakeAsync(() => {
        basicTestComponent.disabled = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges;
        expect(debugContainerElement.componentInstance.disabled).toBe(true);

        basicTestComponent.searchText = '花花';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const afterClearSpy = jasmine.createSpy('after clear spy');
        debugContainerElement.componentInstance.clear.subscribe(() => {
            afterClearSpy();
        });

        debugContainerElement.nativeElement.querySelector('.input-suffix-icon').click();
        fixture.detectChanges();
        expect(afterClearSpy).not.toHaveBeenCalled();
    }));

    it('thySize', () => {
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.children[1].classList.contains('form-control-sm')).toBe(true);
        basicTestComponent.thySize = 'lg';
        fixture.detectChanges();
        expect(debugContainerElement.nativeElement.children[1].classList.contains('form-control-lg')).toBe(true);
    });
});

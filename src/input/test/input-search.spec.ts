import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
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
            [thyTheme]="thyTheme"
            [thySearchFocus]="true"
            (clear)="onClear()"
        ></thy-input-search>
    `
})
class TestBedComponent {
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
});

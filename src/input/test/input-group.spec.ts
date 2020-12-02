import { TranslateService } from '@ngx-translate/core';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyInputGroupComponent } from '../input-group.component';
import { ThyInputModule } from './../module';
import { ThyTranslate } from '../../core';

@Component({
    selector: 'test-bed',
    template: `
        <thy-input-group [thySize]="thySize" thyPrependText="前缀" thyAppendText="后缀">
            <input thyInput placeholder="请输入" />
            <ng-template #prepend>前置模版</ng-template>
            <ng-template #append>后置模版</ng-template>
        </thy-input-group>

        <thy-input-group class="group2" thyPrependTextTranslateKey="donut" thyAppendTextTranslateKey="donut2">
            <input thyInput />
        </thy-input-group>
    `
})
class TestBedComponent {
    value;
    thySize = '';
}

@NgModule({
    imports: [ThyInputModule],
    declarations: [TestBedComponent],
    exports: []
})
export class InputGroupTestModule {}

class ThyTranslateSimulate {
    instant(value) {
        if (value === 'donut') {
            return '面包圈';
        } else if (value === 'donut2') {
            return '甜甜圈';
        }
    }
}

describe('input group', () => {
    let fixture: ComponentFixture<TestBedComponent>;
    let basicTestComponent: TestBedComponent;
    let debugElement: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [InputGroupTestModule],
            providers: [
                {
                    provide: ThyTranslate,
                    useClass: ThyTranslateSimulate
                }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestBedComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyInputGroupComponent));
    });

    it('thyPrependText', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.innerText.includes('前缀')).toBe(true);
    });

    it('thyAppendText', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.innerText.includes('后缀')).toBe(true);
    });

    it('thyPrependTextTranslateKey', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.group2')).nativeElement.innerText.includes('面包圈')).toBe(true);
    });

    it('thyAppendTextTranslateKey', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.group2')).nativeElement.innerText.includes('甜甜圈')).toBe(true);
    });

    it('thySize', () => {
        basicTestComponent.thySize = 'sm';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('input-group-sm')).toBe(true);

        basicTestComponent.thySize = 'lg';
        fixture.detectChanges();
        expect(debugElement.nativeElement.classList.contains('input-group-lg')).toBe(true);
    });

    it('content template prepend', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.innerText.includes('前置模版')).toBe(true);
    });

    it('content template append', () => {
        fixture.detectChanges();
        expect(debugElement.nativeElement.innerText.includes('后置模版')).toBe(true);
    });
});

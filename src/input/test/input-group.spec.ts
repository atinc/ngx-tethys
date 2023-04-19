import { TranslateService } from '@ngx-translate/core';
import { Component, DebugElement, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyInputGroupComponent } from '../input-group.component';
import { ThyInputModule } from './../module';
import { ThyTranslate } from '../../core';
import { dispatchFakeEvent } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-test-input-group-basic',
    template: `
        <thy-input-group [thySize]="thySize" thyPrependText="Prepped Text" thyAppendText="Append Text">
            <input [disabled]="disabled" thyInput placeholder="Please type" />
            <ng-template #prepend>Prepped Content</ng-template>
            <ng-template #append>Append Content</ng-template>
        </thy-input-group>

        <thy-input-group class="group2" thyPrependTextTranslateKey="donut" thyAppendTextTranslateKey="donut2">
            <input thyInput />
        </thy-input-group>
    `
})
class TestInputGroupBasicComponent {
    value = '';
    thySize = '';
    disabled = false;
}

@Component({
    selector: 'thy-test-input-group-prefix-suffix',
    template: `
        <thy-input-group id="with-prefix" [thySize]="thySize">
            <input thyInput placeholder="Please type" />
            <ng-template #prefix>Prefix Content</ng-template>
        </thy-input-group>

        <thy-input-group id="with-suffix" [thySize]="thySize">
            <input thyInput [disabled]="disabled" placeholder="Please type" />
            <ng-template #suffix>Suffix Content</ng-template>
        </thy-input-group>
    `
})
class TestInputGroupPrefixAndSuffixComponent {
    value = '';
    thySize = '';
    disabled = false;
}

@NgModule({
    imports: [ThyInputModule],
    declarations: [TestInputGroupBasicComponent, TestInputGroupPrefixAndSuffixComponent],
    exports: []
})
export class InputGroupTestModule {}

class ThyTranslateSimulate {
    instant(value: string) {
        if (value === 'donut') {
            return '面包圈';
        } else if (value === 'donut2') {
            return '甜甜圈';
        }
    }
}

describe('input group', () => {
    describe('basic', () => {
        let fixture: ComponentFixture<TestInputGroupBasicComponent>;
        let basicTestComponent: TestInputGroupBasicComponent;
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
            fixture = TestBed.createComponent(TestInputGroupBasicComponent);
            basicTestComponent = fixture.debugElement.componentInstance;
            debugElement = fixture.debugElement.query(By.directive(ThyInputGroupComponent));
        });

        it('thyPrependText', () => {
            fixture.detectChanges();
            expect(debugElement.nativeElement.innerText.includes('Prepped Text')).toBe(true);
        });

        it('thyAppendText', () => {
            fixture.detectChanges();
            expect(debugElement.nativeElement.innerText.includes('Append Text')).toBe(true);
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

            basicTestComponent.thySize = 'md';
            fixture.detectChanges();
            expect(debugElement.nativeElement.classList.contains('input-group-md')).toBe(true);
        });

        it('content template prepend', () => {
            fixture.detectChanges();
            expect(debugElement.nativeElement.innerText.includes('Prepped Content')).toBe(true);
        });

        it('content template append', () => {
            fixture.detectChanges();
            expect(debugElement.nativeElement.innerText.includes('Append Content')).toBe(true);
        });

        it('group should disabled when thyInput is disabled', fakeAsync(() => {
            fixture.detectChanges();
            basicTestComponent.disabled = true;
            fixture.detectChanges();
            tick();
            expect(Array.from(debugElement.nativeElement.classList).includes('disabled')).toBe(true);
        }));
    });

    describe('prefix-suffix', () => {
        let fixture: ComponentFixture<TestInputGroupPrefixAndSuffixComponent>;
        let testComponent: TestInputGroupPrefixAndSuffixComponent;
        let debugElement: DebugElement;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [InputGroupTestModule]
            });

            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInputGroupPrefixAndSuffixComponent);
            testComponent = fixture.debugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create with prefix', () => {
            debugElement = fixture.debugElement.query(By.css('#with-prefix'));
            expect(debugElement).toBeTruthy();
            expect(debugElement.nativeElement).toBeTruthy();
            const groupElement: HTMLElement = debugElement.nativeElement;

            expect(groupElement.classList.contains('thy-input-group')).toBeTruthy();
            expect(groupElement.classList.contains('form-control')).toBeTruthy();
            expect(groupElement.classList.contains('thy-input-group-with-prefix')).toBeTruthy();

            expect(groupElement.children[0].classList.contains('input-group-prefix')).toBeTruthy();
            expect(groupElement.children[1].classList.contains('form-control')).toBeTruthy();
        });

        it('should create with suffix', () => {
            debugElement = fixture.debugElement.query(By.css('#with-suffix'));
            expect(debugElement).toBeTruthy();
            expect(debugElement.nativeElement).toBeTruthy();
            const groupElement: HTMLElement = debugElement.nativeElement;

            expect(groupElement.classList.contains('thy-input-group')).toBeTruthy();
            expect(groupElement.classList.contains('form-control')).toBeTruthy();
            expect(groupElement.classList.contains('thy-input-group-with-suffix')).toBeTruthy();

            expect(groupElement.children[1].classList.contains('input-group-suffix')).toBeTruthy();
            expect(groupElement.children[0].classList.contains('form-control')).toBeTruthy();
        });

        describe(`should focused style correctly`, () => {
            beforeEach(() => {
                debugElement = fixture.debugElement.query(By.css('#with-suffix'));
                fixture.detectChanges();
            });

            it(`should has class form-control-active when input-group focused`, () => {
                const inputGroupElement = debugElement.nativeElement;
                dispatchFakeEvent(inputGroupElement, 'focus');
                fixture.detectChanges();
                expect(debugElement.nativeElement.classList.contains('form-control-active')).toBe(true);
            });

            it(`should has class form-control-active when inner input focused`, () => {
                const inputElement = debugElement.query(By.css('input')).nativeElement;
                dispatchFakeEvent(inputElement, 'focus');
                fixture.detectChanges();
                expect(debugElement.nativeElement.classList.contains('form-control-active')).toBe(true);
            });
        });
    });
});

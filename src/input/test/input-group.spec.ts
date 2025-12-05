import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyInputGroup, ThyInputDirective, ThyInputCount } from 'ngx-tethys/input';
import { ThyTranslate } from 'ngx-tethys/core';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

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
    `,
    imports: [ThyInputGroup, ThyInputDirective]
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
    `,
    imports: [ThyInputGroup, ThyInputDirective]
})
class TestInputGroupPrefixAndSuffixComponent {
    value = '';
    thySize = '';
    disabled = false;
}

@Component({
    selector: 'thy-test-input-group-with-textarea-suffix',
    template: `
        <thy-input-group id="with-textarea-prefix" style="width:200px">
            <textarea
                id="textarea"
                thyInput
                [(ngModel)]="textareaValue"
                name="hobby"
                minRows="1"
                rows="3"
                placeholder="输入爱好"
                maxlength="100"></textarea>
            <ng-template #suffix>
                <thy-input-count></thy-input-count>
            </ng-template>
        </thy-input-group>
    `,
    imports: [ThyInputGroup, ThyInputDirective, FormsModule, ThyInputCount]
})
class TestInputGroupTextareaSuffixComponent {
    textareaValue = '';
}

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
        let fixture!: ComponentFixture<TestInputGroupBasicComponent>;
        let basicTestComponent!: TestInputGroupBasicComponent;
        let debugElement!: DebugElement;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                providers: [
                    provideHttpClient(),
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
            debugElement = fixture.debugElement.query(By.directive(ThyInputGroup));
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

        it('group should disabled when thyInput is disabled', (done: () => void) => {
            fixture.detectChanges();
            basicTestComponent.disabled = true;
            fixture.detectChanges();
            setTimeout(() => {
                fixture.detectChanges();
                expect(Array.from(debugElement.nativeElement.classList).includes('disabled')).toBe(true);
                done();
            }, 200);
        });
    });

    describe('prefix-suffix', () => {
        let fixture!: ComponentFixture<TestInputGroupPrefixAndSuffixComponent>;
        let debugElement!: DebugElement;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                providers: [provideHttpClient()]
            });

            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInputGroupPrefixAndSuffixComponent);
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

    describe('with-textarea-suffix', () => {
        let fixture!: ComponentFixture<TestInputGroupTextareaSuffixComponent>;
        let debugElement!: DebugElement;
        let inputGroupElement!: HTMLElement;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                providers: [provideHttpClient()]
            });
            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestInputGroupTextareaSuffixComponent);
            fixture.detectChanges();
            debugElement = fixture.debugElement.query(By.css('#with-textarea-prefix'));
            inputGroupElement = debugElement.nativeElement;
        });

        it('should create', () => {
            expect(debugElement).toBeTruthy();
            expect(inputGroupElement).toBeTruthy();
        });

        it('should has correct styles with textarea prefix', () => {
            expect(inputGroupElement.classList.contains('thy-input-group')).toBeTruthy();
            expect(inputGroupElement.classList.contains('form-control')).toBeTruthy();
            expect(inputGroupElement.classList.contains('thy-input-group-with-suffix')).toBeTruthy();
            expect(inputGroupElement.classList.contains('thy-input-group-with-textarea-suffix')).toBeTruthy();
        });
    });
});

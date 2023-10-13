import { TestBed, async, ComponentFixture, fakeAsync, flush, tick } from '@angular/core/testing';
import { ThySelectCommonModule } from '../module';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { ThyFormModule } from '../../../form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThyIconModule } from '../../../icon/icon.module';
import { ThySelectControlComponent, SelectControlSize } from './select-control.component';
import { SelectOptionBase } from '../../option';

@Component({
    selector: 'thy-basic-select-control',
    template: `
        <thy-select-control
            [thyPlaceholder]="placeholder"
            [thyDisabled]="thyDisabled"
            [thyShowSearch]="thyShowSearch"
            [thySelectedOptions]="selectedOptions"
            [thyAllowClear]="thyAllowClear"
            [thySize]="thySize"
            [thyIsMultiple]="thyIsMultiple"
            [thyPanelOpened]="thyPanelOpened"
            [thyBorderless]="borderless"
            [thyMaxTagCount]="thyMaxTagCount"></thy-select-control>
    `
})
class BasicSelectControlComponent {
    placeholder = '选择你的值';

    thyDisabled = false;

    thyShowSearch = false;

    selectedOptions = null;

    thyAllowClear = true;

    thySize = null;

    thyIsMultiple = false;

    thyPanelOpened = false;

    thyMaxTagCount = 0;

    borderless = false;

    @ViewChild(ThySelectControlComponent, { static: true })
    selectControlComponent: ThySelectControlComponent;
}

describe('ThySelectControl', () => {
    function configureThySelectControlTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, ReactiveFormsModule, FormsModule, ThyIconModule, ThySelectCommonModule],
            declarations: declarations
        }).compileComponents();
    }
    describe('core', () => {
        const testBaseOption: SelectOptionBase = { thyLabelText: '', thyRawValue: {}, thyValue: '' };

        beforeEach(async(() => {
            configureThySelectControlTestingModule([BasicSelectControlComponent]);
        }));

        describe('basic class', () => {
            let fixture: ComponentFixture<BasicSelectControlComponent>;
            let selectElement: HTMLElement;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(BasicSelectControlComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
            }));

            it('should get correct class', () => {
                expect(selectElement).toBeTruthy();
                expect(selectElement.classList.contains('select-control')).toBeTruthy();
            });

            it('should get disable class when set thyDisabled', () => {
                fixture.componentInstance.thyDisabled = true;
                fixture.detectChanges();
                expect(selectElement.classList.contains('disabled')).toBeTruthy();
            });

            it('should get search class when set showSearch', () => {
                fixture.componentInstance.thyShowSearch = true;
                fixture.detectChanges();
                expect(selectElement.classList.contains('select-control-show-search')).toBeTruthy();
            });

            it('should get size class when set thySize', () => {
                const size: SelectControlSize = 'md';
                expect(selectElement.classList.contains(`form-control-${size}`)).not.toBeTruthy();
                fixture.componentInstance.thySize = size;
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
                expect(selectElement.classList.contains(`form-control-${size}`)).toBeTruthy();
            });

            it('should has borderless class name', fakeAsync(() => {
                fixture.componentInstance.borderless = true;
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                expect(selectElement.classList.contains('select-control-borderless')).toBeTruthy();
            }));
        });

        describe('placeholder', () => {
            let fixture: ComponentFixture<BasicSelectControlComponent>;
            let selectElement: HTMLElement;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(BasicSelectControlComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
            }));

            it('should display custom placeholder value', () => {
                const textPlaceholderElement: HTMLElement = fixture.debugElement.query(By.css('.text-placeholder')).nativeElement;
                expect(textPlaceholderElement.innerText).toEqual(fixture.componentInstance.placeholder);
                expect(fixture.componentInstance.selectControlComponent.placeholderStyle.display).toEqual('block');
            });

            it('should hidden placeholder element when assign thySelectedOptions', () => {
                fixture.componentInstance.selectedOptions = [testBaseOption];
                fixture.detectChanges();
                expect(fixture.componentInstance.selectControlComponent.placeholderStyle.display).toEqual('none');
            });
        });

        describe('allowClear', () => {
            let fixture: ComponentFixture<BasicSelectControlComponent>;
            let selectElement: HTMLElement;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(BasicSelectControlComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
            }));

            it('should render clear element when assign thyAllowClear to true', () => {
                let clearElement = fixture.debugElement.query(By.css('.select-control-clear'));
                expect(clearElement).not.toBeTruthy();

                fixture.componentInstance.thyAllowClear = true;
                fixture.componentInstance.selectedOptions = [testBaseOption];
                fixture.detectChanges();

                clearElement = fixture.debugElement.query(By.css('.select-control-clear')).nativeElement;
                expect(clearElement).toBeTruthy();
            });
        });

        describe('selected options', () => {
            let fixture: ComponentFixture<BasicSelectControlComponent>;
            let selectElement: HTMLElement;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(BasicSelectControlComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
            }));

            it('should clear input value when selected change', fakeAsync(() => {
                fixture.componentInstance.thyShowSearch = true;
                fixture.componentInstance.thyPanelOpened = true;
                fixture.detectChanges();
                flush();
                fixture.detectChanges();
                const typeValue = 'test';
                fixture.componentInstance.selectControlComponent.inputValue = typeValue;
                fixture.detectChanges();

                const selectedOption1: SelectOptionBase = { thyLabelText: '', thyRawValue: {}, thyValue: '1' };
                fixture.componentInstance.selectedOptions = selectedOption1;
                fixture.detectChanges();
                flush();
                expect(fixture.componentInstance.selectControlComponent.inputValue).toEqual('');
            }));

            it('should not clear input value when selected reset', fakeAsync(() => {
                fixture.componentInstance.thyShowSearch = true;
                fixture.componentInstance.thyPanelOpened = true;
                fixture.detectChanges();
                flush();
                fixture.detectChanges();

                const selectedOption1: SelectOptionBase = { thyLabelText: '', thyRawValue: {}, thyValue: '1' };
                fixture.componentInstance.selectedOptions = selectedOption1;
                fixture.detectChanges();
                flush();
                const typeValue = 'test';
                fixture.componentInstance.selectControlComponent.inputValue = typeValue;
                fixture.detectChanges();
                fixture.componentInstance.selectedOptions = { ...selectedOption1 };
                fixture.detectChanges();
                flush();
                expect(fixture.componentInstance.selectControlComponent.inputValue).toEqual(typeValue);
            }));

            it('should just show max tag', fakeAsync(() => {
                fixture.componentInstance.thyIsMultiple = true;
                let selectedOptions = [
                    { thyLabelText: '1', thyRawValue: {}, thyValue: '1' },
                    { thyLabelText: '2', thyRawValue: {}, thyValue: '2' },
                    { thyLabelText: '3', thyRawValue: {}, thyValue: '3' }
                ];
                fixture.componentInstance.selectedOptions = selectedOptions;
                fixture.detectChanges();
                flush();
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
                let lis = selectElement.querySelectorAll('.choice');
                expect(lis.length).toEqual(3);
                let maxTagCountChoic = selectElement.querySelector('.max-tag-count-choice');
                expect(maxTagCountChoic).toBeNull();

                fixture.componentInstance.selectedOptions = [
                    ...selectedOptions,
                    { thyLabelText: '4', thyRawValue: {}, thyValue: '4' },
                    { thyLabelText: '5', thyRawValue: {}, thyValue: '5' }
                ];
                fixture.componentInstance.thyMaxTagCount = 3;
                fixture.detectChanges();
                flush();
                fixture.detectChanges();

                selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
                lis = selectElement.querySelectorAll('.choice');
                expect(lis.length).toEqual(3);
                maxTagCountChoic = selectElement.querySelector('.max-tag-count-choice');
                expect(maxTagCountChoic).toBeTruthy();
            }));
        });
    });
});

import {
    TestBed,
    async,
    ComponentFixture,
    fakeAsync,
    tick,
    inject,
    flush,
    discardPeriodicTasks
} from '@angular/core/testing';
import { ThySelectCommonModule } from '../module';
import { injectDefaultSvgIconSet } from '../../testing/thy-icon';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { ThyFormModule } from '../../../form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateHostClassService } from '../../../shared/update-host-class.service';
import { ThyIconModule } from '../../../icon/icon.module';
import { ThySelectControlComponent } from './select-control.component';
import { SelectOptionBase } from '../select-option/select-option-base';

@Component({
    selector: 'basic-select-control',
    template: `
        <thy-select-control
            [thyPlaceholder]="placeholder"
            [thyDisabled]="thyDisabled"
            [thyShowSearch]="thyShowSearch"
            [thySelectedOptions]="selectedOptions"
        ></thy-select-control>
    `
})
class BasicSelectControlComponent {
    placeholder = '选择你的值';

    thyDisabled = false;

    thyShowSearch = false;

    selectedOptions = [];

    @ViewChild(ThySelectControlComponent)
    selectControlComponent: ThySelectControlComponent;
}

describe('ThySelectControl', () => {
    function configureThySelectControlTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, ReactiveFormsModule, FormsModule, ThyIconModule, ThySelectCommonModule],
            declarations: declarations,
            providers: [UpdateHostClassService]
        }).compileComponents();

        // injectDefaultSvgIconSet();
    }
    describe('core', () => {
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
                const textPlaceholderElement: HTMLElement = fixture.debugElement.query(By.css('.text-placeholder'))
                    .nativeElement;
                expect(textPlaceholderElement.innerText).toEqual(fixture.componentInstance.placeholder);
                expect(fixture.componentInstance.selectControlComponent.placeholderStyle.display).toEqual('block');
            });

            it('should hidden placeholder element when assign thySelectedOptions', () => {
                const testBaseOption: SelectOptionBase = { thyLabelText: '', thyRawValue: {}, thyValue: '' };
                fixture.componentInstance.selectedOptions = [testBaseOption];
                fixture.detectChanges();
                expect(fixture.componentInstance.selectControlComponent.placeholderStyle.display).toEqual('none');
            });
        });
    });
});

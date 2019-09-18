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
import { Component } from '@angular/core';
import { ThyFormModule } from '../../../form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateHostClassService } from '../../../shared/update-host-class.service';
import { ThyIconModule } from '../../../icon/icon.module';

@Component({
    selector: 'basic-select-control',
    template: `
        <thy-select-control
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

        // describe('disabled', () => {
        //     let fixture: ComponentFixture<BasicSelectControlComponent>;
        //     let selectElement: HTMLElement;

        //     beforeEach(async(() => {
        //         fixture = TestBed.createComponent(BasicSelectControlComponent);
        //         fixture.detectChanges();
        //         selectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
        //     }));

        //     it('should disabled ', () => {
        //         expect(selectElement).toBeTruthy();
        //         expect(selectElement.classList.contains('select-control')).toBeTruthy();
        //     });
        // });
    });
});

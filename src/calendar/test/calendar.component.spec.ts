import { CommonModule, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyDirectiveModule } from '../../directive';
import { ThyIconModule } from '../../icon';
import { ThyCalendarHeaderComponent } from '../calendar-header.component';
import { LibPackerModule } from '../../date-picker/lib/lib-packer.module';
import { ThySelectModule } from '../../select/module';
import { ThyRadioModule } from '../../radio/module';
import { ThyButtonModule } from '../../button/button.module';
import { ThyDateRangeModule } from '../../date-range/module';
import { TinyDate } from '../../util';

registerLocaleData(zh);

describe('Calendar Header', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    FormsModule,
                    ThyDirectiveModule,
                    ThyIconModule,
                    LibPackerModule,
                    ThySelectModule,
                    ThyRadioModule,
                    ThyButtonModule,
                    ThyDateRangeModule
                ],
                declarations: [
                    ThyCalendarHeaderComponent,
                    ThyTestCalendarHeaderModeComponent,
                    ThyTestCalendarHeaderFullscreenComponent,
                    ThyTestCalendarHeaderCurrentDateComponent,
                    ThyTestCalendarHeaderChangesComponent
                ]
            }).compileComponents();
        })
    );

    describe('mode', () => {
        let fixture: ComponentFixture<ThyTestCalendarHeaderModeComponent>;
        let component: ThyTestCalendarHeaderModeComponent;

        beforeEach(
            waitForAsync(() => {
                fixture = TestBed.createComponent(ThyTestCalendarHeaderModeComponent);
                component = fixture.componentInstance;
            })
        );

        // it('should be month by default', () => {
        //     fixture.detectChanges();

        //     const modeNgModel = fixture.debugElement
        //         .queryAll(By.directive(ThyCalendarHeaderComponent))[0]
        //         .injector.get(NgModel);
        //     expect(modeNgModel.model).toBe('month');
        // });

        // it('should update mode passed in', () => {
        //     component.mode = 'year';

        //     fixture.detectChanges();

        //     const modeNgModel = fixture.debugElement
        //         .queryAll(By.directive(ThyCalendarHeaderComponent))[1]
        //         .query(By.directive(RadioGroup))
        //         .injector.get(NgModel);
        //     expect(modeNgModel.model).toBe('year');
        // });

        // it('should emit change event for mode selection', () => {
        //     const modeNgModel = fixture.debugElement
        //         .queryAll(By.directive(ThyCalendarHeaderComponent))[1]
        //         .query(By.directive(RadioGroup))
        //         .injector.get(NgModel);
        //     modeNgModel.viewToModelUpdate('year');

        //     fixture.detectChanges();

        //     expect(component.mode).toBe('year');
        // });
    });

    // describe('fullscreen', () => {
    //     let fixture: ComponentFixture<ThyTestCalendarHeaderFullscreenComponent>;
    //     let component: ThyTestCalendarHeaderFullscreenComponent;

    //     beforeEach(
    //         waitForAsync(() => {
    //             fixture = TestBed.createComponent(ThyTestCalendarHeaderFullscreenComponent);
    //             component = fixture.componentInstance;
    //         })
    //     );

    //     it('should be true by default', () => {
    //         fixture.detectChanges();

    //         const header = fixture.debugElement.queryAll(By.directive(ThyCalendarHeaderComponent))[0];
    //         const [yearSelect, monthSelect] = header.queryAll(By.directive(Select)).map(x => x.injector.get(Select));
    //         const modeRadioGroup = header.query(By.directive(RadioGroup)).injector.get(RadioGroup);

    //         expect(yearSelect.thySize).not.toBe('small');
    //         expect(monthSelect.thySize).not.toBe('small');
    //         expect(modeRadioGroup.thySize).not.toBe('small');
    //     });

    //     it('should use small size when not in fullscreen', () => {
    //         component.fullscreen = false;

    //         fixture.detectChanges();

    //         const header = fixture.debugElement.queryAll(By.directive(ThyCalendarHeaderComponent))[1];
    //         const [yearSelect, monthSelect] = header.queryAll(By.directive(Select)).map(x => x.injector.get(Select));
    //         const modeRadioGroup = header.query(By.directive(RadioGroup)).injector.get(RadioGroup);

    //         expect(yearSelect.thySize).toBe('small');
    //         expect(monthSelect.thySize).toBe('small');
    //         expect(modeRadioGroup.thySize).toBe('small');
    //     });
    // });

    describe('currentDate', () => {
        let fixture: ComponentFixture<ThyTestCalendarHeaderCurrentDateComponent>;

        beforeEach(
            waitForAsync(() => {
                fixture = TestBed.createComponent(ThyTestCalendarHeaderCurrentDateComponent);
            })
        );

        it('default', () => {
            const now = new Date();
        });

        // it('should be now by default', () => {
        //     const now = new Date();

        //     fixture.detectChanges();

        //     const header = fixture.debugElement.queryAll(By.directive(ThyCalendarHeaderComponent))[0];
        //     const [yearModel, monthModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

        //     expect(yearModel.model).toBe(now.getFullYear());
        //     expect(monthModel.model).toBe(now.getMonth());
        // });

        // it('should update model binding to passed date', () => {
        //     fixture.detectChanges();

        //     const header = fixture.debugElement.queryAll(By.directive(ThyCalendarHeaderComponent))[1];
        //     const [yearModel, monthModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

        //     expect(yearModel.model).toBe(2001);
        //     expect(monthModel.model).toBe(1);
        //     const headerComponent = header.injector.get(ThyCalendarHeaderComponent);
        //     expect(headerComponent.years[0].value).toBe(1991);
        // });
    });

    describe('changes', () => {
        let fixture: ComponentFixture<ThyTestCalendarHeaderChangesComponent>;
        let component: ThyTestCalendarHeaderChangesComponent;

        beforeEach(
            waitForAsync(() => {
                fixture = TestBed.createComponent(ThyTestCalendarHeaderChangesComponent);
                component = fixture.componentInstance;
            })
        );

        it('should emit yearChange when year changed', () => {
            const header = fixture.debugElement.queryAll(By.directive(ThyCalendarHeaderComponent))[0];
            const [yearModel] = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel));

            yearModel.viewToModelUpdate(2010);

            fixture.detectChanges();

            expect(component.year).toBe(2010);
        });

        it('should emit monthChange when month changed', () => {
            fixture.detectChanges();
            const header = fixture.debugElement.queryAll(By.directive(ThyCalendarHeaderComponent))[0];
            const monthModel = header.queryAll(By.directive(Select)).map(x => x.injector.get(NgModel))[1];

            monthModel.viewToModelUpdate(2);

            fixture.detectChanges();

            expect(component.month).toBe(2);
        });
        it('should update years when change year', () => {
            const header = fixture.debugElement.queryAll(By.directive(ThyCalendarHeaderComponent))[0];
            const headerComponent = header.injector.get(ThyCalendarHeaderComponent);
            headerComponent.updateYear(2010);
            expect(headerComponent.years[0].value).toBe(2000);
        });
    });
});

@Component({
    template: `
        <thy-calendar-header></thy-calendar-header>
        <thy-calendar-header [(mode)]="mode"></thy-calendar-header>
    `
})
class ThyTestCalendarHeaderModeComponent {
    mode: 'month' | 'year' = 'month';
}

@Component({
    template: `
        <thy-calendar-header></thy-calendar-header>
        <thy-calendar-header [fullscreen]="fullscreen"></thy-calendar-header>
    `
})
class ThyTestCalendarHeaderFullscreenComponent {
    fullscreen = true;
}

@Component({
    template: `
        <thy-calendar-header></thy-calendar-header>
        <thy-calendar-header [activeDate]="activeDate"></thy-calendar-header>
    `
})
class ThyTestCalendarHeaderCurrentDateComponent {
    activeDate = new TinyDate(new Date(2001, 1, 3));
}

@Component({
    template: `
        <thy-calendar-header (yearChange)="year = $event" (monthChange)="month = $event"></thy-calendar-header>
    `
})
class ThyTestCalendarHeaderChangesComponent {
    year: number | null = null;
    month: number | null = null;
}

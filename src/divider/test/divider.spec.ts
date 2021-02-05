import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ThyDividerModule } from '../divider.module';
import { ThyDividerStyle, ThyDividerTextDirection } from '../divider.component';

@Component({
    template: `
        <ng-container [ngSwitch]="useSuite">
            <!-- Suite 1 for test default divider -->
            <thy-divider *ngSwitchCase="1"></thy-divider>

            <!-- Suite 2 for test thyVertical -->
            <thy-divider *ngSwitchCase="2" [thyVertical]="true"></thy-divider>

            <!-- Suite 3 for test thyStyle -->
            <thy-divider *ngSwitchCase="3" [thyStyle]="'dashed'"></thy-divider>

            <!-- Suite 4 for test thyText as text -->
            <thy-divider *ngSwitchCase="4" thyText="With Text"></thy-divider>

            <!-- Suite 5 for test thyText as template -->
            <thy-divider *ngSwitchCase="5" [thyText]="dividerTemplateSelect"></thy-divider>
            <ng-template #dividerTemplateSelect>
                <thy-custom-select [(ngModel)]="dividerSelectModel" thyPlaceHolder="请选择" style="width: 80px;">
                    <thy-option thyValue="or|or" thyLabelText="Or"></thy-option>
                    <thy-option thyValue="and&and" thyLabelText="And"></thy-option>
                </thy-custom-select>
            </ng-template>

            <!-- Suite 6 for test thyTextDirection -->
            <thy-divider *ngSwitchCase="6" thyText="With Text" [thyTextDirection]="directionMode"></thy-divider>

            <!-- Suite 7 for test thyHeavy when thyText as text -->
            <thy-divider *ngSwitchCase="7" thyText="With Text" [thyHeavy]="heavyMode"></thy-divider>
        </ng-container>
    `
})
class ThyTestDividerComponent {
    useSuite: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    dividerSelectModel: ThyDividerStyle = 'solid';

    heavyMode = true;
    directionMode: ThyDividerTextDirection = 'center';

    constructor() {}
}

describe('ThyDividerComponent', () => {
    let fixture: ComponentFixture<ThyTestDividerComponent>;
    let componentInstance: ThyTestDividerComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDividerModule],
            declarations: [ThyTestDividerComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestDividerComponent);
        componentInstance = fixture.debugElement.componentInstance;
    });

    describe('default thy-divider', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 1;
            fixture.detectChanges();
        }));

        it('should show the thy-divider default', () => {
            const dividerContainer = fixture.nativeElement.querySelector('.thy-divider.thy-divider-horizontal.thy-divider-solid');
            expect(dividerContainer).toBeTruthy();
        });
    });

    describe('test thyVertical as true', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 2;
        }));

        it('should exist .thy-divider.thy-divider-vertical', () => {
            fixture.detectChanges();

            const dividerContainer = fixture.nativeElement.querySelector('.thy-divider.thy-divider-vertical');
            expect(dividerContainer).toBeTruthy();
        });
    });

    describe("test thyStyle as 'dashed'", () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 3;
        }));

        it('should exist .thy-divider.thy-divider-dashed', () => {
            fixture.detectChanges();

            const dividerContainer = fixture.nativeElement.querySelector('.thy-divider.thy-divider-dashed');
            expect(dividerContainer).toBeTruthy();
        });
    });

    describe('test thyText as text', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 4;
        }));

        it('should exist .thy-divider-inner-text', () => {
            fixture.detectChanges();

            const innerText = fixture.nativeElement.querySelector('.thy-divider .thy-divider-inner-text');
            expect(innerText).toBeTruthy();
        });
    });

    describe('test thyText as template', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 5;
        }));

        it('should exist .thy-divider-inner-template', () => {
            fixture.detectChanges();

            const innerTemplate = fixture.nativeElement.querySelector('.thy-divider .thy-divider-inner-template');
            expect(innerTemplate).toBeTruthy();
        });
    });

    describe('test thyTextDirection change', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 6;
        }));

        it('should show direction class change', () => {
            fixture.detectChanges();

            const centerContent = fixture.nativeElement.querySelector('.thy-divider.thy-divider-with-content-center');
            expect(centerContent).toBeTruthy();

            componentInstance.directionMode = 'left';
            fixture.detectChanges();
            const leftContent = fixture.nativeElement.querySelector('.thy-divider.thy-divider-with-content-left');
            expect(leftContent).toBeTruthy();

            componentInstance.directionMode = 'right';
            fixture.detectChanges();
            const rightContent = fixture.nativeElement.querySelector('.thy-divider.thy-divider-with-content-right');
            expect(rightContent).toBeTruthy();
        });
    });

    describe('test thyHeavy as true', () => {
        beforeEach(async(() => {
            componentInstance.useSuite = 7;
        }));

        it('should exist .thy-divider-heavy', () => {
            fixture.detectChanges();

            const heavyContainer = fixture.nativeElement.querySelector('.thy-divider.thy-divider-heavy');
            expect(heavyContainer).toBeTruthy();
        });
    });
});

import { FormsModule } from '@angular/forms';
import { ThySelectModule } from 'ngx-tethys/select';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ThyDividerModule } from '../divider.module';
import { ThyDividerStyle, ThyDividerTextDirection } from '../divider.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
    template: `
        <ng-container>
            <thy-divider
                [thyVertical]="isVertical"
                [thyStyle]="styleMode"
                [thyTextDirection]="directionMode"
                [thyText]="textContent || dividerTemplateSelect"
                [thyDeeper]="isDeeper"
                [thyColor]="color"></thy-divider>
            <ng-template #dividerTemplateSelect>
                <thy-select [(ngModel)]="dividerSelectModel" thyPlaceHolder="请选择">
                    <thy-option thyValue="or|or" thyLabelText="Or"></thy-option>
                    <thy-option thyValue="and&and" thyLabelText="And"></thy-option>
                </thy-select>
            </ng-template>
        </ng-container>
    `,
    standalone: false
})
class ThyTestDividerComponent {
    isVertical = false;

    isDeeper = false;

    color = 'default';

    styleMode: ThyDividerStyle = 'solid';

    directionMode: ThyDividerTextDirection = 'center';

    textContent = 'with text';

    dividerSelectModel = 'or|or';

    constructor() {}
}

describe('ThyDividerComponent', () => {
    let fixture: ComponentFixture<ThyTestDividerComponent>;
    let componentInstance: ThyTestDividerComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDividerModule, FormsModule, ThySelectModule],
            declarations: [ThyTestDividerComponent],
            providers: [provideHttpClient()]
        });
        TestBed.compileComponents().then(r => r);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestDividerComponent);
        componentInstance = fixture.debugElement.componentInstance;
    });

    describe('default thy-divider', () => {
        it('should show the thy-divider default', () => {
            fixture.detectChanges();

            const dividerContainer = fixture.nativeElement.querySelector('.thy-divider.thy-divider-horizontal.thy-divider-solid');
            expect(dividerContainer).toBeTruthy();
        });
    });

    describe('test thyVertical as true', () => {
        it('should exist .thy-divider.thy-divider-vertical', () => {
            componentInstance.isVertical = true;
            fixture.detectChanges();

            const dividerContainer = fixture.nativeElement.querySelector('.thy-divider.thy-divider-vertical');
            expect(dividerContainer).toBeTruthy();
        });
    });

    describe("test thyStyle as 'dashed'", () => {
        it('should exist .thy-divider.thy-divider-dashed', () => {
            componentInstance.styleMode = 'dashed';
            fixture.detectChanges();

            const dividerContainer = fixture.nativeElement.querySelector('.thy-divider.thy-divider-dashed');
            expect(dividerContainer).toBeTruthy();
        });
    });

    describe('test thyText as text', () => {
        it('should exist .thy-divider-inner-text', () => {
            fixture.detectChanges();

            const innerText = fixture.nativeElement.querySelector('.thy-divider .thy-divider-inner-text');
            expect(innerText).toBeTruthy();
        });
    });

    describe('test thyText as template', () => {
        it('should exist .thy-divider-inner-template', () => {
            componentInstance.textContent = null;
            fixture.detectChanges();

            const innerTemplate = fixture.nativeElement.querySelector('.thy-divider .thy-divider-inner-template');
            expect(innerTemplate).toBeTruthy();
        });
    });

    describe('test thyTextDirection change', () => {
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

    describe('deeper', () => {
        it('should set thy-deeper by thyDeeper', () => {
            fixture.detectChanges();

            const centerContent: HTMLElement = fixture.nativeElement.querySelector('.thy-divider');
            expect(centerContent).toBeTruthy();

            expect(centerContent.classList.contains('thy-divider-deeper')).toBeFalsy();

            componentInstance.isDeeper = true;
            fixture.detectChanges();
            expect(centerContent.classList.contains('thy-divider-deeper')).toBeTruthy();
        });
    });

    it('should set color', () => {
        fixture.detectChanges();

        const centerContent: HTMLElement = fixture.nativeElement.querySelector('.thy-divider');
        expect(centerContent).toBeTruthy();

        expect(centerContent.classList.contains('thy-divider-default')).toBeTruthy();

        ['primary', 'danger', 'warning', 'success', 'light', 'default'].forEach(color => {
            componentInstance.color = color;
            fixture.detectChanges();
            expect(centerContent.classList.contains(`thy-divider-${color}`)).toBeTruthy();
        });
    });
});

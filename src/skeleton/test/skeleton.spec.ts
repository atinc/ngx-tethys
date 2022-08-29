import { Component, DebugElement, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySkeletonCircleComponent } from '../skeleton-circle.component';
import { ThySkeletonRectangleComponent } from '../skeleton-rectangle.component';

import { ThySkeletonModule } from '../module';

@Component({
    selector: 'thy-skeleton-test',
    template: `
        <thy-skeleton thyWidth="300px" [thySize]="model.circleSize + 'rem'" thyRows="4" thyCount="2" [thyAnimated]="true">
            <div class="d-flex mb-2">
                <div>
                    <thy-skeleton-circle thySize="4rem"></thy-skeleton-circle>
                </div>
                <div class="d-flex flex-column w-100 ml-2">
                    <ng-container *ngFor="let k of [1, 2, 3]">
                        <thy-skeleton-rectangle thyWidth="100%" class="mb-2"> </thy-skeleton-rectangle>
                    </ng-container>
                </div>
            </div>
            <div class="d-flex flex-column">
                <ng-container *ngFor="let k of [1, 2, 3]">
                    <thy-skeleton-rectangle thyWidth="100%" class="mb-2"> </thy-skeleton-rectangle>
                </ng-container>
            </div>
        </thy-skeleton>
    `
})
class thySkeletonTestComponent {
    checkedValue = 1;
    inlineStatus = false;
}

describe('skeleton ', () => {
    let fixture: ComponentFixture<thySkeletonTestComponent>;
    let skeletonComponent: thySkeletonTestComponent;
    let circleDebugComponent: DebugElement;
    let circleElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThySkeletonModule],
            declarations: [thySkeletonTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(thySkeletonTestComponent);
        skeletonComponent = fixture.debugElement.componentInstance;
        circleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonCircleComponent));
        circleElement = circleDebugComponent.nativeElement;
        // radioDebugComponent = fixture.debugElement.query(By.directive(ThyRadioComponent));
        // radioElement = radioDebugComponent.nativeElement;
        // labelNode = radioElement.children[0];
    });

    it('should create', () => {
        expect(skeletonComponent).toBeTruthy();
        expect(circleElement).toBeTruthy();
    });
});

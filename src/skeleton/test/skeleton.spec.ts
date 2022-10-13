import { Component, DebugElement, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySkeletonCircleComponent } from '../skeleton-circle.component';
import { ThySkeletonRectangleComponent } from '../skeleton-rectangle.component';
import { ThySkeletonModule } from '../module';

@Component({
    selector: 'thy-skeleton-test',
    template: `
        <thy-skeleton [thyRowWidth]="upperWidth" [thySize]="upperSize" thyRows="4" thyCount="2" [thyAnimated]="true">
            <div class="d-flex mb-2">
                <thy-skeleton-circle [thySize]="circleSize"></thy-skeleton-circle>
                <thy-skeleton-rectangle class="mb-2"> </thy-skeleton-rectangle>
            </div>
        </thy-skeleton>
    `
})
class thySkeletonTestComponent {
    upperSize: string = '30px';
    upperWidth: string = '300px';
    circleSize: string = null;
}

describe('skeleton ', () => {
    let fixture: ComponentFixture<thySkeletonTestComponent>;
    let skeletonComponent: thySkeletonTestComponent;
    let circleDebugComponent: DebugElement;
    let circleElement: HTMLElement;
    let rectangleDebugComponent: DebugElement;
    let rectangleElement: HTMLElement;

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
        rectangleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonRectangleComponent));
        circleElement = circleDebugComponent.nativeElement;
        rectangleElement = rectangleDebugComponent.nativeElement;
    });

    it('should create', () => {
        expect(skeletonComponent).toBeTruthy();
        expect(circleElement).toBeTruthy();
    });

    it('should set children style by parent parameter when child parameter is null', () => {
        fixture.detectChanges();
        expect(getComputedStyle(circleElement).getPropertyValue('width') === skeletonComponent.upperSize).toBeTruthy();
        expect(getComputedStyle(circleElement).getPropertyValue('height') === skeletonComponent.upperSize).toBeTruthy();

        expect(getComputedStyle(rectangleElement).getPropertyValue('width') === skeletonComponent.upperWidth).toBeTruthy();
    });

    it('should set children style by it"s own parameter', () => {
        fixture.detectChanges();
        skeletonComponent.circleSize = '30px';
        fixture.detectChanges();
        expect(getComputedStyle(circleElement).getPropertyValue('width') === '30px').toBeTruthy();
    });
});

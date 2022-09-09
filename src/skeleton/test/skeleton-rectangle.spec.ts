import { Component, DebugElement, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySkeletonRectangleComponent } from '../skeleton-rectangle.component';
import { ThySkeletonModule } from '../module';

@Component({
    selector: 'thy-skeleton-rectangle-test',
    template: `
        <thy-skeleton [thyAnimated]="false">
            <thy-skeleton-rectangle
                [thyAnimated]="model.thyAnimated"
                [thyAnimatedSpeed]="model.thyAnimatedSpeed"
                [thyWidth]="model.thyWidth + 'rem'"
                [thyPrimaryColor]="model.thyPrimaryColor"
                [thySecondaryColor]="model.thySecondaryColor"
            >
            </thy-skeleton-rectangle>
        </thy-skeleton>
    `
})
class ThySkeletonRectangleTestComponent {
    model = {
        thyWidth: 3,
        thyHeight: '1rem',
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#7cd897',
        thyAnimatedSpeed: 2,
        thyAnimated: true
    };
}

describe('skeleton rectangle', () => {
    let fixture: ComponentFixture<ThySkeletonRectangleTestComponent>;
    let skeletonSkeletonComponent: ThySkeletonRectangleTestComponent;
    let circleDebugComponent: DebugElement;
    let circleElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThySkeletonModule],
            declarations: [ThySkeletonRectangleTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThySkeletonRectangleTestComponent);
        skeletonSkeletonComponent = fixture.debugElement.componentInstance;

        circleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonRectangleComponent));
        circleElement = circleDebugComponent.nativeElement;
    });

    it('should create', () => {
        expect(skeletonSkeletonComponent).toBeTruthy();
        expect(circleElement).toBeTruthy();

        fixture.detectChanges();
        expect(circleElement.classList.contains('thy-skeleton')).toBeTruthy();
    });

    it('should remove animation when thyAnimated is "false"', () => {
        fixture.detectChanges();
        skeletonSkeletonComponent.model.thyAnimated = false;
        fixture.detectChanges();
        expect(
            getComputedStyle(circleElement.querySelector('.thy-skeleton-after'), null)
                .getPropertyValue('animation')
                .includes('none')
        ).toBeTruthy();
    });
});

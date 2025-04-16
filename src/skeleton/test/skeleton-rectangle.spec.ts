import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySkeletonRectangle, ThySkeletonModule } from 'ngx-tethys/skeleton';

@Component({
    selector: 'thy-skeleton-rectangle-test',
    template: `
        <thy-skeleton [thyAnimated]="false">
            <thy-skeleton-rectangle
                [thyAnimated]="model.thyAnimated"
                [thyAnimatedInterval]="model.thyAnimatedInterval"
                [thyRowWidth]="model.thyRowWidth + 'rem'"
                [thyPrimaryColor]="model.thyPrimaryColor"
                [thySecondaryColor]="model.thySecondaryColor">
            </thy-skeleton-rectangle>
        </thy-skeleton>
    `,
    imports: [ThySkeletonModule]
})
class ThySkeletonRectangleTestComponent {
    model = {
        thyRowWidth: 3,
        thyRowHeight: '20px',
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#7cd897',
        thyAnimatedInterval: 2,
        thyAnimated: true
    };
}

describe('skeleton rectangle', () => {
    let fixture: ComponentFixture<ThySkeletonRectangleTestComponent>;
    let skeletonSkeletonComponent: ThySkeletonRectangleTestComponent;
    let circleDebugComponent: DebugElement;
    let circleElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThySkeletonRectangleTestComponent);
        skeletonSkeletonComponent = fixture.debugElement.componentInstance;

        circleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonRectangle));
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

        skeletonSkeletonComponent.model.thySecondaryColor = '#18a0e0';
        fixture.detectChanges();
        expect(
            getComputedStyle(circleElement.querySelector('.thy-skeleton-after'), null).getPropertyValue('animation').includes('none')
        ).toBeTruthy();
    });
});

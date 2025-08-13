import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySkeletonCircle, ThySkeletonRectangle, ThySkeletonModule } from 'ngx-tethys/skeleton';

@Component({
    selector: 'thy-skeleton-test',
    template: `
        <thy-skeleton [thyAnimated]="true" [thyAnimatedInterval]="'1.5'" [thySecondaryColor]="'#f6c659'" [thyPrimaryColor]="'#999999'">
            <div class="d-flex mb-2">
                <thy-skeleton-circle [thySize]="circleSize"></thy-skeleton-circle>
                <thy-skeleton-rectangle class="mb-2"> </thy-skeleton-rectangle>
            </div>
        </thy-skeleton>
    `,
    imports: [ThySkeletonModule]
})
class thySkeletonTestComponent {
    circleSize: string = null;
}

describe('skeleton ', () => {
    let fixture: ComponentFixture<thySkeletonTestComponent> | undefined = undefined;
    let skeletonComponent: thySkeletonTestComponent | undefined = undefined;
    let circleDebugComponent: DebugElement | undefined = undefined;
    let circleElement: HTMLElement | undefined = undefined;
    let rectangleDebugComponent: DebugElement | undefined = undefined;
    let rectangleElement: HTMLElement | undefined = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(thySkeletonTestComponent);
        skeletonComponent = fixture.debugElement.componentInstance;
        circleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonCircle));
        rectangleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonRectangle));
        circleElement = circleDebugComponent.nativeElement;
        rectangleElement = rectangleDebugComponent.nativeElement;
    });

    it('should create', () => {
        expect(skeletonComponent).toBeTruthy();
        expect(circleElement).toBeTruthy();
    });

    it('should set children style by parent parameter when child parameter is null', () => {
        fixture.detectChanges();

        expect(
            getComputedStyle(circleElement.querySelector('.thy-skeleton-after'))
                .getPropertyValue('animation')
                .includes('thy-skeleton-animation')
        ).toBeTruthy();

        expect(
            getComputedStyle(rectangleElement.querySelector('.thy-skeleton-after'))
                .getPropertyValue('animation')
                .includes('thy-skeleton-animation')
        ).toBeTruthy();

        expect(
            getComputedStyle(circleElement.querySelector('.thy-skeleton-after')).getPropertyValue('animation').includes('1.5')
        ).toBeTruthy();

        expect(
            getComputedStyle(rectangleElement.querySelector('.thy-skeleton-after')).getPropertyValue('animation').includes('1.5')
        ).toBeTruthy();

        expect(getComputedStyle(circleElement).getPropertyValue('background').includes('rgb(153, 153, 153)')).toBeTruthy();

        expect(getComputedStyle(rectangleElement).getPropertyValue('background').includes('rgb(153, 153, 153)')).toBeTruthy();
    });

    it('should set children style by it"s own parameter', () => {
        fixture.detectChanges();
        skeletonComponent.circleSize = '30px';
        fixture.detectChanges();
        expect(getComputedStyle(circleElement).getPropertyValue('width') === '30px').toBeTruthy();
    });
});

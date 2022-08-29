import { Component, DebugElement, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySkeletonCircleComponent } from '../skeleton-circle.component';
import { ThySkeletonRectangleComponent } from '../skeleton-rectangle.component';

import { ThySkeletonModule } from '../module';

@Component({
    selector: 'thy-skeleton-circle-test',
    template: `
        <thy-skeleton-circle
            [thyAnimated]="model.thyAnimated"
            [thyAnimatedSpeed]="model.thyAnimatedSpeed"
            [thySize]="model.thySize + 'rem'"
            [thyPrimaryColor]="model.thyPrimaryColor"
            [thySecondaryColor]="model.thySecondaryColor"
        >
        </thy-skeleton-circle>
    `
})
class ThySkeletonCircleTestComponent {
    model = {
        thySize: 3,
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#7cd897',
        thyAnimatedSpeed: 2,
        thyAnimated: true
    };
}

describe('skeleton circle', () => {
    let fixture: ComponentFixture<ThySkeletonCircleTestComponent>;
    let skeletonCircleComponent: ThySkeletonCircleTestComponent;
    let circleDebugComponent: DebugElement;
    let circleElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThySkeletonModule],
            declarations: [ThySkeletonCircleTestComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThySkeletonCircleTestComponent);
        skeletonCircleComponent = fixture.debugElement.componentInstance;

        circleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonCircleComponent));
        circleElement = circleDebugComponent.nativeElement;
        // radioDebugComponent = fixture.debugElement.query(By.directive(ThyRadioComponent));
        // radioElement = radioDebugComponent.nativeElement;
        // labelNode = radioElement.children[0];
    });

    it('should create', () => {
        expect(skeletonCircleComponent).toBeTruthy();
        expect(circleElement).toBeTruthy();

        fixture.detectChanges();
        expect(circleElement.classList.contains('thy-skeleton-circle')).toBeTruthy();
        expect(circleElement.classList.contains('thy-skeleton')).toBeTruthy();

        // document.querySelector(`._vm`).getAttribute('style')

        // expect(document.querySelector(`._vm`).getAttribute('style')).toBeTruthy();
        // expect(circleElement.classList.contains('thy-skeleton-circle')).toBeTruthy();
        // expect(circleElement.classList.contains('thy-skeleton-circle')).toBeTruthy();
    });

    fit('should remove animation when thyAnimated is "false"', () => {
        fixture.detectChanges();
        skeletonCircleComponent.model.thyAnimated = false;
        fixture.detectChanges();
        console.log(getComputedStyle(circleElement, null).getPropertyValue('animation'));
        expect(getComputedStyle(circleElement, null).getPropertyValue('animation') === 'none').toBeTruthy();
    });
});

// @Component({
//     selector: 'thy-skeleton-rectangle-test',
//     template: `
//         <thy-skeleton-rectangle thyAnimatedSpeed="1.2" [thyAnimated]="true" thySecondaryColor="#ffffff"> </thy-skeleton-rectangle>
//     `
// })
// class thySkeletonRectangleTestComponent {
//     checkedValue = 1;
//     inlineStatus = false;
// }

// describe('skeleton rectangle', () => {
//     let fixture: ComponentFixture<thySkeletonRectangleTestComponent>;
//     let skeletonCircleComponent: thySkeletonRectangleTestComponent;
//     let circleDebugComponent: DebugElement;
//     let circleElement: HTMLElement;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [ThySkeletonModule],
//             declarations: [thySkeletonRectangleTestComponent],
//             providers: []
//         });
//         TestBed.compileComponents();
//     });

//     beforeEach(() => {
//         fixture = TestBed.createComponent(thySkeletonRectangleTestComponent);
//         skeletonCircleComponent = fixture.debugElement.componentInstance;
//         circleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonCircleComponent));
//         circleElement = circleDebugComponent.nativeElement;
//         // radioDebugComponent = fixture.debugElement.query(By.directive(ThyRadioComponent));
//         // radioElement = radioDebugComponent.nativeElement;
//         // labelNode = radioElement.children[0];
//     });

//     it('should create', () => {
//         expect(skeletonCircleComponent).toBeTruthy();
//         expect(circleElement).toBeTruthy();
//     });
// });

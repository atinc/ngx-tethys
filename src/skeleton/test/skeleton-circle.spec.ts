import { Component, DebugElement, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThySkeletonCircle } from '../skeleton-circle.component';

import { ThySkeletonModule } from '../module';

@Component({
    selector: 'thy-skeleton-circle-test',
    template: `
        <thy-skeleton [thyAnimated]="false">
            <thy-skeleton-circle
                [thyAnimated]="model.thyAnimated"
                [thyAnimatedInterval]="model.thyAnimatedInterval"
                [thySize]="model.thySize + 'rem'"
                [thyPrimaryColor]="model.thyPrimaryColor"
                [thySecondaryColor]="model.thySecondaryColor">
            </thy-skeleton-circle>
        </thy-skeleton>
    `,
    standalone: false
})
class ThySkeletonCircleTestComponent {
    model = {
        thySize: 3,
        thyPrimaryColor: '#cccccc',
        thySecondaryColor: '#7cd897',
        thyAnimatedInterval: 2,
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

        circleDebugComponent = fixture.debugElement.query(By.directive(ThySkeletonCircle));
        circleElement = circleDebugComponent.nativeElement;
    });

    it('should create', () => {
        expect(skeletonCircleComponent).toBeTruthy();
        expect(circleElement).toBeTruthy();

        fixture.detectChanges();
        expect(circleElement.classList.contains('thy-skeleton-circle')).toBeTruthy();
        expect(circleElement.classList.contains('thy-skeleton')).toBeTruthy();
    });

    it('should remove animation when thyAnimated is "false"', () => {
        fixture.detectChanges();
        skeletonCircleComponent.model.thyAnimated = false;
        skeletonCircleComponent.model.thySecondaryColor = '#18a0e0';
        fixture.detectChanges();
        expect(
            getComputedStyle(circleElement.querySelector('.thy-skeleton-after'), null).getPropertyValue('animation').includes('none')
        ).toBeTruthy();
    });
});

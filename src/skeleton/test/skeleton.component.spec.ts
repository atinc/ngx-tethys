import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThySkeletonModule } from '../module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ThySkeletonComponent } from '../skeleton.component';

const defaultValues = {
    thyViewBoxWidth: 400,
    thyViewBoxHeight: 130,
    width: '100%',
    height: '100%',
    thySpeed: 2,
    thyPreserveAspectRatio: '',
    thyPrimaryColor: '#f0f0f0',
    thySecondaryColor: '#e0e0e0',
    thyPrimaryOpacity: 1,
    thySecondaryOpacity: 1,
    defaultAnimation: ['-3; 1', '-2; 2', '-1; 3']
};

@Component({
    selector: 'demo-skeleton-basic',
    template: `
        <thy-skeleton></thy-skeleton>
    `
})
class SkeletonBasicComponent {}

describe('#skeleton', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SkeletonBasicComponent],
            imports: [ThySkeletonModule, NoopAnimationsModule],
            providers: [
                // { provide: Location, useClass: SpyLocation }
            ]
        });

        TestBed.compileComponents();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<SkeletonBasicComponent>;
        let skeletonDebugElement: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(SkeletonBasicComponent);
            fixture.detectChanges();
            skeletonDebugElement = fixture.debugElement.query(By.directive(ThySkeletonComponent));
        });

        it('should get correct class', () => {
            expect(fixture.componentInstance).toBeTruthy();
            expect(skeletonDebugElement).toBeTruthy();
            const skeletonElement: HTMLElement = skeletonDebugElement.nativeElement;
            expect(skeletonElement).toBeTruthy();
            expect(skeletonElement.classList.contains('thy-skeleton')).toBeTruthy();
        });

        it('should get correct content', () => {
            const skeleton: ThySkeletonComponent = skeletonDebugElement.componentInstance;
            const svgElement = skeletonDebugElement.nativeElement.querySelector('svg');

            expect(svgElement).toBeTruthy();
            expect(svgElement.getAttribute('viewBox')).toEqual(
                `0 0 ${defaultValues.thyViewBoxWidth} ${defaultValues.thyViewBoxHeight}`
            );
            expect(svgElement.getAttribute('preserveAspectRatio')).toEqual(defaultValues.thyPreserveAspectRatio);
            expect(svgElement.getAttribute('height')).toEqual(defaultValues.height);
            expect(svgElement.getAttribute('width')).toEqual(defaultValues.width);

            const rectElement: HTMLElement = svgElement.querySelector('rect');
            const clipPathElement: HTMLElement = svgElement.querySelector('clipPath');
            const linearGradientElement: HTMLElement = svgElement.querySelector('linearGradient');

            expect(rectElement).toBeTruthy();
            expect(rectElement.getAttribute('x')).toEqual('0');
            expect(rectElement.getAttribute('y')).toEqual('0');
            expect(rectElement.getAttribute('clip-path')).toEqual(skeleton.clipPath);
            expect(rectElement.getAttribute('width')).toEqual(defaultValues.width);
            expect(rectElement.getAttribute('height')).toEqual(defaultValues.height);
            expect(rectElement.getAttribute('style')).toEqual(`fill: url("/context.html#${skeleton.idGradient}");`);

            expect(clipPathElement).toBeTruthy();
            expect(clipPathElement.getAttribute('id')).toEqual(skeleton.idClip);
            expect(clipPathElement.textContent).toEqual('');

            expect(linearGradientElement).toBeTruthy();
            expect(linearGradientElement.getAttribute('id')).toEqual(skeleton.idGradient);

            const stopElements = linearGradientElement.querySelectorAll('stop');
            expect(stopElements).toBeTruthy();
            expect(stopElements.length).toEqual(3);

            stopElements.forEach((stopElement, index) => {
                const color = stopElement.getAttribute('stop-color');
                const opacity = stopElement.getAttribute('stop-opacity');
                expect(color).toEqual(
                    `${index % 2 === 0 ? defaultValues.thyPrimaryColor : defaultValues.thySecondaryColor}`
                );
                expect(opacity).toEqual(
                    `${index % 2 === 0 ? defaultValues.thyPrimaryOpacity : defaultValues.thySecondaryOpacity}`
                );
                const animateElement = stopElement.querySelector('animate');
                expect(animateElement).toBeTruthy();
                expect(animateElement.getAttribute('dur')).toEqual(`${defaultValues.thySpeed}`);
                expect(animateElement.getAttribute('attributeName')).toEqual(`offset`);
                expect(animateElement.getAttribute('repeatCount')).toEqual(`indefinite`);
                expect(animateElement.getAttribute('values')).toEqual(defaultValues.defaultAnimation[index]);
            });
        });

        it('should set skeleton default values', () => {
            const skeleton: ThySkeletonComponent = skeletonDebugElement.componentInstance;
            expect(skeleton.thyWidth).toEqual(defaultValues.width);
            expect(skeleton.thyHeight).toEqual(defaultValues.height);
            expect(skeleton.thyViewBoxWidth).toEqual(defaultValues.thyViewBoxWidth);
            expect(skeleton.thyViewBoxHeight).toEqual(defaultValues.thyViewBoxHeight);
            expect(skeleton.thySpeed).toEqual(defaultValues.thySpeed);
            expect(skeleton.thyBaseUrl).toEqual('/context.html');
            expect(skeleton.thyPreserveAspectRatio).toEqual(defaultValues.thyPreserveAspectRatio);
            expect(skeleton.thyPrimaryColor).toEqual(defaultValues.thyPrimaryColor);
            expect(skeleton.thySecondaryColor).toEqual(defaultValues.thySecondaryColor);
            expect(skeleton.thyPrimaryOpacity).toEqual(defaultValues.thyPrimaryOpacity);
            expect(skeleton.thySecondaryOpacity).toEqual(defaultValues.thySecondaryOpacity);
            expect(skeleton.thyAnimate).toEqual(true);
            expect(skeleton.thyRtl).toEqual(undefined);
            expect(skeleton.animationValues).toEqual(defaultValues.defaultAnimation);

            expect(skeleton.fillStyle).toEqual({
                fill: `url(${skeleton.thyBaseUrl}#${skeleton.idGradient})`
            });
            expect(skeleton.clipPath).toEqual(`url(${skeleton.thyBaseUrl}#${skeleton.idClip})`);
        });
    });
});

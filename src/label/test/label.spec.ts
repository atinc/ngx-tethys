import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyLabelModule } from '../label.module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyLabelComponent } from '../label.component';
import { dispatchFakeEvent } from '../../testing';

describe('ThyLabel', () => {
    let fixture: ComponentFixture<ThyDemoLabelBasicComponent>;
    let basicTestComponent: ThyDemoLabelBasicComponent;
    let labelComponent: DebugElement;

    const sizes = ['sm', 'md', 'lg'];
    const types = ['state', 'pill'];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyLabelModule, LabelTestModule],
            providers: [
                // { provide: Location, useClass: SpyLocation }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoLabelBasicComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        labelComponent = fixture.debugElement.query(By.directive(ThyLabelComponent));
    });

    function assertLabelBeforeIconClass(expectedIconClass?: string) {
        const labelBeforeIcon = labelComponent.nativeElement.children[0];
        expect(labelBeforeIcon).toBeTruthy();
        expect(labelBeforeIcon.classList.contains(`thy-icon`)).toBe(true);
        expect(labelBeforeIcon.classList.contains(`thy-icon-${expectedIconClass}`)).toBe(
            true,
            `expectedIconClass is thy-icon-${expectedIconClass}, but actual is ${labelBeforeIcon.classList}`
        );
    }
    function assertLabelAfterIconClass(expectedIconClass?: string) {
        const labelAfterIcon = labelComponent.nativeElement.children[1];
        expect(labelAfterIcon).toBeTruthy();
        expect(labelAfterIcon.classList.contains(`thy-icon`)).toBe(true);
        expect(labelAfterIcon.classList.contains(`thy-icon-${expectedIconClass}`)).toBe(
            true,
            `expectedIconClass is thy-icon-${expectedIconClass}, but actual is ${labelAfterIcon.classList}`
        );
    }

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(labelComponent.nativeElement.classList.contains('thy-label')).toBe(true);
        expect(labelComponent.nativeElement.classList.contains('thy-label-default')).toBe(true);
        assertLabelBeforeIconClass('plus');
        assertLabelAfterIconClass('close');
    });

    it('should have correct class when icon with thy-icon', () => {
        const iconName = 'folder-bold';
        basicTestComponent.thyBeforeIcon = iconName;
        basicTestComponent.thyAfterIcon = iconName;
        fixture.detectChanges();
        assertLabelBeforeIconClass(iconName);
        assertLabelAfterIconClass(iconName);
    });

    it('should have not icon element when icon is null', () => {
        basicTestComponent.thyBeforeIcon = ``;
        basicTestComponent.thyAfterIcon = ``;
        fixture.detectChanges();
        const labelIcon = labelComponent.nativeElement.querySelector(`.thy-icon`);
        expect(labelIcon).toBeNull();
    });

    it('should have backgroundColor when thyLabelColor is #7076fa and thyLabel is null', () => {
        basicTestComponent.thyLabel = '';
        basicTestComponent.thyLabelColor = `#7076fa`;
        fixture.detectChanges();
        expect(labelComponent.nativeElement.style.backgroundColor === 'rgb(112, 118, 250)').toBe(true);
        expect(labelComponent.nativeElement.style.color === '').toBe(true);
        expect(labelComponent.nativeElement.classList.contains('thy-label')).toBe(true);
    });

    it('should not have color and backgroundColor when thyLabelColor is null', () => {
        basicTestComponent.thyLabel = `emboss-default`;
        basicTestComponent.thyLabelColor = ``;
        fixture.detectChanges();
        expect(labelComponent.nativeElement.style.backgroundColor === '').toBe(true);
        expect(labelComponent.nativeElement.style.color === '').toBe(true);
        expect(labelComponent.nativeElement.classList.contains('thy-label')).toBe(true);
        expect(labelComponent.nativeElement.classList.contains('thy-label-emboss-default')).toBe(true);
    });

    it('thyLabelColor will cover thyLabel', () => {
        basicTestComponent.thyLabel = 'emboss-default';
        basicTestComponent.thyLabelColor = `#7076fa`;
        fixture.detectChanges();
        expect(labelComponent.nativeElement.style.backgroundColor === 'rgba(112, 118, 250, 0.1)').toBe(true);
        expect(labelComponent.nativeElement.style.color === 'rgb(112, 118, 250)').toBe(true);
        expect(labelComponent.nativeElement.classList.contains('thy-label')).toBe(true);
        expect(labelComponent.nativeElement.classList.contains('thy-label-emboss-default')).toBe(true);
    });

    it('should have correct background opacity when set thyBackgroundOpacity', () => {
        basicTestComponent.thyLabel = 'emboss-default';
        basicTestComponent.thyLabelColor = `#7076fa`;
        basicTestComponent.thyBackgroundOpacity = 0.2;
        fixture.detectChanges();
        expect(labelComponent.nativeElement.style.backgroundColor === 'rgba(112, 118, 250, 0.2)').toBe(true);
    });

    it('should label color is #333 when label type is emboss-status', () => {
        basicTestComponent.thyLabel = 'emboss-status';
        basicTestComponent.thyLabelColor = `#fa5a55`;
        fixture.detectChanges();
        expect(labelComponent.nativeElement.style.color === 'rgb(51, 51, 51)').toBe(true);
    });

    it('should thyLabelColor is label color and borderColor when type is outline', () => {
        basicTestComponent.thyLabel = 'outline';
        basicTestComponent.thyLabelColor = '#ff5b57';
        fixture.detectChanges();
        expect(labelComponent.nativeElement.style.color === 'rgb(255, 91, 87)').toBe(true);
        expect(labelComponent.nativeElement.style.borderColor === 'rgb(255, 91, 87)').toBe(true);
    });

    it('should not have correct class when label-has-hover is false', () => {
        basicTestComponent.thyLabel = 'emboss-default';
        basicTestComponent.thyHasHover = false;
        fixture.detectChanges();
        expect(labelComponent.nativeElement.classList.contains('label-has-hover')).toBe(false);
    });

    it('should have correct class when label-has-hover is true', () => {
        basicTestComponent.thyLabel = 'emboss-default';
        basicTestComponent.thyHasHover = true;
        fixture.detectChanges();
        expect(labelComponent.nativeElement.classList.contains('label-has-hover')).toBe(true);
    });

    it('should set thy-icon success', () => {
        basicTestComponent.thyBeforeIcon = 'plus';
        basicTestComponent.thyAfterIcon = 'close';
        fixture.detectChanges();
        const labelBeforeIcon = labelComponent.nativeElement.children[0];
        expect(labelBeforeIcon.tagName).toEqual('THY-ICON');
        expect(labelBeforeIcon.classList.contains('thy-icon-plus')).toBeTruthy();

        const labelAfterIcon = labelComponent.nativeElement.children[1];
        expect(labelAfterIcon.tagName).toEqual('THY-ICON');
        expect(labelAfterIcon.classList.contains('thy-icon-close')).toBeTruthy();
    });

    it('should set wtf icon success', () => {
        basicTestComponent.thyBeforeIcon = 'wtf-plus';
        basicTestComponent.thyAfterIcon = 'wtf-close';
        fixture.detectChanges();
        const labelBeforeIcon = labelComponent.nativeElement.children[0];
        expect(labelBeforeIcon.tagName).toEqual('I');
        expect(labelBeforeIcon.classList.contains('wtf-plus')).toBeTruthy();

        const labelAfterIcon = labelComponent.nativeElement.children[1];
        expect(labelAfterIcon.tagName).toEqual('I');
        expect(labelAfterIcon.classList.contains('wtf-close')).toBeTruthy();
    });

    it('should set size success', () => {
        sizes.forEach(size => {
            basicTestComponent.thySize = size;
            fixture.detectChanges();
            const element: HTMLElement = labelComponent.nativeElement;
            expect(element.classList.contains(`thy-label--${size}`)).toBeTruthy();
        });
    });

    it('should set label type success', () => {
        types.forEach(type => {
            basicTestComponent.thyLabelType = type;
            fixture.detectChanges();
            const element: HTMLElement = labelComponent.nativeElement;
            expect(element.classList.contains(`thy-label-${type}`)).toBeTruthy();
        });
    });

    it('should clear value on click remove', () => {
        dispatchFakeEvent(labelComponent.nativeElement, 'mouseover', true);
        fixture.detectChanges();
        const closeIcon = labelComponent.nativeElement.querySelector('.thy-icon-close');
        expect(closeIcon).toBeTruthy();

        const removeSpy = spyOn(fixture.componentInstance, 'remove');
        dispatchFakeEvent(closeIcon, 'click', true);

        fixture.detectChanges();
        expect(removeSpy).toHaveBeenCalledTimes(1);
    });
});

@Component({
    selector: 'thy-demo-label-basic',
    template: `
        <span
            class="mr-1"
            [thyLabel]="thyLabel"
            [thyBeforeIcon]="thyBeforeIcon"
            [thyAfterIcon]="thyAfterIcon"
            [thyLabelColor]="thyLabelColor"
            [thyBackgroundOpacity]="thyBackgroundOpacity"
            [thyHasHover]="thyHasHover"
            [thySize]="thySize"
            [thyLabelType]="thyLabelType"
            (thyOnRemove)="remove()"
            >Default</span
        >
    `
})
class ThyDemoLabelBasicComponent {
    thyLabel = `default`;
    thyBeforeIcon = `plus`;
    thyAfterIcon = `close`;
    thyLabelColor = ``;
    thyBackgroundOpacity = 0.1;
    thyHasHover = false;
    thySize = '';
    thyLabelType = '';

    remove() {
        console.log('remove success');
    }
}

@NgModule({
    imports: [ThyLabelModule],
    declarations: [ThyDemoLabelBasicComponent],
    exports: [ThyDemoLabelBasicComponent]
})
export class LabelTestModule {}

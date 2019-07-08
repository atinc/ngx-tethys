import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyLabelModule } from '../label.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyLabelComponent } from '../label.component';

describe('ThyLabel', () => {
    let fixture: ComponentFixture<ThyDemoLabelBasicComponent>;
    let basicTestComponent: ThyDemoLabelBasicComponent;
    let labelComponent;

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
            [thyHasHover]="thyHasHover"
            >Default</span
        >
    `
})
class ThyDemoLabelBasicComponent {
    thyLabel = `default`;
    thyBeforeIcon = `plus`;
    thyAfterIcon = `close`;
    thyLabelColor = ``;
    thyHasHover = false;
}

@NgModule({
    imports: [ThyLabelModule],
    declarations: [ThyDemoLabelBasicComponent],
    exports: [ThyDemoLabelBasicComponent]
})
export class LabelTestModule {}

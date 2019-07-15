import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyButtonModule } from '../button.module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyButtonGroupComponent } from '../button-group.component';

@Component({
    selector: 'thy-demo-button-group',
    template: `
        <thy-button-group [thySize]="size" [thyType]="type" [thyClearMinWidth]="clearMinWidth">
            <button thyButton>Left</button>
            <button thyButton>Middle</button>
            <button thyButton>Right</button>
        </thy-button-group>
    `
})
class ThyDemoButtonGroupComponent {
    size = ``;
    type = `outline-primary`;
    clearMinWidth = false;
}

@NgModule({
    imports: [ThyButtonModule],
    declarations: [ThyDemoButtonGroupComponent],
    exports: [ThyDemoButtonGroupComponent]
})
export class ButtonGroupTestModule {}

describe('ThyButtonGroup', () => {
    let fixture: ComponentFixture<ThyDemoButtonGroupComponent>;
    let basicTestComponent: ThyDemoButtonGroupComponent;
    let buttonGroupComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyButtonModule, ButtonGroupTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoButtonGroupComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        buttonGroupComponent = fixture.debugElement.query(By.directive(ThyButtonGroupComponent));
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-outline-primary')).toBe(true);
    });

    it('should have correct class when type is outline-default', () => {
        basicTestComponent.type = `outline-default`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-outline-default')).toBe(true);
    });

    it('should have correct class when size is lg', () => {
        basicTestComponent.size = `lg`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-lg')).toBe(true);
    });

    it('should have correct class when size is sm', () => {
        basicTestComponent.size = `sm`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-sm')).toBe(true);
    });

    it('should have correct class when size is xs', () => {
        basicTestComponent.size = `xs`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-xs')).toBe(true);
    });

    it('should have correct class when clearMinWidth is true', () => {
        basicTestComponent.clearMinWidth = true;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-clear-min-width')).toBe(true);
    });
});

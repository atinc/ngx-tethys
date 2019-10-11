import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyActionMenuModule } from '../action-menu.module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyActionMenuComponent } from '../action-menu.component';

describe('ThyActionMenu', () => {
    let fixture: ComponentFixture<ThyDemoActionMenuComponent>;
    let testComponent: ThyDemoActionMenuComponent;
    let actionMenuComponent: DebugElement;
    let actionMenuItems: DebugElement[];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyActionMenuModule, ActionMenuTestModule]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoActionMenuComponent);
        testComponent = fixture.debugElement.componentInstance;
        actionMenuComponent = fixture.debugElement.query(By.directive(ThyActionMenuComponent));
        actionMenuItems = actionMenuComponent.queryAll(By.all());
    });

    it('should create', () => {
        expect(actionMenuComponent).toBeTruthy();
        expect(actionMenuItems).toBeTruthy();
    });

    it('should have correct class when type is danger', () => {
        testComponent.type = `danger`;
        fixture.detectChanges();
        expect(actionMenuItems.every(item => item.nativeElement.classList.contains('action-menu-item--danger'))).toBe(
            true
        );
    });

    it('should have correct class when type is success', () => {
        testComponent.type = `success`;
        fixture.detectChanges();
        expect(actionMenuItems.every(item => item.nativeElement.classList.contains('action-menu-item--success'))).toBe(
            true
        );
    });
});

@Component({
    selector: 'thy-demo-action-menu',
    template: `
        <thy-action-menu>
            <a thyActionMenuItem [thyType]="type" href="javascript:;"> </a>
            <a thyActionMenuItem [thyType]="type" href="javascript:;"> </a>
        </thy-action-menu>
    `
})
class ThyDemoActionMenuComponent {
    type = ``;
}

@NgModule({
    imports: [ThyActionMenuModule],
    declarations: [ThyDemoActionMenuComponent],
    exports: [ThyDemoActionMenuComponent]
})
export class ActionMenuTestModule {}

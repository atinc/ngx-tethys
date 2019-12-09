import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyActionMenuModule } from '../action-menu.module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyActionMenuComponent } from '../action-menu.component';
import { ThyActionMenuDividerComponent } from '../action-menu.component';
import { ThyActionMenuItemDirective } from '../action-menu.component';

describe('ThyActionMenu', () => {
    let fixture: ComponentFixture<ThyDemoActionMenuComponent>;
    let testComponent: ThyDemoActionMenuComponent;
    let actionMenuComponent: DebugElement;
    let actionMenuDividerComponent: DebugElement;
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
        actionMenuDividerComponent = fixture.debugElement.query(By.directive(ThyActionMenuDividerComponent));
        actionMenuItems = actionMenuComponent.queryAll(By.directive(ThyActionMenuItemDirective));
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

    it('should have correct class when theme is group', () => {
        testComponent.theme = `group`;
        fixture.detectChanges();
        expect(actionMenuComponent.nativeElement.classList.contains('action-menu--group')).toBe(true);
    });

    it('should have correct class when theme is group and groupType is label', () => {
        testComponent.theme = `group`;
        testComponent.groupType = `label`;
        fixture.detectChanges();
        expect(actionMenuComponent.nativeElement.classList.contains('action-menu--group-label')).toBe(true);
    });

    it('should have correct class when dividerType is crossing', () => {
        testComponent.dividerType = `crossing`;
        fixture.detectChanges();
        expect(actionMenuDividerComponent.nativeElement.classList.contains('action-menu-divider-crossing')).toBe(true);
    });
});

@Component({
    selector: 'thy-demo-action-menu',
    template: `
        <thy-action-menu [thyTheme]="theme" [thyGroupType]="groupType">
            <thy-action-menu-divider [thyType]="dividerType"></thy-action-menu-divider>
            <a thyActionMenuItem [thyType]="type" href="javascript:;"> </a>
            <a thyActionMenuItem [thyType]="type" href="javascript:;"> </a>
        </thy-action-menu>
    `
})
class ThyDemoActionMenuComponent {
    type = ``;
    theme = ``;
    groupType = ``;
    dividerType = ``;
}

@NgModule({
    imports: [ThyActionMenuModule],
    declarations: [ThyDemoActionMenuComponent],
    exports: [ThyDemoActionMenuComponent]
})
export class ActionMenuTestModule {}

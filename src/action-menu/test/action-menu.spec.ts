import { fakeAsync, ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ThyActionMenuModule } from '../action-menu.module';
import { ApplicationRef, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyActionMenuComponent, ThyActionMenuDividerComponent } from '../action-menu.component';
import { ThyActionMenuItemDirective } from '../action-menu-item.directive';
import { createFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';

@Component({
    selector: 'thy-demo-action-menu',
    template: `
        <thy-action-menu [thyTheme]="theme">
            <thy-action-menu-divider [thyType]="dividerType"></thy-action-menu-divider>
            <a thyActionMenuItem [thyType]="type" [thyDisabled]="disabled" href="javascript:;"> </a>
            <a thyActionMenuItem [thyType]="type" href="javascript:;"> </a>
        </thy-action-menu>
    `
})
class ThyDemoActionMenuComponent {
    type = ``;
    theme = ``;
    dividerType = ``;
    disabled = false;
}

@Component({
    selector: 'thy-action-menu-sub-item-example',
    template: `
        <thy-action-menu>
            <a id="menu-item-1" thyActionMenuItem href="javascript:;">
                <span thyActionMenuItemName>Menu 1</span>
                <div thyActionMenuSubItem>
                    <a thyActionMenuItem href="javascript:;">
                        <span thyActionMenuItemName>Sub Menu 1</span>
                    </a>
                    <a thyActionMenuItem href="javascript:;">
                        <span thyActionMenuItemName>Sub Menu 2</span>
                    </a>
                </div>
            </a>
            <a id="menu-item-2" thyActionMenuItem href="javascript:;">
                <span thyActionMenuItemName>Menu 2</span>
                <div thyActionMenuSubItem="left">
                    <a thyActionMenuItem href="javascript:;">
                        <span thyActionMenuItemName>Sub Menu 2</span>
                    </a>
                    <a thyActionMenuItem href="javascript:;">
                        <span thyActionMenuItemName>Sub Menu 2</span>
                    </a>
                </div>
            </a>
            <a id="menu-item-3" thyActionMenuItem href="javascript:;">
                <span thyActionMenuItemName>Menu 2</span>
                <div thyActionMenuSubItem="auto">
                    <a thyActionMenuItem href="javascript:;">
                        <span thyActionMenuItemName>Sub Menu 2</span>
                    </a>
                    <a thyActionMenuItem href="javascript:;">
                        <span thyActionMenuItemName>Sub Menu 2</span>
                    </a>
                </div>
            </a>
        </thy-action-menu>
    `
})
class ThyActionMenuSubMenuItemExampleComponent {}

describe('ThyActionMenu', () => {
    let fixture: ComponentFixture<ThyDemoActionMenuComponent>;
    let testComponent: ThyDemoActionMenuComponent;
    let actionMenuComponent: DebugElement;
    let actionMenuDividerComponent: DebugElement;
    let actionMenuItems: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ThyDemoActionMenuComponent, ThyActionMenuSubMenuItemExampleComponent],
            imports: [ThyActionMenuModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoActionMenuComponent);
        testComponent = fixture.debugElement.componentInstance;
        actionMenuComponent = fixture.debugElement.query(By.directive(ThyActionMenuComponent));
        actionMenuDividerComponent = fixture.debugElement.query(By.directive(ThyActionMenuDividerComponent));
        actionMenuItems = actionMenuComponent.queryAll(By.directive(ThyActionMenuItemDirective));
    });

    it('should create action menu', () => {
        expect(actionMenuComponent).toBeTruthy();
        expect(actionMenuItems).toBeTruthy();
        expect(actionMenuItems.length).toEqual(2);
    });

    it('should have correct class when type is danger', () => {
        testComponent.type = `danger`;
        fixture.detectChanges();
        expect(actionMenuItems.every(item => item.nativeElement.classList.contains('action-menu-item--danger'))).toBe(true);
    });

    it('should have correct class when type is success', () => {
        testComponent.type = `success`;
        fixture.detectChanges();
        expect(actionMenuItems.every(item => item.nativeElement.classList.contains('action-menu-item--success'))).toBe(true);
    });

    it('should have correct class when theme is group', () => {
        testComponent.theme = `group`;
        fixture.detectChanges();
        expect(actionMenuComponent.nativeElement.classList.contains('action-menu--group')).toBe(true);
    });

    it('should have correct class when dividerType is crossing', () => {
        testComponent.dividerType = `crossing`;
        fixture.detectChanges();
        expect(actionMenuDividerComponent.nativeElement.classList.contains('action-menu-divider-crossing')).toBe(true);
    });

    it('should not run change detection when the menu item is clicked but should stop propagation if disabled', () => {
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');
        const event = createFakeEvent('click');
        spyOn(event, 'preventDefault').and.callThrough();
        spyOn(event, 'stopPropagation').and.callThrough();
        actionMenuItems[0].nativeElement.dispatchEvent(event);
        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.stopPropagation).not.toHaveBeenCalled();
        testComponent.disabled = true;
        fixture.detectChanges();
        actionMenuItems[0].nativeElement.dispatchEvent(event);
        // It's been called once because of we manually called the `fixture.detectChanges()`,
        // otherwise, it would've been called twice.
        expect(appRef.tick).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});

describe('#ThyActionMenuSubItem', () => {
    let fixture: ComponentFixture<ThyActionMenuSubMenuItemExampleComponent>;
    let actionMenuSubMenuItemExample: ThyActionMenuSubMenuItemExampleComponent;
    let actionMenuComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ThyActionMenuSubMenuItemExampleComponent],
            imports: [ThyActionMenuModule]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyActionMenuSubMenuItemExampleComponent);
        fixture.detectChanges();
        actionMenuSubMenuItemExample = fixture.debugElement.componentInstance;
        actionMenuComponent = fixture.debugElement.query(By.directive(ThyActionMenuComponent));
    });

    it('should create action menu sub items', () => {
        expect(actionMenuComponent).toBeTruthy();
        const allMenuItems = actionMenuComponent.queryAll(By.directive(ThyActionMenuItemDirective));
        expect(allMenuItems).toBeTruthy();
        expect(allMenuItems.length).toEqual(9);
    });

    it('should get correct class when direction is default', () => {
        const defaultMenuItem = actionMenuComponent.query(By.css('#menu-item-1'));
        expect(defaultMenuItem.nativeElement.classList.contains(`action-menu-item-right`)).toBeTruthy();
    });

    it('should get correct class when direction is left', () => {
        const defaultMenuItem = actionMenuComponent.query(By.css('#menu-item-2'));
        expect(defaultMenuItem.nativeElement.classList.contains(`action-menu-item-left`)).toBeTruthy();
    });

    it('should get correct class when direction is auto', () => {
        const defaultMenuItem = actionMenuComponent.query(By.css('#menu-item-3'));
        expect(defaultMenuItem.nativeElement.classList.contains(`action-menu-item-auto`)).toBeTruthy();
    });

    it('should get correct class when direction is auto and no space on the right', fakeAsync(() => {
        const defaultMenuItem = actionMenuComponent.query(By.css('#menu-item-3'));
        expect(defaultMenuItem.nativeElement.classList.contains(`action-menu-item-auto`)).toBeTruthy();
        dispatchMouseEvent(defaultMenuItem.nativeElement, 'mouseenter');
        tick(100);
        expect(defaultMenuItem.nativeElement.classList.contains(`action-menu-item-left`)).toBeTruthy();
    }));

    it('should get correct class when direction is auto and has space on the right', fakeAsync(() => {
        const defaultMenuItem = actionMenuComponent.query(By.css('#menu-item-3'));
        expect(defaultMenuItem.nativeElement.classList.contains(`action-menu-item-auto`)).toBeTruthy();
        defaultMenuItem.nativeElement.style.position = 'absolute';
        defaultMenuItem.nativeElement.style.left = 0;
        dispatchMouseEvent(defaultMenuItem.nativeElement, 'mouseenter');
        tick(100);
        expect(defaultMenuItem.nativeElement.classList.contains(`action-menu-item-right`)).toBeTruthy();
    }));
});

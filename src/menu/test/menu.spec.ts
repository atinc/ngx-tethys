import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';

import { Component, DebugElement, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThyDividerModule } from '../../divider';
import { ThyIconModule } from '../../icon/icon.module';
import { ThyPopover, ThyPopoverModule } from '../../popover';
import { ThyMenuDivider } from '../divider/menu-divider.component';
import { ThyMenuGroup } from '../group/menu-group.component';
import { ThyMenuItemAction } from '../item/action/menu-item-action.component';
import { ThyMenuItemIcon } from '../item/icon/menu-item-icon.component';
import { ThyMenuItem } from '../item/menu-item.component';
import { ThyMenuItemName } from '../item/name/menu-item-name.component';
import { ThyMenu, ThyMenuTheme } from '../menu.component';
import { ThyMenuModule } from '../menu.module';

@Component({
    selector: 'thy-demo-menu',
    template: `
        <thy-menu [thyTheme]="theme">
            <thy-menu-group
                thyTitle="工作"
                [thyExpand]="true"
                [thyCollapsible]="collapsible"
                (thyCollapsedChange)="toggle($event)"
                [thyShowAction]="true"
                [thyActionIcon]="'user-group-fill'">
                <thy-menu-item>
                    <thy-menu-item-icon class="noColorIcon">
                        <thy-icon thyIconName="user-group-fill"></thy-icon>
                    </thy-menu-item-icon>
                    <thy-menu-item-name>我的工作</thy-menu-item-name>
                    <thy-menu-item-action (click)="click()" [thyActionMenu]="action">
                        <thy-icon thyIconName="more"></thy-icon>
                    </thy-menu-item-action>
                    <thy-menu-item-action (click)="click()" [thyActionMenu]="action" [thyStopPropagation]="true" class="thyStopPropagation">
                        <thy-icon thyIconName="more"></thy-icon>
                    </thy-menu-item-action>
                    <thy-menu-item-action
                        (click)="click()"
                        [thyActionMenu]="action"
                        [thyStopPropagation]="false"
                        class="nothyStopPropagation">
                        <thy-icon thyIconName="more"></thy-icon>
                    </thy-menu-item-action>
                </thy-menu-item>
                <ng-template #headerContent>
                    <span class="custom-title">星标</span>
                </ng-template>
            </thy-menu-group>
            <thy-menu-item>
                <thy-menu-item-icon class="hasColorIcon" thyColor="red">
                    <thy-icon thyIconName="settings"></thy-icon>
                </thy-menu-item-icon>
                <thy-menu-item-name [thyOverflowEllipsis]="false" class="thyOverflowEllipsis">配置中心</thy-menu-item-name>
            </thy-menu-item>
            <thy-divider></thy-divider>
        </thy-menu>
        <ng-template #action><div id="actionTemplate" class="actionTemplate">aa</div></ng-template>
    `
})
class ThyDemoMenuComponent {
    @ViewChild(ThyMenuDivider, { static: true }) divider: ThyMenuDivider;
    @ViewChild(ThyMenuGroup, { static: true }) group: ThyMenuGroup;
    @ViewChild(ThyMenuItem, { static: true }) item: ThyMenuItem;
    @ViewChild(ThyMenuItemIcon, { static: true }) icon: ThyMenuItemIcon;
    @ViewChild(ThyMenuItemAction, { static: true }) action: ThyMenuItemAction;
    @ViewChild(ThyMenuItemName, { static: true }) name: ThyMenuItemName;

    theme = 'default';
    collapsible = true;

    click() {}

    toggle(event: any) {}
}

@Component({
    selector: 'thy-menu-test-basic',
    template: `
        <thy-menu [thyTheme]="theme" [thyCollapsed]="collapsed">
            <a id="default-item" thyMenuItem href="javascript:;"> Default Item </a>
            <a id="with-icon-item" thyMenuItem thyIcon="calendar" href="javascript:;"> With Icon Item </a>
            <a thyMenuItem thyIcon="calendar" href="javascript:;">
                <span thyMenuItemName>Configuration</span>
            </a>
            <thy-divider></thy-divider>
            <a thyMenuItem href="javascript:;">
                <span thyMenuItemIcon thyColor="#ff5b57"><thy-icon thyIconName="trash"></thy-icon></span>
                <span thyMenuItemName>Trash</span>
            </a>
        </thy-menu>
    `
})
class ThyMenuTestBasicComponent {
    theme: ThyMenuTheme = undefined;
    collapsed = false;
}

describe('ThyMenu', () => {
    let fixture: ComponentFixture<ThyDemoMenuComponent>;
    let component: ThyDemoMenuComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ThyDemoMenuComponent, ThyMenuTestBasicComponent],
            imports: [ThyMenuModule, BrowserAnimationsModule, ThyDividerModule, ThyPopoverModule, ThyIconModule],
            providers: [bypassSanitizeProvider, ThyPopover]
        }).compileComponents();
        injectDefaultSvgIconSet();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('thy-menu', () => {
        let fixture: ComponentFixture<ThyMenuTestBasicComponent>;
        let component: ThyMenuTestBasicComponent;
        let menuDebugElement: DebugElement;
        let menuElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyMenuTestBasicComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            menuDebugElement = fixture.debugElement.query(By.directive(ThyMenu));
            menuElement = menuDebugElement.nativeElement;
        });

        it('should create thy-menu', () => {
            expect(menuDebugElement).toBeTruthy();
            expect(menuElement).toBeTruthy();
            expect(menuElement.classList.contains('thy-menu')).toBeTruthy();
        });

        it('should set theme loose', () => {
            fixture.debugElement.componentInstance.theme = 'loose';
            fixture.detectChanges();
            const menu = fixture.debugElement.query(By.directive(ThyMenu));
            expect(menu.nativeElement.classList.contains('thy-menu-theme-loose')).toBeTruthy();
        });

        it('should set theme dark', () => {
            fixture.debugElement.componentInstance.theme = 'dark';
            fixture.detectChanges();
            const menu = fixture.debugElement.query(By.directive(ThyMenu));
            expect(menu.nativeElement.classList.contains('thy-menu-theme-dark')).toBeTruthy();
        });

        it('should set collapsed success', () => {
            fixture.debugElement.componentInstance.collapsed = true;
            fixture.detectChanges();
            const menu = fixture.debugElement.query(By.directive(ThyMenu));
            expect(menu.nativeElement.classList.contains('thy-menu-collapsed')).toBeTruthy();
        });

        it('should get default item', () => {
            const defaultItem = fixture.debugElement.query(By.css('#default-item'));
            expect(defaultItem).toBeTruthy();
            expect(defaultItem.nativeElement.classList.contains('thy-menu-item'));
            expect(defaultItem.nativeElement.textContent).toContain('Default Item');
        });

        it('should get item with icon', () => {
            const iconItem = fixture.debugElement.query(By.css('#with-icon-item'));
            expect(iconItem).toBeTruthy();
            const iconItemElement: HTMLElement = iconItem.nativeElement;
            expect(iconItemElement.classList.contains('thy-menu-item'));
            expect(iconItemElement.textContent).toContain('With Icon Item');
            expect(iconItemElement.children[0].classList.contains('thy-icon'));
            expect(iconItemElement.children[0].classList.contains('thy-menu-item-icon'));
            expect(iconItemElement.children[0].classList.contains('thy-icon-calendar'));
        });
    });

    // describe('thy-menu-divider', () => {
    //     let divider: DebugElement;

    //     beforeEach(() => {
    //         divider = fixture.debugElement.query(By.directive(ThyMenuDividerComponent));
    //     });

    //     it('should create thy-menu-divider', () => {
    //         expect(divider.componentInstance).toBeTruthy();
    //         expect(divider.componentInstance === component.divider).toBeTruthy();
    //     });

    //     it('should have class thy-menu-divider', () => {
    //         expect(divider.nativeElement.classList.contains('thy-menu-divider')).toBeTruthy();
    //     });
    // });

    describe('thy-menu-group', () => {
        let group: DebugElement;

        beforeEach(() => {
            group = fixture.debugElement.query(By.directive(ThyMenuGroup));
        });

        it('should create thy-menu-group', () => {
            expect(group.componentInstance).toBeTruthy();
            expect(group.componentInstance === component.group).toBeTruthy();
        });

        it('should have class thy-menu-group', () => {
            expect(group.nativeElement.classList.contains('thy-menu-group')).toBeTruthy();
        });

        it('should collapsible worked', () => {
            fixture.debugElement.componentInstance.theme = 'loose';
            fixture.debugElement.componentInstance.collapsible = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.thy-menu-group-arrow'))).toBeFalsy();
            const group = fixture.debugElement.query(By.directive(ThyMenuGroup));
            const groupHeader = group.nativeElement.querySelector('.thy-menu-group-header');
            groupHeader.click();
            fixture.detectChanges();
            expect(group.componentInstance.isCollapsed).toBe(false);
        });

        it('should toggle worked', () => {
            fixture.detectChanges();
            const group = fixture.debugElement.query(By.directive(ThyMenuGroup));
            const groupHeader = group.nativeElement.querySelector('.thy-menu-group-header');
            const spy = spyOn(fixture.componentInstance, 'toggle');
            groupHeader.click();
            fixture.detectChanges();
            expect(group.componentInstance.isCollapsed).toBe(true);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should headerContent worked', () => {
            fixture.debugElement.componentInstance.theme = 'loose';
            fixture.detectChanges();
            const group = fixture.debugElement.query(By.directive(ThyMenuGroup));
            expect(group.nativeElement.querySelectorAll('.custom-title')).toBeTruthy();
        });
    });

    describe('thy-menu-item', () => {
        let item: DebugElement;

        beforeEach(() => {
            item = fixture.debugElement.query(By.directive(ThyMenuItem));
        });

        it('should create thy-menu-item', () => {
            expect(item.componentInstance).toBeTruthy();
            expect(item.componentInstance === component.item).toBeTruthy();
        });

        it('should has class thy-menu-item', () => {
            expect(item.nativeElement.classList.contains('thy-menu-item')).toBeTruthy();
        });

        it('should had class thy-menu-item-content', () => {
            const content = fixture.debugElement.query(By.css('.thy-menu-item-content'));
            expect(content).toBeTruthy();
        });
    });

    describe('thy-menu-item-name', () => {
        let name: DebugElement;

        beforeEach(() => {
            name = fixture.debugElement.query(By.directive(ThyMenuItemName));
        });

        it('should create thy-menu-item-name', () => {
            expect(name.componentInstance).toBeTruthy();
            expect(name.componentInstance === component.name).toBeTruthy();
        });

        it('should have class thy-menu-item-name', () => {
            expect(name.nativeElement.classList.contains('thy-menu-item-name')).toBeTruthy();
        });

        it('should have default class thy-menu-item-name-ellipsis when [thyOverflowEllipsis] is empty', () => {
            expect(name.nativeElement.classList.contains('thy-menu-item-name-ellipsis')).toBeTruthy();
        });

        it('should not have class thy-menu-item-name-ellipsis when [thyOverflowEllipsis] is false', () => {
            const thyOverflowEllipsis = fixture.debugElement.query(By.css('.thyOverflowEllipsis'));
            expect(thyOverflowEllipsis.nativeElement.classList.contains('thy-menu-item-name-ellipsis')).toBeFalsy();
        });
    });

    describe('thy-menu-item-icon', () => {
        it('should create thy-menu-item-icon', () => {
            const icon = fixture.debugElement.query(By.directive(ThyMenuItemIcon));
            expect(icon.componentInstance).toBeTruthy();
            expect(icon.componentInstance === component.icon).toBeTruthy();
        });

        it('should have class thy-menu-item-icon', () => {
            const icon = fixture.debugElement.query(By.directive(ThyMenuItemIcon));
            expect(icon.nativeElement.classList.contains('thy-menu-item-icon')).toBeTruthy();
        });

        it('should not have color when [thyColor] is empty', () => {
            const icon = fixture.debugElement.query(By.directive(ThyMenuItemIcon));
            expect(icon.nativeElement.style.color === '').toBeTruthy();
        });

        it('should display correct color when [thyColor] has value', () => {
            const icon = fixture.debugElement.query(By.css('.hasColorIcon'));
            expect(icon.nativeElement.style.color === 'red').toBeTruthy();
        });
    });

    describe('thy-menu-item-action', () => {
        let action: DebugElement;
        beforeEach(() => {
            action = fixture.debugElement.query(By.directive(ThyMenuItemAction));
        });

        it('should create thy-menu-item-action', () => {
            expect(action.componentInstance).toBeTruthy();
            expect(action.componentInstance === component.action).toBeTruthy();
        });

        it('should have class thy-menu-item-action', () => {
            expect(action.nativeElement.classList.contains('thy-menu-item-action')).toBeTruthy();
        });

        // it(`should not call click event when [thyStopPropagation] is empty`, () => {
        //     const spy = (fixture.componentInstance.click = jasmine.createSpy(`action`));
        //     let event: Event;
        //     spy.and.callFake(($event: Event) => {
        //         event = $event;
        //     });

        //     expect(spy).not.toHaveBeenCalled();
        //     expect(event).toBeFalsy();

        //     action.nativeElement.click();
        //     fixture.detectChanges();

        //     expect(spy).not.toHaveBeenCalled();
        //     expect(event).toBeFalsy();
        // });

        it(`should not call click event and open template #action when [thyStopPropagation] is true and [thyActionMenu] has value`, () => {
            const actionTemplate = fixture.debugElement.query(By.css('.actionTemplate'));

            expect(actionTemplate).toBeNull();

            action.nativeElement.click();
            fixture.detectChanges();
            const popBox = document.querySelector('.actionTemplate');
            expect(popBox).not.toBeNull();
        });

        it(`should thy-menu-item has action-active class and thy-menu-item-action has active class when click thyActionMenu`, fakeAsync(() => {
            const thyMenuItem = fixture.debugElement.query(By.css('.thy-menu-item'));

            expect(thyMenuItem.nativeElement.classList.contains('action-active')).toBeFalsy();
            expect(action.nativeElement.classList.contains('active')).toBeFalsy();

            action.nativeElement.click();
            fixture.detectChanges();

            expect(thyMenuItem.nativeElement.classList.contains('action-active')).toBeTruthy();
            expect(action.nativeElement.classList.contains('active')).toBeTruthy();
        }));
    });
});

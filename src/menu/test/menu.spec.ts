import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing/thy-icon';

import { Component, DebugElement, NgModule, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThyIconModule } from '../../icon/icon.module';
import { ThyPopover, ThyPopoverModule } from '../../popover';
import { ThyMenuDividerComponent } from '../divider/menu-divider.component';
import { ThyMenuGroupComponent } from '../group/menu-group.component';
import { ThyMenuItemActionComponent } from '../item/action/menu-item-action.component';
import { ThyMenuItemIconComponent } from '../item/icon/menu-item-icon.component';
import { ThyMenuItemComponent } from '../item/menu-item.component';
import { ThyMenuItemNameComponent } from '../item/name/menu-item-name.component';
import { ThyMenuComponent } from '../menu.component';
import { ThyMenuModule } from '../menu.module';

@Component({
    selector: 'thy-demo-thy-menu',
    template: `
        <thy-menu>
            <thy-menu-group thyTitle="工作" [thyExpand]="true" [thyShowAction]="true" [thyActionIcon]="'user-group-fill'">
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
                        class="nothyStopPropagation"
                    >
                        <thy-icon thyIconName="more"></thy-icon>
                    </thy-menu-item-action>
                </thy-menu-item>
            </thy-menu-group>
            <thy-menu-item>
                <thy-menu-item-icon class="hasColorIcon" thyColor="red">
                    <thy-icon thyIconName="settings"></thy-icon>
                </thy-menu-item-icon>
                <thy-menu-item-name [thyOverflowEllipsis]="false" class="thyOverflowEllipsis">配置中心</thy-menu-item-name>
            </thy-menu-item>
            <thy-menu-divider></thy-menu-divider>
        </thy-menu>
        <ng-template #action><div id="actionTemplate" class="actionTemplate">aa</div></ng-template>
    `
})
class ThyDemoMenuComponent {
    @ViewChild(ThyMenuDividerComponent, { static: true }) divider: ThyMenuDividerComponent;
    @ViewChild(ThyMenuGroupComponent, { static: true }) group: ThyMenuGroupComponent;
    @ViewChild(ThyMenuItemComponent, { static: true }) item: ThyMenuItemComponent;
    @ViewChild(ThyMenuItemIconComponent, { static: true }) icon: ThyMenuItemIconComponent;
    @ViewChild(ThyMenuItemActionComponent, { static: true }) action: ThyMenuItemActionComponent;
    @ViewChild(ThyMenuItemNameComponent, { static: true }) name: ThyMenuItemNameComponent;

    click() {}
}

@NgModule({
    imports: [ThyMenuModule, BrowserAnimationsModule, ThyPopoverModule, ThyIconModule],
    declarations: [ThyDemoMenuComponent],
    exports: [ThyDemoMenuComponent],
    providers: [ThyPopover]
})
export class ThyMenuTestModule {}

describe('ThyMenu', () => {
    let fixture: ComponentFixture<ThyDemoMenuComponent>;
    let component: ThyDemoMenuComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyMenuModule, ThyMenuTestModule],
            providers: [bypassSanitizeProvider]
        }).compileComponents();
        injectDefaultSvgIconSet();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('thy-menu', () => {
        it('should create thy-menu', () => {
            expect(component).toBeTruthy();
        });

        it('should have class thy-menu', () => {
            const menu = fixture.debugElement.query(By.directive(ThyMenuComponent));
            expect(menu.nativeElement.classList.contains('thy-menu')).toBeTruthy();
        });
    });

    describe('thy-menu-divider', () => {
        let divider: DebugElement;

        beforeEach(() => {
            divider = fixture.debugElement.query(By.directive(ThyMenuDividerComponent));
        });

        it('should create thy-menu-divider', () => {
            expect(divider.componentInstance).toBeTruthy();
            expect(divider.componentInstance === component.divider).toBeTruthy();
        });

        it('should have class thy-menu-divider', () => {
            expect(divider.nativeElement.classList.contains('thy-menu-divider')).toBeTruthy();
        });
    });

    describe('thy-menu-group', () => {
        let group: DebugElement;

        beforeEach(() => {
            group = fixture.debugElement.query(By.directive(ThyMenuGroupComponent));
        });

        it('should create thy-menu-group', () => {
            expect(group.componentInstance).toBeTruthy();
            expect(group.componentInstance === component.group).toBeTruthy();
        });

        it('should have class thy-menu-group', () => {
            expect(group.nativeElement.classList.contains('thy-menu-group')).toBeTruthy();
        });
    });

    describe('thy-menu-item', () => {
        let item: DebugElement;

        beforeEach(() => {
            item = fixture.debugElement.query(By.directive(ThyMenuItemComponent));
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
            name = fixture.debugElement.query(By.directive(ThyMenuItemNameComponent));
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
            const icon = fixture.debugElement.query(By.directive(ThyMenuItemIconComponent));
            expect(icon.componentInstance).toBeTruthy();
            expect(icon.componentInstance === component.icon).toBeTruthy();
        });

        it('should have class thy-menu-item-icon', () => {
            const icon = fixture.debugElement.query(By.directive(ThyMenuItemIconComponent));
            expect(icon.nativeElement.classList.contains('thy-menu-item-icon')).toBeTruthy();
        });

        it('should not have color when [thyColor] is empty', () => {
            const icon = fixture.debugElement.query(By.directive(ThyMenuItemIconComponent));
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
            action = fixture.debugElement.query(By.directive(ThyMenuItemActionComponent));
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
    });
});

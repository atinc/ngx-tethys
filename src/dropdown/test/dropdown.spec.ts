import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { ThyDropdownDirective, ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyOverlayTrigger } from 'ngx-tethys/core';
import { getElementOffset } from 'ngx-tethys/util';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyDropdownMenuComponent } from '../dropdown-menu.component';
import { ThyDropdownMenuItemType } from '../dropdown-menu-item.directive';
import { ThyDropdownSubmenuDirection } from '../dropdown-submenu.component';

@Component({
    selector: 'thy-dropdown-test',
    template: `
        <button [thyDropdown]="menu" [thyTrigger]="trigger" thyButton="primary">Dropdown</button>
        <thy-dropdown-menu #menu>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Menu Item1</span>
            </a>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Menu Item2</span>
            </a>
        </thy-dropdown-menu>
    `
})
class DropdownBasicTestComponent {
    trigger: ThyOverlayTrigger = 'click';
}

describe('basic dropdown', () => {
    let fixture: ComponentFixture<DropdownBasicTestComponent>;
    let btnElement: HTMLElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let dropdownElement: HTMLElement;
    let dropdown: ThyDropdownDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule],
            declarations: [DropdownBasicTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownBasicTestComponent);
        fixture.detectChanges();
    });

    beforeEach(() => {
        const btnDebugElement = fixture.debugElement.query(By.css('button'));
        btnElement = btnDebugElement.nativeElement;
        const dropdownDebugElement = fixture.debugElement.query(By.directive(ThyDropdownDirective));
        dropdownElement = dropdownDebugElement.nativeElement;
        dropdown = dropdownDebugElement.injector.get(ThyDropdownDirective);
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    function assertOverlayHide() {
        expect(overlayContainerElement.querySelector(`.thy-dropdown-pane`)).toBeFalsy();
    }

    function assertOverlayShow() {
        expect(overlayContainerElement.querySelector(`.thy-dropdown-pane`)).toBeTruthy();
    }

    it('should create thy-dropdown', () => {
        expect(dropdownElement).toBeTruthy();
        expect(dropdown).toBeTruthy();
        expect(dropdownElement.classList).toContain('thy-dropdown');
    });

    it('should open dropdown menu', fakeAsync(() => {
        btnElement.click();
        fixture.detectChanges();
        tick();
        expect(overlayContainerElement).toBeTruthy();

        const overlayPaneElement: HTMLElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPaneElement.classList.contains('thy-dropdown-pane')).toBeTruthy();
        const dropdownMenuElement: HTMLElement = overlayContainerElement.querySelector('.thy-dropdown-menu');
        expect(dropdownMenuElement).toBeTruthy();

        expect(dropdownMenuElement.textContent).toContain('Menu Item1');
        expect(dropdownMenuElement.textContent).toContain('Menu Item2');
        flush();

        dropdown.hide();
        tick();
        fixture.detectChanges();
        tick();
        assertOverlayHide();
        flush();
    }));

    it('should clear showTimeout when invoke hide', fakeAsync(() => {
        dropdown.show(200);
        assertOverlayHide();
        dropdown.hide();
        flush();
        assertOverlayHide();
    }));

    it('should clear hideTimeout when invoke show', fakeAsync(() => {
        dropdown.hide(200);
        assertOverlayHide();
        dropdown.show();
        assertOverlayHide();
        tick();
        assertOverlayShow();
    }));

    it('should has backdrop when trigger is click or focus', fakeAsync(() => {
        [
            {
                trigger: 'click',
                hasBackdrop: true
            },
            {
                trigger: 'focus',
                hasBackdrop: true
            },
            {
                trigger: 'hover',
                hasBackdrop: false
            }
        ].forEach((item: { trigger: ThyOverlayTrigger; hasBackdrop: boolean }) => {
            fixture.componentInstance.trigger = item.trigger;
            fixture.detectChanges();
            dropdown.show();
            tick();
            fixture.detectChanges();
            expect(!!overlayContainerElement.querySelector('.thy-popover-backdrop')).toBe(item.hasBackdrop);
            dropdown.hide();
            tick();
            fixture.detectChanges();
            flush();
        });
    }));

    it('should open once when overlayRef has attached', fakeAsync(() => {
        dropdown.show();
        tick();
        assertOverlayShow();
        dropdown.show();
        tick();
        assertOverlayShow();
    }));
});

@Component({
    selector: 'thy-dropdown-test',
    template: `
        <button thyDropdown [thyDropdownMenu]="menu">Dropdown</button>
        <div #invalidDiv></div>
        <thy-dropdown-menu #dropdownMenu>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Menu Item1</span>
            </a>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Menu Item2</span>
            </a>
        </thy-dropdown-menu>
    `
})
class DropdownMenuInputTestComponent {
    @ViewChild('invalidDiv', { static: true }) invalidDiv: HTMLElement;
    @ViewChild('dropdownMenu', { static: true }) dropdownMenu: ThyDropdownMenuComponent;
    menu: HTMLElement | ThyDropdownMenuComponent | string = null;
}

describe('invalid dropdown', () => {
    let fixture: ComponentFixture<DropdownMenuInputTestComponent>;
    let dropdown: ThyDropdownDirective;
    let overlayContainer: OverlayContainer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule],
            declarations: [DropdownMenuInputTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownMenuInputTestComponent);
        fixture.detectChanges();
    });

    beforeEach(() => {
        const dropdownDebugElement = fixture.debugElement.query(By.directive(ThyDropdownDirective));
        dropdown = dropdownDebugElement.injector.get(ThyDropdownDirective);
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should throw error when menu is null', fakeAsync(() => {
        expect(() => {
            dropdown.show();
            tick();
        }).toThrowError('thyDropdownMenu is required');
    }));

    it('should throw error when menu is a div', fakeAsync(() => {
        fixture.componentInstance.menu = fixture.componentInstance.invalidDiv;
        fixture.detectChanges();
        expect(() => {
            dropdown.show();
            tick();
        }).toThrowError('thyDropdownMenu is required');
    }));

    it('should not throw error when menu is dropdownMenu', fakeAsync(() => {
        fixture.componentInstance.menu = fixture.componentInstance.dropdownMenu;
        fixture.detectChanges();
        expect(() => {
            dropdown.show();
            tick();
        }).not.toThrowError('thyDropdownMenu is required');
    }));
});

@Component({
    selector: 'thy-dropdown-menu-test',
    template: `
        <button thyDropdown [thyDropdownMenu]="menu">Dropdown</button>
        <thy-dropdown-menu [thyWidth]="width" #menu>
            <thy-dropdown-menu-divider></thy-dropdown-menu-divider>
            <a thyDropdownMenuItem href="javascript:;">
                <thy-icon thyDropdownMenuItemIcon thyIconName="sort"></thy-icon>
                <span thyDropdownMenuItemName>Sort</span>
                <span thyDropdownMenuItemMeta>(Default Sort)</span>
                <div thyDropdownMenuItemDesc>
                    By default, you can drag and drop work item; other sorting can only be displayed and cannot be dragged
                </div>
                <thy-icon thyDropdownMenuItemExtendIcon thyIconName="sort"></thy-icon>
            </a>
            <thy-dropdown-menu-group thyTitle="Group1">
                <a thyDropdownMenuItem href="javascript:;">
                    <thy-icon thyDropdownMenuItemIcon thyIconName="plus"></thy-icon>
                    <span thyDropdownMenuItemName>New</span>
                </a>
            </thy-dropdown-menu-group>
            <a
                thyDropdownMenuItem
                href="javascript:;"
                id="menu-item"
                [thyDropdownMenuItemActive]="active"
                [thyType]="type"
                [thyDisabled]="disabled"
            >
                <thy-icon thyDropdownMenuItemIcon thyIconName="plus"></thy-icon>
                <span thyDropdownMenuItemName>New</span>
            </a>
        </thy-dropdown-menu>
    `
})
class DropdownMenuTestComponent {
    @ViewChild('dropdownMenu', { static: true }) dropdownMenu: ThyDropdownMenuComponent;

    width: number;

    type: ThyDropdownMenuItemType;

    disabled: boolean;

    active: boolean;
}

describe('dropdown menu', () => {
    let fixture: ComponentFixture<DropdownMenuTestComponent>;
    let dropdown: ThyDropdownDirective;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule, ThyIconModule],
            declarations: [DropdownMenuTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownMenuTestComponent);
        fixture.detectChanges();
    });

    beforeEach(() => {
        const dropdownDebugElement = fixture.debugElement.query(By.directive(ThyDropdownDirective));
        dropdown = dropdownDebugElement.injector.get(ThyDropdownDirective);
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    function getDropdownMenu(): HTMLElement {
        return overlayContainerElement.querySelector(`.thy-dropdown-menu`);
    }

    it('should create menu', fakeAsync(() => {
        dropdown.show();
        tick();
        const dropdownMenuElement = getDropdownMenu();
        expect(dropdownMenuElement).toBeTruthy();

        const dropdownMenuDivider = dropdownMenuElement.querySelector('thy-dropdown-menu-divider');
        expect(dropdownMenuDivider).toBeTruthy();
        expect(dropdownMenuDivider.classList.contains('dropdown-menu-divider')).toBeTruthy();

        const dropdownMenuItem = dropdownMenuElement.querySelector('.dropdown-menu-item');
        expect(dropdownMenuItem).toBeTruthy();
        expect(dropdownMenuItem.children[0].classList.contains('icon')).toBeTruthy();
        expect(dropdownMenuItem.children[1].classList.contains('name')).toBeTruthy();
        expect(dropdownMenuItem.children[2].classList.contains('meta')).toBeTruthy();
        expect(dropdownMenuItem.children[3].classList.contains('desc')).toBeTruthy();
        expect(dropdownMenuItem.children[4].classList.contains('extend-icon')).toBeTruthy();
    }));

    it('should set menu width', fakeAsync(() => {
        fixture.componentInstance.width = 100;
        fixture.detectChanges();
        dropdown.show();
        tick();
        fixture.detectChanges();
        const dropdownMenuElement = getDropdownMenu();
        expect(dropdownMenuElement.style.width).toEqual('100px');
    }));

    it('should create menu group', fakeAsync(() => {
        dropdown.show();
        tick();
        const dropdownMenuElement = getDropdownMenu();
        const groupElement = dropdownMenuElement.querySelector('thy-dropdown-menu-group');
        expect(groupElement).toBeTruthy();
        expect(groupElement.classList.contains('dropdown-menu-group')).toBeTruthy();
        const title = groupElement.querySelector('.dropdown-menu-group-title');
        expect(title).toBeTruthy();
        expect(title.textContent).toEqual('Group1');
    }));

    it('should set menu item type', fakeAsync(() => {
        const types: ThyDropdownMenuItemType[] = ['danger', 'success'];
        types.forEach(type => {
            fixture.componentInstance.type = type;
            fixture.detectChanges();
            dropdown.show();
            tick();
            fixture.detectChanges();
            const dropdownMenuElement = getDropdownMenu();
            const menuItem = dropdownMenuElement.querySelector('#menu-item');
            expect(menuItem.classList.contains(`dropdown-menu-item--${type}`)).toBeTruthy();
        });
    }));

    it('should set menu disabled', fakeAsync(() => {
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();
        dropdown.show();
        tick();
        fixture.detectChanges();
        const dropdownMenuElement = getDropdownMenu();
        const menuItem: HTMLElement = dropdownMenuElement.querySelector('#menu-item');
        expect(menuItem.classList.contains('dropdown-menu-item--disabled')).toBeTruthy();

        menuItem.click();
    }));

    it('should set menu active', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        fixture.detectChanges();
        const dropdownMenuElement = getDropdownMenu();
        const menuItem: HTMLElement = dropdownMenuElement.querySelector('#menu-item');
        expect(menuItem.classList.contains('active')).toBeFalsy();
        fixture.componentInstance.active = true;
        fixture.detectChanges();
        expect(menuItem.classList.contains('active')).toBeTruthy();
    }));
});

@Component({
    selector: 'thy-dropdown-submenu-test',
    template: `
        <button thyDropdown [thyDropdownMenu]="menu">Dropdown</button>
        <thy-dropdown-menu #menu>
            <a thyDropdownMenuItem href="javascript:;">
                Default submenu
                <thy-dropdown-submenu id="submenu-default">
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu1</span>
                    </a>
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu2</span>
                    </a>
                </thy-dropdown-submenu>
            </a>
            <a thyDropdownMenuItem href="javascript:;">
                <thy-dropdown-submenu id="submenu-left" thyDirection="left">
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu1</span>
                    </a>
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu2</span>
                    </a>
                </thy-dropdown-submenu>
            </a>
            <a thyDropdownMenuItem href="javascript:;">
                <thy-dropdown-submenu id="submenu-right" thyDirection="right">
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu1</span>
                    </a>
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu2</span>
                    </a>
                </thy-dropdown-submenu>
            </a>
            <a thyDropdownMenuItem href="javascript:;">
                <thy-dropdown-submenu id="submenu-auto" thyDirection="auto">
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu1</span>
                    </a>
                    <a thyDropdownMenuItem href="javascript:;">
                        <span thyDropdownMenuItemName>Submenu2</span>
                    </a>
                </thy-dropdown-submenu>
            </a>
        </thy-dropdown-menu>
    `
})
class DropdownSubmenuTestComponent {
    @ViewChild('dropdownMenu', { static: true }) dropdownMenu: ThyDropdownMenuComponent;
}

describe('dropdown submenu', () => {
    let fixture: ComponentFixture<DropdownSubmenuTestComponent>;
    let dropdown: ThyDropdownDirective;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule, ThyIconModule],
            declarations: [DropdownSubmenuTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownSubmenuTestComponent);
        fixture.detectChanges();
    });

    beforeEach(() => {
        const dropdownDebugElement = fixture.debugElement.query(By.directive(ThyDropdownDirective));
        dropdown = dropdownDebugElement.injector.get(ThyDropdownDirective);
    });

    beforeEach(inject([OverlayContainer], (_overlayContainer: OverlayContainer) => {
        overlayContainer = _overlayContainer;
        overlayContainerElement = _overlayContainer.getContainerElement();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    function getDropdownMenu(): HTMLElement {
        return overlayContainerElement.querySelector(`.thy-dropdown-menu`);
    }

    it('should create submenu', fakeAsync(() => {
        dropdown.show();
        tick();
        fixture.detectChanges();
        const dropdownMenu = getDropdownMenu();
        const submenu = dropdownMenu.querySelector('#submenu-default');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-right')).toBeTruthy();
        dropdown.hide();
        flush();
    }));

    it('should set direction left', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        const submenu = dropdownMenu.querySelector('#submenu-left');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains(`dropdown-submenu-left`)).toBeTruthy();

        dropdown.hide();
        tick();
        flush();
    }));

    it('should set direction right', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        const submenu = dropdownMenu.querySelector('#submenu-right');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains(`dropdown-submenu-right`)).toBeTruthy();

        dropdown.hide();
        tick();
        flush();
    }));

    it('should set right when direction is auto', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = '10px';
        dropdownMenu.style.left = '0px';
        dropdownMenu.style.width = '100px';
        const submenu = dropdownMenu.querySelector('#submenu-auto');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();

        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeTruthy();

        dispatchMouseEvent(submenu.parentElement, 'mouseenter');
        tick(200);
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeFalsy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-right')).toBeTruthy();
        dropdown.hide();
        tick();
        flush();
    }));

    it('should set left when direction is auto', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = '200px';
        dropdownMenu.style.right = '20px';

        const submenu = dropdownMenu.querySelector('#submenu-auto');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();

        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeTruthy();

        dispatchMouseEvent(submenu.parentElement, 'mouseenter');
        tick(200);
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeFalsy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-left')).toBeTruthy();
        dropdown.hide();
        tick();
        flush();
    }));
});

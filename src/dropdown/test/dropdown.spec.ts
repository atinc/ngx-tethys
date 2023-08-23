import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ComponentTypeOrTemplateRef, ThyOverlayTrigger, ThyPlacement } from 'ngx-tethys/core';
import { THY_DROPDOWN_DEFAULT_WIDTH, ThyDropdownDirective, ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyPopoverConfig } from 'ngx-tethys/popover';
import { dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyDropdownMenuItemType } from '../dropdown-menu-item.directive';
import { ThyDropdownAbstractMenu, ThyDropdownMenuComponent } from '../dropdown-menu.component';

@Component({
    selector: 'thy-dropdown-test',
    template: `
        <button [thyDropdown]="menu" [thyTrigger]="trigger" (thyActiveChange)="activeChange($event)" thyButton="primary">Dropdown</button>
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

    active: boolean;

    activeChange(active: boolean) {
        this.active = active;
    }
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
        expect(overlayPaneElement).toBeTruthy();
        expect(overlayPaneElement.style.width).toEqual('240px');
        expect(overlayPaneElement.classList.contains('thy-dropdown-pane')).toBeTruthy();
        tick(100);
        fixture.detectChanges();
        const dropdownMenuElement: HTMLElement = overlayContainerElement.querySelector('.thy-dropdown-menu');
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.textContent).toContain('Menu Item1');
        expect(dropdownMenuElement.textContent).toContain('Menu Item2');
        flush();

        dropdown.hide();
        tick(100);
        fixture.detectChanges();
        tick(100);
        assertOverlayHide();
        flush();
    }));

    it('should invoke active change for open and close dropdown menu', fakeAsync(() => {
        expect(fixture.componentInstance.active).toBe(undefined);
        btnElement.click();
        // delay open
        tick();
        fixture.detectChanges();
        tick();
        expect(fixture.componentInstance.active).toBe(true);
        flush();
        dropdown.hide();
        // delay hide
        tick(100);
        fixture.detectChanges();
        tick(100);
        expect(fixture.componentInstance.active).toBe(false);
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

    it('should always have no backdrop', fakeAsync(() => {
        [
            {
                trigger: 'click',
                hasBackdrop: false
            },
            {
                trigger: 'focus',
                hasBackdrop: false
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
                [thyDisabled]="disabled">
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
        fixture.detectChanges();

        const dropdownMenuElement = getDropdownMenu();
        tick();
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
        tick();
        expect(dropdownMenuElement.style.width).toEqual('100px');
    }));

    it('should create menu group', fakeAsync(() => {
        dropdown.show();
        tick();
        fixture.detectChanges();
        const dropdownMenuElement = getDropdownMenu();
        tick();
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
        tick();
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
        tick();
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
        tick();
        fixture.detectChanges();
        const submenu = dropdownMenu.querySelector('#submenu-left');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains(`dropdown-submenu-left`)).toBeTruthy();

        dropdown.hide();
        tick();
        flush();
    }));

    it('should set direction leftBottom when direction is left', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = '2000px';
        dropdownMenu.style.right = '20px';
        dropdownMenu.style.height = '200px';
        tick();
        fixture.detectChanges();
        const submenu = dropdownMenu.querySelector('#submenu-left');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains(`dropdown-submenu-left`)).toBeTruthy();

        dispatchMouseEvent(submenu.parentElement, 'mouseenter');
        tick(200);
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeFalsy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-leftBottom')).toBeTruthy();

        dropdown.hide();
        tick();
        flush();
    }));

    it('should set direction right', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        tick();
        fixture.detectChanges();
        const submenu = dropdownMenu.querySelector('#submenu-right');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains(`dropdown-submenu-right`)).toBeTruthy();

        dropdown.hide();
        tick();
        flush();
    }));

    it('should set direction rightBottom when direction is right', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = '2000px';
        dropdownMenu.style.left = '0px';
        dropdownMenu.style.width = '100px';
        dropdownMenu.style.height = '200px';
        tick();
        fixture.detectChanges();
        const submenu = dropdownMenu.querySelector('#submenu-right');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains(`dropdown-submenu-right`)).toBeTruthy();

        dispatchMouseEvent(submenu.parentElement, 'mouseenter');
        tick(200);

        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeFalsy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-rightBottom')).toBeTruthy();

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
        tick();
        fixture.detectChanges();
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
        dropdownMenu.style.left = '800px';
        tick(100);
        fixture.detectChanges();
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

    it('should set leftBottom when direction is auto', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = '2000px';
        dropdownMenu.style.right = '20px';
        dropdownMenu.style.left = '800px';
        dropdownMenu.style.height = '200px';
        tick();
        fixture.detectChanges();
        const submenu = dropdownMenu.querySelector('#submenu-auto');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();

        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeTruthy();

        dispatchMouseEvent(submenu.parentElement, 'mouseenter');
        tick(200);
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeFalsy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-leftBottom')).toBeTruthy();
        dropdown.hide();
        tick();
        flush();
    }));

    it('should set rightBottom when direction is auto', fakeAsync(() => {
        fixture.detectChanges();
        dropdown.show();
        tick();
        const dropdownMenu = getDropdownMenu();
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = '2000px';
        dropdownMenu.style.left = '0px';
        dropdownMenu.style.width = '100px';
        dropdownMenu.style.height = '200px';
        tick(150);
        fixture.detectChanges();
        const submenu = dropdownMenu.querySelector('#submenu-auto');
        expect(submenu.classList.contains('dropdown-submenu')).toBeTruthy();

        expect(submenu.parentElement.classList.contains('dropdown-menu-item')).toBeTruthy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeTruthy();

        dispatchMouseEvent(submenu.parentElement, 'mouseenter');
        tick(200);
        expect(submenu.parentElement.classList.contains('dropdown-submenu-auto')).toBeFalsy();
        expect(submenu.parentElement.classList.contains('dropdown-submenu-rightBottom')).toBeTruthy();
        dropdown.hide();
        tick();
        flush();
    }));
});

@Component({
    selector: 'thy-dropdown-custom-menu',
    template: `
        <a thyDropdownMenuItem href="javascript:;">
            <span>Custom Menu Item1</span>
        </a>
        <a thyDropdownMenuItem href="javascript:;">
            <span>Custom Menu Item2</span>
        </a>
    `
})
class DropdownCustomMenuComponent extends ThyDropdownAbstractMenu {}

@Component({
    selector: 'thy-dropdown-component-test',
    template: ` <button [thyDropdown]="menu" thyButton="primary">Dropdown</button> `
})
class DropdownComponentTestComponent {
    menu = DropdownCustomMenuComponent;
}

describe('dropdown-component', () => {
    let fixture: ComponentFixture<DropdownComponentTestComponent>;
    let btnElement: HTMLElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let dropdownElement: HTMLElement;
    let dropdown: ThyDropdownDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule],
            declarations: [DropdownComponentTestComponent, DropdownCustomMenuComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownComponentTestComponent);
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

    it('should open component menu', fakeAsync(() => {
        dropdownElement.click();
        tick(200);
        fixture.detectChanges();
        const customMenu = overlayContainerElement.querySelector('thy-dropdown-custom-menu');
        tick();
        expect(customMenu).toBeTruthy();
        expect(customMenu.classList.contains('thy-dropdown-menu')).toBeTruthy();
        expect(customMenu.textContent).toContain('Custom Menu Item1');
        expect(customMenu.textContent).toContain('Custom Menu Item2');
    }));
});

@Component({
    selector: 'thy-dropdown-options-test',
    template: `
        <button
            [thyDropdown]="menu"
            [thyTrigger]="trigger"
            thyButton="primary"
            [thyPopoverOptions]="popoverOptions"
            [thyPlacement]="placement">
            Dropdown
        </button>
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
class DropdownOptionsTestComponent {
    trigger: ThyOverlayTrigger = 'click';
    popoverOptions: Pick<ThyPopoverConfig, 'width' | 'height'> = {};
    placement: ThyPlacement = 'bottomLeft';
}

describe('dropdown options', () => {
    let fixture: ComponentFixture<DropdownOptionsTestComponent>;
    let btnElement: HTMLElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let dropdownElement: HTMLElement;
    let dropdown: ThyDropdownDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule],
            declarations: [DropdownOptionsTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownOptionsTestComponent);
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

    it('should modify style when popoverOptions has changed', fakeAsync(() => {
        fixture.componentInstance.placement = 'left';
        fixture.componentInstance.popoverOptions = {
            width: '800px',
            height: '20px'
        };
        fixture.detectChanges();
        btnElement.click();
        fixture.detectChanges();
        tick();
        const boundingBox: HTMLElement = overlayContainerElement.querySelector('.cdk-overlay-connected-position-bounding-box');
        const overlayPaneElement: HTMLElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPaneElement.style.width).toEqual('800px');
        expect(overlayPaneElement.style.height).toEqual('20px');
        expect(boundingBox.style.top).toEqual('0px');
        dropdown.hide();
        tick();
        flush();
    }));

    describe('popover options', () => {
        let calledConfig: ThyPopoverConfig<unknown>;
        beforeEach(() => {
            const popover = dropdown['popover'];
            const originOpen = popover.open.bind(popover);
            spyOn(popover, 'open').and.callFake(
                (componentOrTemplateRef: ComponentTypeOrTemplateRef<unknown>, config?: ThyPopoverConfig<unknown>) => {
                    calledConfig = config;
                    return originOpen(componentOrTemplateRef, config);
                }
            );
        });

        afterEach(() => {
            calledConfig = undefined;
        });

        it('should get default options', () => {
            dropdown.thyPopoverOptions = undefined;
            expect(calledConfig).toBeUndefined();
            dropdown.createOverlay();
            expect(calledConfig).toEqual(
                jasmine.objectContaining({
                    placement: 'bottomLeft',
                    width: THY_DROPDOWN_DEFAULT_WIDTH,
                    height: undefined,
                    insideClosable: true,
                    hasBackdrop: false,
                    offset: 0,
                    originActiveClass: 'thy-dropdown-origin-active'
                })
            );
        });

        it('should set thyActiveClass', () => {
            dropdown.thyActiveClass = 'active';
            expect(calledConfig).toBeUndefined();
            dropdown.createOverlay();
            expect(calledConfig).toEqual(
                jasmine.objectContaining({
                    placement: 'bottomLeft',
                    width: THY_DROPDOWN_DEFAULT_WIDTH,
                    height: undefined,
                    insideClosable: true,
                    hasBackdrop: false,
                    offset: 0,
                    originActiveClass: 'active'
                })
            );
        });

        it('should get custom options', () => {
            dropdown.thyPopoverOptions = {
                height: '100px',
                width: '100px'
            };
            expect(calledConfig).toBeUndefined();
            dropdown.createOverlay();
            expect(calledConfig).toEqual(
                jasmine.objectContaining({
                    height: '100px',
                    width: '100px'
                })
            );
        });

        it('should filter invalid options', () => {
            dropdown.thyPopoverOptions = {
                offset: 1,
                hasBackdrop: false,
                panelClass: 'invalid-panel'
            } as any;

            expect(calledConfig).toBeUndefined();
            dropdown.createOverlay();
            expect(calledConfig).toEqual(
                jasmine.objectContaining({
                    hasBackdrop: false,
                    offset: 0,
                    panelClass: ['thy-dropdown-pane']
                })
            );
        });

        it('should set placement', () => {
            dropdown.thyPlacement = 'bottomRight';

            expect(calledConfig).toBeUndefined();
            dropdown.createOverlay();
            expect(calledConfig).toEqual(
                jasmine.objectContaining({
                    placement: 'bottomRight'
                })
            );
        });

        it('should set insideClosable', () => {
            dropdown.thyMenuInsideClosable = false;

            expect(calledConfig).toBeUndefined();
            dropdown.createOverlay();
            expect(calledConfig).toEqual(
                jasmine.objectContaining({
                    insideClosable: false
                })
            );
        });

        it('should set panel class', () => {
            dropdown.thyPanelClass = 'test-dropdown-panel-class';

            expect(calledConfig).toBeUndefined();
            dropdown.createOverlay();
            expect(calledConfig).toEqual(
                jasmine.objectContaining({
                    panelClass: ['thy-dropdown-pane', 'test-dropdown-panel-class']
                })
            );
        });
    });
});

@Component({
    selector: 'thy-dropdown-immediate-render',
    template: `
        <button [thyDropdown]="menu" [thyTrigger]="trigger" thyButton="primary">Dropdown</button>
        <ng-template #menu>
            <thy-dropdown-menu thyImmediateRender>
                <a class="active" thyDropdownMenuItem href="javascript:;">
                    <span>Menu Item1</span>
                </a>
                <a thyDropdownMenuItem href="javascript:;">
                    <span>Menu Item2</span>
                </a>
            </thy-dropdown-menu>
        </ng-template>
        <thy-dropdown-menu thyImmediateRender>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Menu Item1</span>
            </a>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Menu Item2</span>
            </a>
        </thy-dropdown-menu>
    `
})
class DropdownImmediateRenderTestComponent {
    trigger: ThyOverlayTrigger = 'click';
}

describe('immediate render dropdown', () => {
    let fixture: ComponentFixture<DropdownImmediateRenderTestComponent>;
    let btnElement: HTMLElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let dropdownElement: HTMLElement;
    let dropdown: ThyDropdownDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule, ThyDropdownMenuComponent],
            declarations: [DropdownImmediateRenderTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownImmediateRenderTestComponent);
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

    it('should display dropdown-menu', () => {
        expect(fixture.debugElement.query(By.css('.thy-dropdown-menu'))).toBeTruthy();
    });

    it('should create thy-dropdown', () => {
        expect(dropdownElement).toBeTruthy();
        expect(dropdown).toBeTruthy();
        expect(dropdownElement.classList).toContain('thy-dropdown');
    });

    it('should open dropdown menu', fakeAsync(() => {
        btnElement.click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(overlayContainerElement).toBeTruthy();
        const overlayPaneElement: HTMLElement = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayPaneElement).toBeTruthy();
        expect(overlayPaneElement.style.width).toEqual('240px');
        expect(overlayPaneElement.classList.contains('thy-dropdown-pane')).toBeTruthy();
        const dropdownMenuElement: HTMLElement = overlayContainerElement.querySelector('.thy-dropdown-menu');
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.textContent).toContain('Menu Item1');
        expect(dropdownMenuElement.textContent).toContain('Menu Item2');
        flush();

        dropdown.hide();
        tick(100);
        fixture.detectChanges();
        tick(100);
        assertOverlayHide();
        flush();
    }));
});

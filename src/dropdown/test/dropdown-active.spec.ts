import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDropdownDirective } from '../dropdown.directive';
import { ThyDropdownModule } from '../module';

@Component({
    selector: 'thy-dropdown-active-test',
    template: `
        <div id="wrapper-active" [thyDropdownActive]="activeClass">
            <button [thyDropdown]="menu" [thyDropdownActive]="activeClass" thyButton="primary">Dropdown</button>
        </div>
        <thy-dropdown-menu #menu>
            <a thyDropdownMenuItem href="javascript:;">
                <span>Menu Item1</span>
            </a>
        </thy-dropdown-menu>
    `
})
class DropdownActiveBasicTestComponent {
    activeClass: string | string[] = 'active';
}

describe('dropdown-active', () => {
    let fixture: ComponentFixture<DropdownActiveBasicTestComponent>;
    let btnElement: HTMLElement;
    let dropdownElement: HTMLElement;
    let dropdown: ThyDropdownDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule, NoopAnimationsModule],
            declarations: [DropdownActiveBasicTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownActiveBasicTestComponent);
        fixture.detectChanges();
    });

    beforeEach(() => {
        const btnDebugElement = fixture.debugElement.query(By.css('button'));
        btnElement = btnDebugElement.nativeElement;
        const dropdownDebugElement = fixture.debugElement.query(By.directive(ThyDropdownDirective));
        dropdownElement = dropdownDebugElement.nativeElement;
        dropdown = dropdownDebugElement.injector.get(ThyDropdownDirective);
    });

    it('should set active class for wrapper and origin element when open menu', fakeAsync(() => {
        dropdown.show();
        tick();
        fixture.detectChanges();
        tick(200);
        expect(btnElement.classList.contains('active')).toBeTruthy();
        const wrapperElement = fixture.debugElement.query(By.css('#wrapper-active'));
        expect(wrapperElement.nativeElement.classList.contains('active')).toBeTruthy();
    }));

    it('should set active classes for wrapper and origin element when open menu', fakeAsync(() => {
        fixture.componentInstance.activeClass = ['active1', 'active2'];
        dropdown.show();
        tick();
        fixture.detectChanges();
        tick(200);
        expect(btnElement.classList.contains('active1')).toBeTruthy();
        expect(btnElement.classList.contains('active2')).toBeTruthy();
        const wrapperElement = fixture.debugElement.query(By.css('#wrapper-active'));
        expect(wrapperElement.nativeElement.classList.contains('active1')).toBeTruthy();
        expect(wrapperElement.nativeElement.classList.contains('active2')).toBeTruthy();
    }));
});

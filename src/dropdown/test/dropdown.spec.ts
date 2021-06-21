import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ThyButtonModule, ThyDropdownDirective, ThyDropdownModule } from 'ngx-tethys';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-dropdown-test',
    template: `
        <button thyDropdown thyButton="primary" thyIcon="wtf-upload">下拉菜单</button>
    `
})
class DropdownTestComponent {}

describe('thyDropdown', () => {
    let fixture: ComponentFixture<DropdownTestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule],
            declarations: [DropdownTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DropdownTestComponent);
        fixture.detectChanges();
    });

    it('should should include class thy-dropdown-toggle', () => {
        const dropdown = fixture.debugElement.query(By.directive(ThyDropdownDirective));
        expect(dropdown.nativeElement.classList).toContain('thy-dropdown-toggle');
    });
});

@Component({
    selector: 'thy-dropdown-split-test',
    template: `
        <thy-button-group>
            <button thyButton="primary" class="primary-btn" thyIcon="plus-circle">分列式下拉菜单</button>
            <button thyDropdownSplit thyButton="primary">split按钮</button>
        </thy-button-group>
    `
})
class DropdownSplitTestComponent {}

describe('thyDropdownSplit', () => {
    let fixtureOfDropdownSplit: ComponentFixture<DropdownSplitTestComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyDropdownModule, ThyButtonModule],
            declarations: [DropdownSplitTestComponent]
        }).compileComponents();
        fixtureOfDropdownSplit = TestBed.createComponent(DropdownSplitTestComponent);
        fixtureOfDropdownSplit.detectChanges();
    });

    it('should should include class thy-dropdown-toggle-split', () => {
        const dropdownSplit = fixtureOfDropdownSplit.debugElement.query(By.directive(ThyDropdownDirective));
        expect(dropdownSplit.nativeElement.classList).toContain('thy-dropdown-toggle');
        expect(dropdownSplit.nativeElement.classList).toContain('thy-dropdown-toggle-split');
    });
});

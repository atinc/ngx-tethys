import { POSITION_MAP, ThyPlacement } from 'ngx-tethys/core';
import {
    bypassSanitizeProvider,
    dispatchFakeEvent,
    dispatchKeyboardEvent,
    dispatchMouseEvent,
    injectDefaultSvgIconSet,
    typeInElement
} from 'ngx-tethys/testing';
import { fromEvent, Subject, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Overlay, OverlayContainer, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ThyFormModule } from '../form';
import { ThyOptionModule } from '../shared/option/module';
import { ThyOptionComponent } from '../shared/option/option.component';
import { DOWN_ARROW, END, ENTER, ESCAPE, HOME } from '../util/keycodes';
import {
    SelectMode,
    THY_SELECT_PANEL_MIN_WIDTH,
    ThySelectCustomComponent,
    ThySelectOptionModel
} from './custom-select/custom-select.component';
import { ThySelectModule } from './module';
import { THY_SELECT_CONFIG, THY_SELECT_SCROLL_STRATEGY, ThyDropdownWidthMode } from './select.config';

@Component({
    selector: 'thy-select-basic-test',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                thyPlaceHolder="Food"
                [thyEnableScrollLoad]="enableScrollLoad"
                (thyOnScrollToBottom)="thyOnScrollToBottom()"
                [formControl]="control"
                [required]="isRequired"
                [thySize]="size"
                [thyAutoActiveFirstItem]="thyAutoActiveFirstItem"
                [thyDisabled]="selectDisabled"
                [thyMode]="mode"
                [thyBorderless]="borderless"
                [thyOrigin]="customizeOrigin">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue">
                </thy-option>
                <ng-template #footer>
                    <a>更多</a>
                </ng-template>
            </thy-custom-select>
        </form>
        <div id="custom-select-origin" #origin style="width: 200px;height: 20px"></div>
    `
})
class BasicSelectComponent {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    selectDisabled = false;
    control = new UntypedFormControl();
    isRequired: boolean;
    enableScrollLoad: boolean;
    size = '';
    mode: 'multiple' | '' = '';
    thyAutoActiveFirstItem = true;
    customizeOrigin: ElementRef | HTMLElement;
    borderless = false;
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;

    @ViewChild('footer', { static: true, read: TemplateRef })
    footerTemplate: TemplateRef<any>;

    @ViewChild('origin', { static: true }) origin: ElementRef;
    thyOnScrollToBottom = jasmine.createSpy('thyOnScrollToBottom callback');
}

@Component({
    selector: 'thy-multiple-select',
    template: `
        <thy-custom-select class="foods" #Foods thyPlaceHolder="Food">
            <thy-option *ngFor="let food of foods" [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue">
            </thy-option>
        </thy-custom-select>
        <thy-custom-select class="vegetables" #Vegetables thyPlaceHolder="Vegetables">
            <thy-option *ngFor="let vegetable of vegetables" [thyValue]="vegetable.value" [thyLabelText]="vegetable.viewValue">
            </thy-option>
        </thy-custom-select>
    `
})
class MultipleSelectComponent {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    vegetables: any[] = [{ value: 'potatoes', viewValue: 'Potatoes' }];

    @ViewChild('Foods', { static: true }) foodsComponent: ThySelectCustomComponent;
    @ViewChild('Vegetables', { static: true }) vegetablesComponent: ThySelectCustomComponent;
}

@Component({
    selector: 'thy-ng-model-select',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="Food" ngModel name="food" [thyDisabled]="isDisabled">
                <thy-option *ngFor="let food of foods" [thyValue]="food.value" [thyLabelText]="food.viewValue"> </thy-option>
            </thy-custom-select>
        </form>
    `
})
class NgModelSelectComponent {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];
    isDisabled: boolean;

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'thy-select-with-groups',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="Pokemon" [formControl]="control">
                <thy-option-group *ngFor="let group of pokemonTypes" [thyGroupLabel]="group.name">
                    <ng-container *ngFor="let pokemon of group.pokemon">
                        <thy-option [thyValue]="pokemon.value" [thyLabelText]="pokemon.viewValue"></thy-option>
                    </ng-container>
                </thy-option-group>
            </thy-custom-select>
        </form>
    `
})
class SelectWithGroupsAndNgContainerComponent {
    control = new UntypedFormControl();
    pokemonTypes = [
        {
            name: 'Grass',
            pokemon: [{ value: 'bulbasaur-0', viewValue: 'Bulbasaur' }]
        }
    ];
}

@Component({
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select placeholder="Food" [(ngModel)]="selectedFoods" name="food">
                <thy-option *ngFor="let food of foods" [thyValue]="food.value" [thyLabelText]="food.viewValue"></thy-option>
            </thy-custom-select>
        </form>
    `
})
class SingleSelectWithPreselectedArrayValuesComponent {
    foods = [
        { value: ['steak-0', 'steak-1'], viewValue: 'Steak' },
        { value: ['pizza-1', 'pizza-2'], viewValue: 'Pizza' },
        { value: ['tacos-2', 'tacos-3'], viewValue: 'Tacos' }
    ];

    selectedFoods = this.foods[1].value;

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select placeholder="Food" [(ngModel)]="selectedValues" name="food">
                <thy-option *ngFor="let item of values" [thyValue]="item.value" [thyLabelText]="item.viewValue"></thy-option>
            </thy-custom-select>
        </form>
    `
})
class SingleSelectNgModelComponent {
    values = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    selectedValues = this.values[1].value;

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'thy-basic-select-initially-hidden',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select [style.display]="isVisible ? 'block' : 'none'">
                <thy-option thyValue="value" thyLabelText="There are no other options"></thy-option>
            </thy-custom-select>
        </form>
    `
})
class BasicSelectInitiallyHiddenComponent {
    isVisible = false;
}

@Component({
    selector: 'thy-select-early-sibling-access',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select #select="thyCustomSelect"></thy-custom-select>
            <div *ngIf="select.selected"></div>
        </form>
    `
})
class SelectEarlyAccessSiblingComponent {}

@Component({
    selector: 'thy-select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="Food" [thyShowSearch]="thyShowSearch">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue">
                </thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithSearchComponent {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    thyShowSearch = false;
    control = new UntypedFormControl();
    isRequired: boolean;
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'thy-select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="team-members" [thyShowSearch]="thyShowSearch">
                <thy-option
                    *ngFor="let member of teamMembers"
                    [thyValue]="member.id"
                    [thyLabelText]="member.name"
                    thySearchKey="{{ member.name }},{{ member.pin_yin }}">
                </thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithSearchUseSearchKeyComponent {
    teamMembers: any[] = [
        {
            _id: 'sadfasdfasdfasfdasdfs5',
            name: '公告',
            pin_yin: 'gg'
        },
        {
            _id: 'sadfasdfasdfasfdasdfs6',
            name: '狼人杀',
            pin_yin: 'lrs'
        },
        {
            _id: 'sadfasdfasdfasfdasdfs7',
            name: '前端',
            pin_yin: 'qd'
        },
        {
            _id: 'sadfasdfasdfasfdasdfs8',
            name: '小菲',
            pin_yin: 'xf'
        }
    ];
    thyShowSearch = true;
    control = new UntypedFormControl();
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'thy-select-with-group-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                thyPlaceHolder="Pokemon"
                [thyShowSearch]="true"
                [thyEmptySearchMessageText]="thyEmptySearchMessageText"
                [formControl]="control">
                <thy-option-group *ngFor="let group of pokemonTypes" [thyGroupLabel]="group.name">
                    <ng-container *ngFor="let pokemon of group.pokemon">
                        <thy-option [thyValue]="pokemon.value" [thyLabelText]="pokemon.viewValue"></thy-option>
                    </ng-container>
                </thy-option-group>
            </thy-custom-select>
        </form>
    `
})
class SelectWithSearchAndGroupComponent {
    control = new UntypedFormControl();
    pokemonTypes = [
        {
            name: 'Grass',
            pokemon: [
                { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
                { value: 'cat-0', viewValue: 'Cat' }
            ]
        },
        {
            name: 'animals',
            pokemon: [
                { value: 'pet-0', viewValue: 'Pet' },
                { value: 'monkey-0', viewValue: 'Monkey' }
            ]
        }
    ];
    thyEmptySearchMessageText = 'empty result';
    @ViewChild(ThySelectCustomComponent, { static: true })
    select: ThySelectCustomComponent;
}

@Component({
    selector: 'thy-select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                thyPlaceHolder="Food"
                name="foods"
                [thyShowSearch]="thyShowSearch"
                [thyServerSearch]="true"
                (thyOnSearch)="thyOnSearch()">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue">
                </thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithSearchAndServerSearchComponent {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    selected = this.foods[7];
    thyShowSearch = true;
    control = new UntypedFormControl();
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
    thyOnSearch = jasmine.createSpy('thyServerSearch callback');
}

@Component({
    selector: 'thy-basic-select',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                thyPlaceHolder="Food"
                [thyMode]="mode"
                style="width:500px"
                [thyAllowClear]="thyAllowClear"
                [(ngModel)]="selectedValue"
                [thyDisabled]="disabled"
                name="Food"
                [required]="isRequired">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue">
                </thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectEimtOptionsChangesComponent {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    mode = 'multiple';
    selectedValue = ['sushi-7'];
    thyAllowClear = true;
    disabled = false;
    isRequired: boolean;
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'thy-select-expand-status',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select [formControl]="control" (thyOnExpandStatusChange)="thyOnExpandStatusChange($event)">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue">
                </thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithExpandStatusComponent {
    foods: any[] = [{ value: 'pizza-1', viewValue: 'Pizza' }];
    control = new UntypedFormControl();
    thyOnExpandStatusChange = jasmine.createSpy('thyOnExpandStatusChange callback');
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
}

@Component({
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select placeholder="Food" [(ngModel)]="selectedFoods" name="food" [thyMode]="selectMode">
                <thy-option *ngFor="let food of foods" [thyValue]="food.value" [thyLabelText]="food.viewValue"></thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithThyModeComponent {
    foods: any[] = [
        { value: ['steak-0', 'steak-1'], viewValue: 'Steak' },
        { value: ['pizza-1', 'pizza-2'], viewValue: 'Pizza' },
        { value: ['tacos-2', 'tacos-3'], viewValue: 'Tacos' }
    ];

    selectMode: SelectMode = 'multiple';

    selectedFoods: string[] = null;

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                placeholder="Food"
                [(ngModel)]="selectedFoods"
                name="food"
                [thyMode]="selectMode"
                [thySortComparator]="thySortComparator">
                <thy-option *ngFor="let food of foods" [thyValue]="food.value" [thyLabelText]="food.viewValue"></thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithThySortComparatorComponent {
    foods: any[] = [
        { value: ['steak-0', 'steak-1'], viewValue: 'Steak' },
        { value: ['pizza-1', 'pizza-2'], viewValue: 'Pizza' },
        { value: ['tacos-2', 'tacos-3'], viewValue: 'Tacos' }
    ];

    selectMode: SelectMode = 'multiple';

    thySortComparator: (a: ThyOptionComponent, b: ThyOptionComponent, options: ThyOptionComponent[]) => number;

    selectedFoods: string[] = null;

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'thy-auto-expend-select',
    template: `
        <thy-custom-select [thyAutoExpand]="isAutoExpend" style="width:500px;">
            <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.label"></thy-option>
        </thy-custom-select>
    `
})
class SelectWithThyAutoExpendComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    isAutoExpend = true;

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;

    constructor() {}

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}

@Component({
    selector: 'thy-placement-select',
    template: `
        <thy-custom-select [thyPlacement]="thyPlacement" style="width:500px;">
            <thy-option *ngFor="let option of listOfOption" [thyValue]="option.value" [thyLabelText]="option.label"></thy-option>
        </thy-custom-select>
    `
})
class SelectWithThyPlacementComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    thyPlacement = 'top';

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;

    constructor() {}

    ngOnInit() {}
}

@Component({
    selector: 'thy-select-with-scroll-and-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                thyPlaceHolder="Food"
                name="foods"
                [thyShowSearch]="showSearch"
                [thyServerSearch]="serverSearch"
                [thyEnableScrollLoad]="true"
                (thyOnSearch)="thyOnSearch()">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue">
                </thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithScrollAndSearchComponent {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    showSearch = true;
    serverSearch = true;
    selected: any = null;
    control = new UntypedFormControl();
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
    thyOnSearch(value: string) {
        timer(100).subscribe(() => {
            this.foods = this.foods.slice(5);
        });
    }
}

@Component({
    selector: 'thy-select-with-load-state',
    template: `
        <thy-custom-select (thyOnExpandStatusChange)="expandChange($event)" [thyLoadState]="loadState" [thyShowSearch]="showSearch">
            <thy-option *ngFor="let food of foods" [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue">
            </thy-option>
        </thy-custom-select>
    `
})
class SelectWithAsyncLoadComponent implements OnInit {
    @ViewChild(ThySelectCustomComponent) customSelect: ThySelectCustomComponent;

    loadState = true;

    showSearch = false;

    foods: any[] = [];

    fetchOptions() {
        this.loadState = false;
        return timer(1500).pipe(
            tap(() => {
                this.foods = [
                    { value: 'steak-0', viewValue: 'Steak' },
                    { value: 'pizza-1', viewValue: 'Pizza' },
                    { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
                    { value: 'sandwich-3', viewValue: 'Sandwich' },
                    { value: 'chips-4', viewValue: 'Chips' },
                    { value: 'eggs-5', viewValue: 'Eggs' },
                    { value: 'pasta-6', viewValue: 'Pasta' },
                    { value: 'sushi-7', viewValue: 'Sushi' }
                ];
            })
        );
    }

    ngOnInit(): void {
        this.fetchOptions().subscribe(() => {
            this.loadState = false;
        });
    }

    expandChange(expand: boolean) {
        if (expand) {
            this.fetchOptions().subscribe(() => {
                this.loadState = true;
            });
        }
    }
}

@Component({
    selector: 'thy-select-dropdown-width',
    template: `
        <div style="width:100px">
            <thy-custom-select class="select1" [thyDropdownWidthMode]="dropdownWidthMode" [(ngModel)]="selectedValue">
                <thy-option *ngFor="let option of options" [thyValue]="option.value" [thyLabelText]="option.viewValue"> </thy-option>
            </thy-custom-select>
        </div>

        <div style="width:100px">
            <thy-custom-select class="select2" [(ngModel)]="selectedValue">
                <thy-option *ngFor="let option of options" [thyValue]="option.value" [thyLabelText]="option.viewValue"> </thy-option>
            </thy-custom-select>
        </div>
    `
})
class SelectDropdownWidthComponent {
    dropdownWidthMode: ThyDropdownWidthMode;

    options = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    selectedValue = this.options[0].value;
}

@Component({
    selector: 'thy-select-width-thy-options',
    template: `
        <div style="width:100px">
            <thy-custom-select [thyOptions]="options" class="select1" [(ngModel)]="selectedValue"> </thy-custom-select>
        </div>
    `
})
class SelectWidthThyOptionsComponent {
    options: ThySelectOptionModel[] = [
        { value: 'apple', label: '苹果' },
        { value: 'orange', label: '橘子' },
        { value: 'banana', label: '香蕉' }
    ];
    selectedValue = this.options[0].value;
}

describe('ThyCustomSelect', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: Platform;

    function configureThyCustomSelectTestingModule(declarations: any[], providers: any[] = []) {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, ThyOptionModule, ThySelectModule, ReactiveFormsModule, FormsModule, NoopAnimationsModule],
            declarations: declarations,
            providers: [bypassSanitizeProvider, ...providers]
        }).compileComponents();

        inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            platform = p;
        })();

        injectDefaultSvgIconSet();
    }

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('core', () => {
        beforeEach(() => {
            configureThyCustomSelectTestingModule([
                BasicSelectComponent,
                SelectWithGroupsAndNgContainerComponent,
                SelectWithExpandStatusComponent,
                MultipleSelectComponent,
                SelectWithThyAutoExpendComponent,
                SelectWithScrollAndSearchComponent
            ]);
        });

        describe('basic class', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let selectElement: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement;
            });

            it('should get correct class', () => {
                expect(selectElement).toBeTruthy();
                expect(selectElement.classList.contains('thy-select')).toBeTruthy();
            });

            it('should get correct icon element', () => {
                const iconElement = selectElement.querySelector('.thy-icon');
                expect(iconElement).toBeTruthy();
                expect(iconElement.classList.contains('thy-icon-angle-down')).toBeTruthy();
            });

            it('should get default placement', fakeAsync(() => {
                let trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();
                flush();

                const componentInstance = fixture.debugElement.query(By.directive(ThySelectCustomComponent)).componentInstance;
                expect(componentInstance.dropDownPositions[0].originY).toEqual('bottom');
            }));

            it('should get right item count when invoke itemCount method', () => {
                const ins = fixture.componentInstance.select;
                expect(fixture.componentInstance.foods.length).toEqual(ins.getItemCount());
            });

            it('should get correct mode when get thyMode', () => {
                fixture.componentInstance.select.mode = 'multiple';
                fixture.detectChanges();
                expect(fixture.componentInstance.select.thyMode).toEqual('multiple');
            });

            it('select component modelValue will be null when multiple is false and changeValue length is 0', () => {
                const selectComponent = fixture.componentInstance.select;
                selectComponent.mode = '';
                selectComponent.selectionModel.clear();
                fixture.detectChanges();
                selectComponent.clearSelectValue();
                fixture.detectChanges();
                expect(selectComponent.modalValue).toBeNull();
            });

            it('should auto focus to input element when select focus', fakeAsync(() => {
                const customSelectDebugElement = fixture.debugElement.query(By.directive(ThySelectCustomComponent));
                fixture.detectChanges();
                const focusSpy = spyOn(fixture.componentInstance.select, 'onFocus').and.callThrough();

                dispatchFakeEvent(customSelectDebugElement.nativeElement, 'focus');
                fixture.detectChanges();
                flush();

                expect(focusSpy).toHaveBeenCalled();

                fixture.componentInstance.select.onFocus({ relatedTarget: fixture.debugElement } as any);
                fixture.detectChanges();

                const inputElement = fixture.nativeElement.querySelector('input');
                expect(document.activeElement).toEqual(inputElement);
            }));

            it(`should update manualFocusing when manual focus select`, fakeAsync(() => {
                fixture.detectChanges();
                let focusCalled = false;
                spyOn(selectElement, 'focus').and.callFake(() => {
                    focusCalled = true;
                    expect(fixture.componentInstance.select['manualFocusing']).toBe(true);
                });
                fixture.componentInstance.select.focus();
                expect(fixture.componentInstance.select['manualFocusing']).toBe(false);
                expect(focusCalled).toBe(true);
            }));

            it(`should can't call input focus when manual focusing select for close`, fakeAsync(() => {
                fixture.detectChanges();
                const input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input');
                expect(input).toBeTruthy();
                const focusSpy = spyOn(input, 'focus');
                fixture.componentInstance.select['manualFocusing'] = true;
                fixture.componentInstance.select.onFocus({ relatedTarget: input } as unknown as FocusEvent);
                expect(focusSpy).not.toHaveBeenCalled();
                expect(fixture.componentInstance.select['manualFocusing']).toBe(false);
                fixture.componentInstance.select.onFocus({ relatedTarget: fixture.debugElement.nativeElement } as unknown as FocusEvent);
                expect(focusSpy).toHaveBeenCalled();
            }));

            it('should call onBlur methods when blur', fakeAsync(() => {
                const customSelectDebugElement = fixture.debugElement.query(By.directive(ThySelectCustomComponent));
                fixture.detectChanges();
                const blurSpy = spyOn(fixture.componentInstance.select, 'onBlur').and.callThrough();

                dispatchFakeEvent(customSelectDebugElement.nativeElement, 'blur');
                fixture.detectChanges();

                flush();

                expect(blurSpy).toHaveBeenCalled();
            }));

            it('should call blur and not call onTouchFn when blur', fakeAsync(() => {
                const blurSpy = spyOn<any>(fixture.componentInstance.select, 'onTouchedFn');
                const trigger = fixture.debugElement.query(By.css('.select-control-search input')).nativeElement;
                fixture.componentInstance.select.onBlur({ relatedTarget: trigger } as FocusEvent);

                fixture.detectChanges();

                expect(blurSpy).not.toHaveBeenCalled();
            }));

            it('should call onTouchFn when value change in single mode', () => {
                const blurSpy = spyOn<any>(fixture.componentInstance.select, 'onTouchedFn');
                const optionInstances = fixture.componentInstance.options.toArray();
                optionInstances[1].select();
                fixture.detectChanges();
                optionInstances[1].deselect();
                fixture.detectChanges();
                expect(blurSpy).toHaveBeenCalled();
            });

            it('should not call onTouchFn when value change in multiple mode', () => {
                fixture.componentInstance.mode = 'multiple';
                fixture.detectChanges();
                const blurSpy = spyOn<any>(fixture.componentInstance.select, 'onTouchedFn');
                const optionInstances = fixture.componentInstance.options.toArray();
                optionInstances[1].select();
                fixture.detectChanges();
                optionInstances[1].deselect();
                fixture.detectChanges();
                expect(blurSpy).not.toHaveBeenCalled();
            });

            it('should has borderless class name', fakeAsync(() => {
                fixture.componentInstance.borderless = true;
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                expect(selectElement.querySelector('.select-control-borderless')).toBeTruthy();
            }));
        });

        describe('size', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
            }));

            it('should has correct size', () => {
                const sizes = ['xs', 'sm', 'md', 'lg'];
                fixture.componentInstance.size = '';
                fixture.detectChanges();
                const formControl = fixture.debugElement.query(By.css('.form-control')).nativeElement;
                sizes.forEach(size => {
                    expect(formControl.classList.contains(`form-control-${size}`)).not.toBeTruthy();
                });
                sizes.forEach(size => {
                    fixture.componentInstance.size = size;
                    fixture.detectChanges();
                    expect(formControl.classList.contains(`form-control-${size}`)).toBeTruthy();
                });
            });
        });

        describe('overlay panel', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let trigger: HTMLElement;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            }));

            it('should not throw when attempting to open too early', () => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                expect(() => fixture.componentInstance.select.open()).not.toThrow();
            });

            it('should open the panel when trigger is clicked', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.select.panelOpen).toBe(true);
                expect(overlayContainerElement.textContent).toContain('Steak');
                expect(overlayContainerElement.textContent).toContain('Pizza');
                expect(overlayContainerElement.textContent).toContain('Tacos');
            }));

            it('should close the panel when an item is clicked', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                const option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
                option.click();

                fixture.detectChanges();
                flush();

                expect(overlayContainerElement.textContent).toEqual('');
                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));

            it('should remove select active item when mousemove', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                const el = overlayContainerElement.querySelector('.thy-select-dropdown') as HTMLElement;
                dispatchMouseEvent(el, 'mousemove');
                expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(null);
            }));

            it('should exec thyOnScrollToBottom when thyEnableScrollLoad is true', fakeAsync(() => {
                fixture.componentInstance.enableScrollLoad = true;
                const spy = fixture.componentInstance.thyOnScrollToBottom;

                trigger.click();
                fixture.detectChanges();
                flush();

                const el = overlayContainerElement.querySelector('.thy-select-dropdown-options') as HTMLElement;
                dispatchFakeEvent(el, 'scroll');

                expect(spy).toHaveBeenCalledTimes(1);
            }));

            it('should close the panel when a click occurs outside the panel', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                const backdrop = fixture.debugElement.nativeElement.querySelector('form') as HTMLElement;

                backdrop.click();
                fixture.detectChanges();
                flush();

                expect(overlayContainerElement.textContent).toEqual('');
                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));

            it('should set the width of the overlay based on the trigger', fakeAsync(() => {
                trigger.style.width = '200px';

                trigger.click();
                fixture.detectChanges();
                flush();

                const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
                expect(pane.style.width).toBe('200px');
            }));

            it('should update the width of the panel on resize', fakeAsync(() => {
                trigger.style.width = '300px';

                trigger.click();
                fixture.detectChanges();
                flush();

                const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
                // eslint-disable-next-line radix
                const initialWidth = parseInt(pane.style.width || '0');

                expect(initialWidth).toBeGreaterThan(0);

                trigger.style.width = '400px';
                dispatchFakeEvent(window, 'resize');
                fixture.detectChanges();
                tick(1000);
                fixture.detectChanges();

                // eslint-disable-next-line radix
                expect(parseInt(pane.style.width || '0')).toBeGreaterThan(initialWidth);
            }));

            it('should attempt to open a select that does not have any options', fakeAsync(() => {
                fixture.componentInstance.foods = [];
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();

                expect(fixture.componentInstance.select.panelOpen).toBe(true);

                expect(fixture.componentInstance.select.options.length).toBe(0);

                flush();
            }));

            it('should show default emptyStateText when does not have any options', fakeAsync(() => {
                fixture.componentInstance.foods = [];
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();

                expect(overlayContainerElement.textContent).toContain(fixture.componentInstance.select.emptyStateText);
                flush();
            }));

            it('should show thyEmptyStateText when assign thyEmptyStateText property', fakeAsync(() => {
                const thyEmptyStateText = '无任何内容';
                fixture.componentInstance.foods = [];
                fixture.componentInstance.select.thyEmptyStateText = thyEmptyStateText;
                fixture.detectChanges();
                trigger.click();
                fixture.detectChanges();

                expect(overlayContainerElement.textContent).toContain(thyEmptyStateText);
                flush();
            }));

            it('should close the panel when esceing out', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.select.panelOpen).toBe(true);

                dispatchKeyboardEvent(trigger, 'keydown', ESCAPE);
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.select.panelOpen).toBe(false);
            }));

            it('should be able to render options inside groups with an ng-container', fakeAsync(() => {
                fixture.destroy();

                const groupFixture = TestBed.createComponent(SelectWithGroupsAndNgContainerComponent);
                groupFixture.detectChanges();
                trigger = groupFixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                groupFixture.detectChanges();

                expect(document.querySelectorAll('.cdk-overlay-container thy-option').length).toBeGreaterThan(
                    0,
                    'Expected at least one option to be rendered.'
                );
            }));

            it('should custom origin effected when origin is elementRef', fakeAsync(() => {
                fixture.componentInstance.customizeOrigin = fixture.componentInstance.origin;
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();
                flush();
                const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
                expect(pane.style.width).toBe('200px');
            }));

            it('should custom origin effected when origin is htmlElement', fakeAsync(() => {
                const htmlElement = fixture.debugElement.query(By.css('#custom-select-origin')).nativeElement;
                fixture.componentInstance.customizeOrigin = htmlElement;
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();
                flush();
                const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
                expect(pane.style.width).toBe('200px');
            }));
        });

        describe('thyFooter', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let trigger: HTMLElement;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            }));

            it('should not show thyFooterTemplate', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();
                const footerElement = overlayContainer.getContainerElement().querySelector('.thy-custom-select-footer');
                expect(footerElement).toBeNull();
            }));

            it('should show thyFooterTemplate when thyFooterTemplate had been assign', fakeAsync(() => {
                fixture.componentInstance.select.thyFooterTemplate = fixture.componentInstance.footerTemplate;
                trigger.click();
                fixture.detectChanges();
                flush();
                const footerElement = overlayContainer.getContainerElement().querySelector('.thy-custom-select-footer');
                expect(footerElement).toBeTruthy();
            }));

            it('should show thyFooterTemplate with custom-footer-class when thyFooterTemplate had been assign', fakeAsync(() => {
                const footerClass = 'custom-footer-class';
                fixture.componentInstance.select.thyFooterTemplate = fixture.componentInstance.footerTemplate;
                fixture.componentInstance.select.thyFooterClass = footerClass;
                trigger.click();
                fixture.detectChanges();
                flush();
                const footerElement = overlayContainer.getContainerElement().querySelector(`.${footerClass}`);
                expect(footerElement).toBeTruthy();
            }));
        });

        describe('close logic', () => {
            let fixture: ComponentFixture<MultipleSelectComponent>;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(MultipleSelectComponent);
                fixture.detectChanges();
            }));

            it('should close the panel when a click occurs on another select', fakeAsync(() => {
                const foodsTrigger = fixture.debugElement.query(By.css('.foods .form-control-custom')).nativeElement;
                const vegetablesTrigger = fixture.debugElement.query(By.css('.vegetables .form-control-custom')).nativeElement;

                foodsTrigger.click();
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.foodsComponent.panelOpen).toBe(true);

                vegetablesTrigger.click();
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.foodsComponent.panelOpen).toBe(false);
            }));
        });

        describe('selection logic', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let trigger: HTMLElement;
            let form: HTMLElement;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                form = fixture.debugElement.query(By.css('.thy-form')).nativeElement;
            }));

            it('should select an option when it is clicked', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                let option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
                option.click();
                fixture.detectChanges();
                flush();

                trigger.click();
                fixture.detectChanges();
                flush();

                option = overlayContainerElement.querySelector('thy-option') as HTMLElement;

                expect(option.classList).toContain('active');
                expect(fixture.componentInstance.options.first.selected).toEqual(true);
                expect(fixture.componentInstance.select.selectionModel.selected[0]).toBe(fixture.componentInstance.options.first);
            }));

            it('should be able to select to an option using th ThyOptionComponent API', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                const optionInstances = fixture.componentInstance.options.toArray();
                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('thy-option');

                optionInstances[1].select();
                fixture.detectChanges();
                flush();
                expect(optionNodes[1].classList).toContain('active');
                expect(optionInstances[1].selected).toBe(true);
                expect(fixture.componentInstance.select.selectionModel.selected[0]).toBe(optionInstances[1]);
            }));

            it('should deselect other options when one is selected', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                let options = overlayContainerElement.querySelectorAll('thy-option') as NodeListOf<HTMLElement>;

                options[1].click();
                fixture.detectChanges();
                flush();

                options[2].click();
                fixture.detectChanges();
                flush();

                options[0].click();
                fixture.detectChanges();
                flush();

                trigger.click();
                fixture.detectChanges();
                flush();

                options = overlayContainerElement.querySelectorAll('thy-option') as NodeListOf<HTMLElement>;
                expect(options[1].classList).not.toContain('active');
                expect(options[2].classList).not.toContain('active');

                const optionInstances = fixture.componentInstance.options.toArray();
                expect(optionInstances[1].selected).toBe(false);
                expect(optionInstances[2].selected).toBe(false);
            }));
        });

        describe('select expand status change', () => {
            let fixture: ComponentFixture<SelectWithExpandStatusComponent>;
            let trigger: HTMLElement;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(SelectWithExpandStatusComponent);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            }));

            it('should trigger thyOnExpandStatusChange event when open panel or close panel', fakeAsync(() => {
                const spy = fixture.componentInstance.thyOnExpandStatusChange;
                trigger.click();
                fixture.detectChanges();
                flush();

                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith(true);

                const option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
                option.click();

                fixture.detectChanges();
                flush();

                expect(spy).toHaveBeenCalledTimes(2);
                expect(spy).toHaveBeenCalledWith(false);
            }));
        });

        describe('scroll and search', () => {
            let fixture: ComponentFixture<SelectWithScrollAndSearchComponent>;
            let fixtureIns: SelectWithScrollAndSearchComponent;
            beforeEach(async(() => {
                fixture = TestBed.createComponent(SelectWithScrollAndSearchComponent);
                fixtureIns = fixture.componentInstance;
                fixture.detectChanges();
            }));

            it('should scroll to active item when thyEnableScrollLoad and thyServerSearch is true', fakeAsync(() => {
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();

                const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

                typeInElement('any word', input);
                fixture.detectChanges();
                expect(fixtureIns.select['isSearching']).toBeTruthy();
                tick(200);
                fixture.detectChanges();
                expect(fixtureIns.select['isSearching']).toBeFalsy();
                expect(fixtureIns.select.keyManager.activeItem).toEqual(fixtureIns.select.options.toArray()[0]);
            }));

            it('should  scroll to active item when thyEnableScrollLoad is true and thyShowSearch is true', fakeAsync(() => {
                fixtureIns.serverSearch = false;
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();

                const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

                typeInElement('any word', input);
                fixture.detectChanges();
                expect(fixtureIns.select['isSearching']).toBeFalsy();
                flush();
            }));

            it('should close panel when dispatch toggle at thyShowSearch is false', fakeAsync(() => {
                fixture.componentInstance.showSearch = false;
                fixture.componentInstance.serverSearch = false;
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();

                expect(fixture.componentInstance.select.panelOpen).toBeTruthy();

                trigger.click();
                fixture.detectChanges();
                expect(fixture.componentInstance.select.panelOpen).toBeFalsy();
            }));

            it('should not close panel when dispatch toggle at thyShowSearch is true', fakeAsync(() => {
                fixture.componentInstance.showSearch = true;
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();

                const el = overlayContainerElement.querySelector('.thy-select-dropdown-options') as HTMLElement;
                expect(el).toBeTruthy();

                trigger.click();
                fixture.detectChanges();
                expect(el).toBeTruthy();
            }));
        });
    });

    describe('dropdown min width', () => {
        let containerSelector: string;

        it('should support thyDropdownWidthMode to set cdkConnectedOverlayMinWidth', fakeAsync(() => {
            configureThyCustomSelectTestingModule([SelectDropdownWidthComponent]);

            let fixture: ComponentFixture<SelectDropdownWidthComponent> = TestBed.createComponent(SelectDropdownWidthComponent);
            fixture.detectChanges();

            containerSelector = '.select1';
            assertDropdownMinWidth(fixture, 'match-select', 'width', 100);
            assertDropdownMinWidth(fixture, 'min-width', 'minWidth', THY_SELECT_PANEL_MIN_WIDTH);
            assertDropdownMinWidth(fixture, { minWidth: 300 }, 'minWidth', 300);
        }));

        it('should support global setting dropdownWidthMode in THY_SELECT_CONFIG', () => {
            configureThyCustomSelectTestingModule(
                [SelectDropdownWidthComponent],
                [
                    {
                        provide: THY_SELECT_CONFIG,
                        useValue: {
                            dropdownWidthMode: 'min-width'
                        }
                    }
                ]
            );

            let fixture: ComponentFixture<SelectDropdownWidthComponent> = TestBed.createComponent(SelectDropdownWidthComponent);
            fixture.detectChanges();
            containerSelector = '.select2';
            assertDropdownMinWidth(fixture, null, 'minWidth', THY_SELECT_PANEL_MIN_WIDTH);
        });

        function assertDropdownMinWidth(
            fixture: ComponentFixture<SelectDropdownWidthComponent>,
            dropdownWidthMode: ThyDropdownWidthMode,
            styleProperty: 'width' | 'minWidth',
            expectedValue: number
        ) {
            const testComponent = fixture.componentInstance;
            testComponent.dropdownWidthMode = dropdownWidthMode;
            fixture.detectChanges();

            const selectComponent = fixture.debugElement.query(By.css(containerSelector)).componentInstance;
            selectComponent.ngOnInit();
            fixture.detectChanges();

            const inputElement = fixture.debugElement.query(By.css(`${containerSelector} input`)).nativeElement;
            dispatchFakeEvent(inputElement, 'click', true);
            fixture.detectChanges();

            const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
            expect(pane.style[styleProperty]).toEqual(`${expectedValue}px`);
        }
    });

    describe('with ngModel', () => {
        beforeEach(async(() => configureThyCustomSelectTestingModule([NgModelSelectComponent])));

        it('should disabled itselft when control is disabled usig the property', fakeAsync(() => {
            const fixture = TestBed.createComponent(NgModelSelectComponent);
            fixture.detectChanges();

            fixture.componentInstance.isDisabled = true;
            fixture.detectChanges();
            flush();

            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            expect(trigger.classList).toContain('disabled');

            trigger.click();
            fixture.detectChanges();

            expect(overlayContainerElement.textContent).toEqual('', `Expected select panel to stay closed.`);
            expect(fixture.componentInstance.select.panelOpen).toBe(false, `Expected select panelOpen property to stay false.`);

            fixture.componentInstance.isDisabled = false;
            fixture.detectChanges();
            flush();

            expect(trigger.classList).not.toContain('disabled');

            trigger.click();
            fixture.detectChanges();

            expect(overlayContainerElement.textContent).toContain('Steak', `Expected select panel to open normally on re-enabled control`);
            expect(fixture.componentInstance.select.panelOpen).toBe(true, `Expected select panelOpen property to become true.`);
        }));
    });

    describe('with preselected array values', () => {
        beforeEach(async(() => configureThyCustomSelectTestingModule([SingleSelectWithPreselectedArrayValuesComponent])));

        it('should be able to preselect an array value in single-selection mode', fakeAsync(() => {
            const fixture = TestBed.createComponent(SingleSelectWithPreselectedArrayValuesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;

            expect(trigger.textContent).toContain('Pizza');
            expect(fixture.componentInstance.options.toArray()[1].selected).toBe(true);
        }));
    });

    describe('single choice when ngModel value change', () => {
        beforeEach(async(() => configureThyCustomSelectTestingModule([SingleSelectNgModelComponent])));

        it('should clear selection model for single choice when ngModel value change ', fakeAsync(() => {
            const fixture = TestBed.createComponent(SingleSelectNgModelComponent);
            fixture.detectChanges();
            const optionComponents = fixture.componentInstance.options.toArray();
            fixture.componentInstance.selectedValues = null;
            fixture.detectChanges();
            flush();
            expect(optionComponents[0].selected).toBe(false);
            expect(optionComponents[1].selected).toBe(false);
            expect(optionComponents[2].selected).toBe(false);
        }));
    });

    describe('when initially hidden', () => {
        beforeEach(async(() => configureThyCustomSelectTestingModule([BasicSelectInitiallyHiddenComponent])));

        it('should set the width of the overlay if the element was hidden initially', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectInitiallyHiddenComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.style.width = '200px';
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();

            trigger.click();
            fixture.detectChanges();
            flush();

            const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
            expect(pane.style.width).toBe('200px');
        }));
    });

    describe(`when the select's value is accessed on initialization`, () => {
        beforeEach(async(() => configureThyCustomSelectTestingModule([SelectEarlyAccessSiblingComponent])));

        it('should not throw when trying to access the selected value on init', fakeAsync(() => {
            expect(() => {
                TestBed.createComponent(SelectEarlyAccessSiblingComponent).detectChanges();
            }).not.toThrow();
        }));
    });

    describe('search logic', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([
                SelectWithSearchComponent,
                SelectWithSearchAndGroupComponent,
                SelectWithSearchUseSearchKeyComponent,
                SelectWithSearchAndServerSearchComponent
            ]);
        }));
        it('should show thy-input-search when set thyShowSearch', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchComponent);
            fixture.detectChanges();

            expect(fixture.componentInstance.select.thyShowSearch).toBe(false);

            fixture.componentInstance.thyShowSearch = true;
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            expect(fixture.componentInstance.select.thyShowSearch).toBe(true);
            expect(fixture.debugElement.query(By.css('.search-input-field'))).not.toBeNull();
        }));
        it('should hide the options that can not be searched', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchComponent);
            fixture.detectChanges();
            fixture.componentInstance.thyShowSearch = true;
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

            typeInElement('Steak', input);
            flush();
            fixture.detectChanges();
            flush();

            const options = fixture.componentInstance.select.options.toArray();

            expect(options[0].hidden).toBe(false);
            expect(options[1].hidden).toBe(true);
            const optionNodes = overlayContainerElement.querySelectorAll('thy-option') as NodeListOf<HTMLElement>;
            expect(optionNodes[0].classList).not.toContain('hidden');
            expect(optionNodes[1].classList).toContain('hidden');

            typeInElement('', input);
            fixture.detectChanges();
            flush();

            expect(options[0].hidden).toBe(false);
            expect(options[1].hidden).toBe(false);
            expect(optionNodes[0].classList).not.toContain('hidden');
            expect(optionNodes[1].classList).not.toContain('hidden');
        }));
        it('should search option use thySearchKey', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchUseSearchKeyComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

            typeInElement('lrs', input);
            fixture.detectChanges();
            flush();

            const options = fixture.componentInstance.select.options.toArray();
            const optionNodes = overlayContainerElement.querySelectorAll('thy-option') as NodeListOf<HTMLElement>;

            expect(options[1].hidden).toBe(false);
            expect(optionNodes[1].classList).not.toContain('hidden');

            typeInElement('other', input);
            fixture.detectChanges();
            flush();

            expect(options[1].hidden).toBe(true);
            expect(optionNodes[1].classList).toContain('hidden');
        }));
        it('should also find content when search by upperCase or lowerCase', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchComponent);
            fixture.detectChanges();
            fixture.componentInstance.thyShowSearch = true;
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
            typeInElement('sTeAk', input);
            flush();
            fixture.detectChanges();
            flush();

            const options = fixture.componentInstance.select.options.toArray();
            expect(options[0].hidden).toBe(false);
        }));
        it('should hide the thy-group when all options of the group is hidden', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchAndGroupComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            const groups = fixture.componentInstance.select.contentGroups.toArray();
            const options = fixture.componentInstance.select.options.toArray();
            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
            typeInElement('Cat', input);

            tick(1000);
            fixture.detectChanges();
            flush();

            expect(groups[0].hidden).toBe(false);
            expect(groups[1].hidden).toBe(true);

            typeInElement('cat2', input);

            tick(1000);
            fixture.detectChanges();
            flush();

            expect(groups[0].hidden).toBe(true);
            expect(groups[1].hidden).toBe(true);
        }));
        it('should exec thyOnSearch when thyServerSearch is true', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchAndServerSearchComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            const spy = fixture.componentInstance.thyOnSearch;
            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

            typeInElement('milk', input);
            fixture.detectChanges();
            tick();

            expect(spy).toHaveBeenCalledTimes(1);
        }));

        it('should show emptySearchMessageText when do not match any option', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchAndGroupComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            expect(overlayContainerElement.querySelector('thy-empty')).not.toBeTruthy();

            const groups = fixture.componentInstance.select.contentGroups.toArray();
            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
            typeInElement('cat2', input);

            tick(1000);
            fixture.detectChanges();
            flush();

            const emptyNode = overlayContainerElement.querySelector('thy-empty') as HTMLElement;
            expect(emptyNode).toBeTruthy();
            expect(emptyNode.textContent).toContain(fixture.componentInstance.thyEmptySearchMessageText);
        }));
    });

    describe('remove and clear logic', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([SelectEimtOptionsChangesComponent]);
        }));

        it('should not show remove icon when disabled is true', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const removeIcon = fixture.debugElement.query(By.css('.choice-remove-link'));
            expect(removeIcon).not.toBeNull();

            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            const removeIcon2 = fixture.debugElement.query(By.css('.choice-remove-link'));
            const choice = fixture.debugElement.query(By.css('.choice-item')).nativeElement as HTMLElement;
            tick();
            expect(choice.classList.contains('disabled')).toBeTruthy();
            expect(removeIcon2).toBeNull();
        }));

        it('dispatch remove function should not remove selected value when disabled is true', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            fixture.componentInstance.select.disabled = true;
            const closeIcon = fixture.nativeElement.querySelector('.choice-remove-link');
            dispatchFakeEvent(closeIcon, 'click');
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.selectedValue.length).toBeTruthy();
        }));

        it('dispatch remove function when options have not selected value', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const closeIcon = fixture.nativeElement.querySelector('.choice-remove-link');
            fixture.componentInstance.foods = fixture.componentInstance.foods.filter(item => item.value !== 'sushi-7');
            fixture.detectChanges();
            flush();
            dispatchFakeEvent(closeIcon, 'click');
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.selectedValue).toEqual([]);
        }));

        it('should remove selected value when click clear icon', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.choice-remove-link')).nativeElement;
            trigger.click();
            tick();
            expect(fixture.componentInstance.selectedValue).toEqual([]);
        }));

        it('should not clear selected value when disabled is true', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.select-control-clear')).nativeElement;
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            trigger.click();
            tick();
            expect(fixture.componentInstance.selectedValue).toEqual(['sushi-7']);
        }));

        it('should exec clear when click clear icon in multiple mode', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const blurSpy = spyOn<any>(fixture.componentInstance.select, 'onTouchedFn');
            const trigger = fixture.debugElement.query(By.css('.select-control-clear')).nativeElement;
            trigger.click();
            tick();
            expect(fixture.componentInstance.selectedValue).toEqual([]);
            expect(blurSpy).not.toHaveBeenCalled();
        }));

        it('should exec clear when click clear icon in single mode', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.componentInstance.mode = 'multiple';
            fixture.detectChanges();

            const blurSpy = spyOn<any>(fixture.componentInstance.select, 'onTouchedFn');
            const trigger = fixture.debugElement.query(By.css('.select-control-clear')).nativeElement;
            trigger.click();
            tick();
            expect(fixture.componentInstance.selectedValue).toEqual([]);
            expect(blurSpy).not.toHaveBeenCalled();
        }));

        it('should remove selected value when option disabled', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.componentInstance.selectedValue = ['sushi-7', 'tacos-2'];
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const trigger = fixture.debugElement.queryAll(By.css('.choice-remove-link'))[1].nativeElement;
            trigger.click();
            tick();
            expect(fixture.componentInstance.selectedValue).toEqual(['sushi-7']);
        }));
    });

    describe('options change logic', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([SelectEimtOptionsChangesComponent]);
        }));

        it('should remove the thy-option when sourcedata change', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            expect(overlayContainerElement.textContent).toContain('Sushi');
            fixture.componentInstance.foods.pop();

            fixture.detectChanges();

            expect(overlayContainerElement.textContent).not.toContain('Sushi');
        }));

        it('should keep selected option when thy-option is removed', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectEimtOptionsChangesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;

            expect(trigger.textContent).toContain('Sushi');
            fixture.componentInstance.foods.pop();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(trigger.textContent).toContain('Sushi');
        }));
    });

    describe('thyMode logic', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([SelectWithThyModeComponent]);
        }));
        it('should not close the panel when an item is clicked and thyMode is multiple', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;

            trigger.click();
            fixture.detectChanges();
            flush();

            const option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
            option.click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select.panelOpen).toBe(true);
        }));

        it('should close expand when thyMode change to empty', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();
            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            flush();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
            option.click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select.panelOpen).toBe(false);
        }));

        it('should clear selected status when thyMode change', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const optionComponents = fixture.componentInstance.options.toArray();
            const options = overlayContainerElement.querySelectorAll('thy-option');

            (options.item(0) as HTMLElement).click();
            (options.item(1) as HTMLElement).click();

            const backdrop = fixture.debugElement.nativeElement.querySelector('form') as HTMLElement;
            backdrop.click();

            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected).toBe(true);
            expect(optionComponents[1].selected).toBe(true);

            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected).toBe(false);
            expect(optionComponents[1].selected).toBe(false);

            trigger.click();
            fixture.detectChanges();
            flush();
            (options.item(0) as HTMLElement).click();
            expect(optionComponents[0].selected).toBe(true);

            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected).toBe(false);
        }));

        it('should not clear status when the thyMode value is not change', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const optionComponents = fixture.componentInstance.options.toArray();
            const options = overlayContainerElement.querySelectorAll('thy-option');

            (options.item(0) as HTMLElement).click();
            (options.item(1) as HTMLElement).click();

            const backdrop = fixture.debugElement.nativeElement.querySelector('form') as HTMLElement;
            backdrop.click();

            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected).toBe(true);
            expect(optionComponents[1].selected).toBe(true);

            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected).toBe(true);
            expect(optionComponents[1].selected).toBe(true);
        }));

        it('should apply default mode when thyMode change to empty', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();
            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            flush();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const options = overlayContainerElement.querySelectorAll('thy-option');
            (options.item(0) as HTMLElement).click();
            fixture.detectChanges();
            flush();
            const optionComponents = fixture.componentInstance.options.toArray();
            expect(optionComponents[0].selected).toBe(true);
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();
            expect(optionComponents[0].selected).toBe(false);
            expect(optionComponents[1].selected).toBe(true);
        }));

        it('should apply multiple mode when thyMode change to multiple', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();
            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            flush();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const options = overlayContainerElement.querySelectorAll('thy-option');
            (options.item(0) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            flush();

            const optionComponents = fixture.componentInstance.options.toArray();

            (options.item(0) as HTMLElement).click();
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected).toBe(true);
            expect(optionComponents[1].selected).toBe(true);
        }));
    });

    describe('thySortComparator', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([SelectWithThySortComparatorComponent]);
        }));
        it('should get list order by selected order', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThySortComparatorComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const options = overlayContainerElement.querySelectorAll('thy-option');
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            (options.item(0) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.selectedFoods[0]).toEqual(fixture.componentInstance.foods[1].value);
            expect(fixture.componentInstance.selectedFoods[1]).toEqual(fixture.componentInstance.foods[0].value);
        }));

        it('should get list order by index in options', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThySortComparatorComponent);
            fixture.componentInstance.thySortComparator = (a, b, optionComponents) => {
                return optionComponents.indexOf(a) - optionComponents.indexOf(b);
            };
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const options = overlayContainerElement.querySelectorAll('thy-option');
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            (options.item(0) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.selectedFoods[0]).toEqual(fixture.componentInstance.foods[0].value);
            expect(fixture.componentInstance.selectedFoods[1]).toEqual(fixture.componentInstance.foods[1].value);
        }));
    });

    describe('shortcuts', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([BasicSelectComponent]);
        }));

        it('should set first option active when open panel', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(fixture.componentInstance.select.options.toArray()[0]);
        }));

        it('should set next active option when press down_arrow', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(fixture.componentInstance.select.options.toArray()[1]);
        }));

        it('should set selected option active when open panel', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            dispatchKeyboardEvent(trigger, 'keydown', ESCAPE);
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.select.panelOpen).toBeFalsy();

            trigger.click();
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(fixture.componentInstance.select.options.toArray()[1]);
        }));

        it('should stopPropagation when press enter on custom-select', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const spy = jasmine.createSpy('keydown spy');
            fromEvent(fixture.debugElement.nativeElement, 'keydown').subscribe(() => {
                spy();
            });

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();

            expect(spy).not.toHaveBeenCalled();
        }));

        it('should select an option when press enter on active option', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.options.first.selected).toEqual(true);
            expect(fixture.componentInstance.select.selectionModel.selected[0]).toBe(fixture.componentInstance.options.first);
        }));

        it('should open the panel when press enter on trigger', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select.panelOpen).toEqual(true);
        }));

        it('should select an option when press down_arrow on trigger', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.options.first.selected).toEqual(true);
            expect(fixture.componentInstance.select.selectionModel.selected[0]).toBe(fixture.componentInstance.options.first);
        }));
    });

    describe('autoExpend', () => {
        let fixture: ComponentFixture<SelectWithThyAutoExpendComponent>;

        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([SelectWithThyAutoExpendComponent]);
        }));

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(SelectWithThyAutoExpendComponent);
            fixture.detectChanges();
            tick(1000);
        }));

        it('auto expend', fakeAsync(() => {
            expect(fixture.componentInstance.select.panelOpen).toBe(true);
        }));
    });

    describe('placement', () => {
        it('should support thyPlacement', fakeAsync(() => {
            configureThyCustomSelectTestingModule([SelectWithThyPlacementComponent]);

            const fixture: ComponentFixture<SelectWithThyPlacementComponent> = TestBed.createComponent(SelectWithThyPlacementComponent);
            fixture.detectChanges();

            const placements: ThyPlacement[] = [
                'top',
                'topLeft',
                'topRight',
                'bottom',
                'bottomLeft',
                'bottomRight',
                'left',
                'leftTop',
                'leftBottom',
                'right',
                'rightTop',
                'rightBottom'
            ];

            placements.forEach(placement => {
                assertPlacement(fixture, placement);
            });
        }));

        it('should support global setting placement in THY_SELECT_CONFIG', fakeAsync(() => {
            const globalPlacement = 'bottomLeft';

            configureThyCustomSelectTestingModule(
                [SelectWithThyPlacementComponent],
                [
                    {
                        provide: THY_SELECT_CONFIG,
                        useValue: {
                            placement: globalPlacement
                        }
                    }
                ]
            );

            const fixture: ComponentFixture<SelectWithThyPlacementComponent> = TestBed.createComponent(SelectWithThyPlacementComponent);
            fixture.detectChanges();

            assertPlacement(fixture, globalPlacement);
        }));

        function assertPlacement(fixture: ComponentFixture<SelectWithThyPlacementComponent>, placement: ThyPlacement) {
            const testComponent = fixture.debugElement.componentInstance;
            testComponent.thyPlacement = placement;
            fixture.detectChanges();

            const selectComponent = fixture.debugElement.query(By.directive(ThySelectCustomComponent)).componentInstance;
            selectComponent.ngOnInit();
            fixture.detectChanges();
            flush();

            let trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            ['originX', 'originY', 'overlayX', 'overlayY'].forEach(key => {
                expect(selectComponent.dropDownPositions[0][key]).toEqual(POSITION_MAP[placement][key]);
            });
        }
    });

    describe('config', () => {
        describe('has default config', () => {
            const scrolledSubject = new Subject();
            beforeEach(async(() =>
                configureThyCustomSelectTestingModule(
                    [BasicSelectComponent],
                    [
                        {
                            provide: ScrollDispatcher,
                            useFactory: () => ({
                                scrolled: () => scrolledSubject
                            })
                        },
                        {
                            provide: THY_SELECT_SCROLL_STRATEGY,
                            deps: [Overlay],
                            useFactory: (overlay: Overlay) => {
                                return () => overlay.scrollStrategies.close();
                            }
                        }
                    ]
                )));

            let fixture: ComponentFixture<BasicSelectComponent>;
            let selectElement: HTMLElement;
            let trigger: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement;
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            });

            it('should close panel when scroll container', () => {
                trigger.click();
                fixture.detectChanges();

                spyOn(fixture.componentInstance.select.cdkConnectedOverlay.overlayRef, 'detach');

                expect(fixture.componentInstance.select.cdkConnectedOverlay.overlayRef.detach).toHaveBeenCalledTimes(0);

                scrolledSubject.next();
                expect(fixture.componentInstance.select.cdkConnectedOverlay.overlayRef.detach).toHaveBeenCalledTimes(1);
            });
        });

        describe('not set default config', () => {
            const scrolledSubject = new Subject();
            beforeEach(async(() =>
                configureThyCustomSelectTestingModule(
                    [BasicSelectComponent],
                    [
                        {
                            provide: ScrollDispatcher,
                            useFactory: () => ({
                                scrolled: () => scrolledSubject
                            })
                        }
                    ]
                )));

            let fixture: ComponentFixture<BasicSelectComponent>;
            let selectElement: HTMLElement;
            let trigger: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement;
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            });

            it('should updatePosition when scroll container', () => {
                trigger.click();
                fixture.detectChanges();

                spyOn(fixture.componentInstance.select.cdkConnectedOverlay.overlayRef, 'updatePosition');
                expect(fixture.componentInstance.select.cdkConnectedOverlay.overlayRef.updatePosition).toHaveBeenCalledTimes(0);

                scrolledSubject.next();
                expect(fixture.componentInstance.select.cdkConnectedOverlay.overlayRef.updatePosition).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('active', () => {
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([BasicSelectComponent]);
        }));
        it('should default active first option when open panel', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(fixture.componentInstance.select.options.toArray()[0]);
            const spy = jasmine.createSpy('keydown spy');
            fromEvent(fixture.debugElement.nativeElement, 'keydown').subscribe(() => {
                spy();
            });

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();

            expect(spy).not.toHaveBeenCalled();
        }));

        it('should not active first option when open panel and thyAutoActiveFirstItem is false', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.componentInstance.thyAutoActiveFirstItem = false;
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select.keyManager.activeItem).toBeFalsy();
            const spy = jasmine.createSpy('keydown spy');
            fromEvent(fixture.debugElement.nativeElement, 'keydown').subscribe(() => {
                spy();
            });

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();

            expect(spy).not.toHaveBeenCalled();
        }));

        it('should active first option when set keycode HOME', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(fixture.componentInstance.select.options.toArray()[1]);
            fixture.detectChanges();
            dispatchKeyboardEvent(trigger, 'keydown', HOME);
            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(fixture.componentInstance.select.options.toArray()[0]);
        }));

        it('should active last option when set keycode END', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', END);
            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(
                fixture.componentInstance.select.options.toArray()[fixture.componentInstance.select.options.length - 1]
            );
        }));

        it('should select correct option when panel is closed', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', END);
            tick();
            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(
                fixture.componentInstance.select.options.toArray()[fixture.componentInstance.select.options.length - 1]
            );
            dispatchKeyboardEvent(trigger, 'keydown', HOME);
            tick();
            expect(fixture.componentInstance.select.keyManager.activeItem).toEqual(fixture.componentInstance.select.options.toArray()[0]);
        }));

        it('should close panel when set keycode arrow', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW, '', { alt: true });
            expect(fixture.componentInstance.select.panelOpen).toBe(false);
        }));
    });

    // describe('async load data', () => {
    //     beforeEach(() => {
    //         configureThyCustomSelectTestingModule([SelectWithAsyncLoadComponent]);
    //     });

    //     it('should dispatch component focus when showSearch is true', fakeAsync(() => {
    //         const fixture = TestBed.createComponent(SelectWithAsyncLoadComponent);
    //         fixture.detectChanges();

    //         fixture.componentInstance.showSearch = true;
    //         fixture.detectChanges();

    //         const componentFocusSpy = spyOn(fixture.componentInstance.customSelect, 'focus');
    //         const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
    //         trigger.click();
    //         fixture.detectChanges();
    //         flush();

    //         fixture.detectChanges();
    //         tick(2000);
    //         fixture.detectChanges();
    //         expect(componentFocusSpy).not.toHaveBeenCalled();

    //         fixture.componentInstance.foods = [
    //             { value: 'steak-0', viewValue: 'Steak' },
    //             { value: 'pizza-1', viewValue: 'Pizza' },
    //             { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
    //             { value: 'sandwich-3', viewValue: 'Sandwich' }
    //         ];
    //         document.body.click();
    //         fixture.detectChanges();
    //         trigger.click();
    //         fixture.detectChanges();
    //         flush();

    //         fixture.detectChanges();
    //         tick(2000);

    //         expect(componentFocusSpy).toHaveBeenCalled();
    //     }));
    // });

    describe('use thyOptions', () => {
        beforeEach(() => {
            configureThyCustomSelectTestingModule([SelectWidthThyOptionsComponent]);
        });

        it('should has correct thyOption component', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWidthThyOptionsComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).toContain('香蕉');
            expect(overlayContainerElement.textContent).toContain('苹果');
            expect(overlayContainerElement.textContent).toContain('橘子');
        }));

        it('should get correct value when click option', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWidthThyOptionsComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const option = overlayContainerElement.querySelector('thy-option') as HTMLElement;
            option.click();
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.selectedValue).toEqual(fixture.componentInstance.options[0].value);
        }));

        it('should show correct when option has group label', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWidthThyOptionsComponent);
            fixture.detectChanges();
            fixture.componentInstance.options = [
                { label: '猫', value: 'cat', groupLabel: 'pet' },
                { label: '狗', value: 'dog', groupLabel: 'pet' },
                { label: '猪', value: 'pig' }
            ];
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            const optionGroup = overlayContainerElement.querySelector('thy-option-group') as HTMLElement;
            const groupName = optionGroup.querySelector('.group-name') as HTMLElement;
            expect(groupName.innerText).toEqual(fixture.componentInstance.options[0].groupLabel);
        }));
    });
});

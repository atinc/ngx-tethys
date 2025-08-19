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
import { Component, ElementRef, OnInit, TemplateRef, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyFormModule } from 'ngx-tethys/form';
import { DOWN_ARROW, END, ENTER, ESCAPE, HOME } from 'ngx-tethys/util';
import { ThySelect, THY_SELECT_CONFIG, THY_SELECT_SCROLL_STRATEGY, ThyDropdownWidthMode, ThySelectModule } from 'ngx-tethys/select';
import { SelectControlSize, ThyOption, ThySelectOptionGroup } from 'ngx-tethys/shared';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SelectMode, THY_SELECT_PANEL_MIN_WIDTH, ThySelectOptionModel } from './custom-select.component';

interface FoodsInfo {
    value: string | string[];
    viewValue: string;
    disabled?: boolean;
}

@Component({
    selector: 'thy-select-basic-test',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select
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
                [thyOrigin]="customizeOrigin"
                [thyFooterTemplate]="footerTmp"
                [thyFooterClass]="footerClass"
                [thyEmptyStateText]="emptyStateText">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
                }
                <ng-template #footer>
                    <a>更多</a>
                </ng-template>
            </thy-select>
        </form>
        <div id="custom-select-origin" #origin style="width: 200px;height: 20px"></div>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class BasicSelectComponent {
    foods: FoodsInfo[] = [
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
    size: SelectControlSize = '';
    mode: 'multiple' | '' = '';
    thyAutoActiveFirstItem = true;
    customizeOrigin: ElementRef | HTMLElement;
    borderless = false;
    footerTmp: TemplateRef<any>;
    footerClass: string;
    emptyStateText: string;
    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
    readonly footerTemplate = viewChild<TemplateRef<any>>('footer');
    readonly origin = viewChild<ElementRef>('origin');
    thyOnScrollToBottom = jasmine.createSpy('thyOnScrollToBottom callback');
}

@Component({
    selector: 'thy-multiple-select',
    template: `
        <thy-select class="foods" [thyMode]="'multiple'" [(ngModel)]="selectedFoods" #Foods thyPlaceHolder="Food">
            @for (food of foods; track food.value) {
                <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
            }
        </thy-select>
        <thy-select class="vegetables" #Vegetables thyPlaceHolder="Vegetables">
            @for (vegetable of vegetables; track vegetable.value) {
                <thy-option [thyValue]="vegetable.value" [thyLabelText]="vegetable.viewValue"> </thy-option>
            }
        </thy-select>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class MultipleSelectComponent {
    foods: FoodsInfo[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    vegetables: Array<{ value: string; viewValue: string }> = [{ value: 'potatoes', viewValue: 'Potatoes' }];

    selectedFoods: any[] = [];

    readonly foodsComponent = viewChild<ThySelect>('Foods');
    readonly vegetablesComponent = viewChild<ThySelect>('Vegetables');
}

@Component({
    selector: 'thy-ng-model-select',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select thyPlaceHolder="Food" ngModel name="food" [thyDisabled]="isDisabled">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyLabelText]="food.viewValue"> </thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class NgModelSelectComponent {
    foods: FoodsInfo[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];
    isDisabled: boolean;

    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    selector: 'thy-select-with-groups',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select thyPlaceHolder="Pokemon" [formControl]="control">
                @for (group of pokemonTypes; track $index) {
                    <thy-option-group [thyGroupLabel]="group.name">
                        @for (pokemon of group.pokemon; track pokemon.value) {
                            <thy-option [thyValue]="pokemon.value" [thyLabelText]="pokemon.viewValue"></thy-option>
                        }
                    </thy-option-group>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThySelectOptionGroup, ThyFormModule, FormsModule, ReactiveFormsModule]
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
            <thy-select placeholder="Food" [(ngModel)]="selectedFoods" name="food">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyLabelText]="food.viewValue"></thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SingleSelectWithPreselectedArrayValuesComponent {
    foods = [
        { value: ['steak-0', 'steak-1'], viewValue: 'Steak' },
        { value: ['pizza-1', 'pizza-2'], viewValue: 'Pizza' },
        { value: ['tacos-2', 'tacos-3'], viewValue: 'Tacos' }
    ];

    selectedFoods = this.foods[1].value;

    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select placeholder="Food" [(ngModel)]="selectedValues" name="food">
                @for (item of values; track item.value) {
                    <thy-option [thyValue]="item.value" [thyLabelText]="item.viewValue"></thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SingleSelectNgModelComponent {
    values = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    selectedValues = this.values[1].value;

    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    selector: 'thy-basic-select-initially-hidden',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select [style.display]="isVisible ? 'block' : 'none'">
                <thy-option thyValue="value" thyLabelText="There are no other options"></thy-option>
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class BasicSelectInitiallyHiddenComponent {
    isVisible = false;
}

@Component({
    selector: 'thy-select-early-sibling-access',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select #select="thySelect"></thy-select>
            @if (select.selected) {
                <div></div>
            }
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectEarlyAccessSiblingComponent {}

@Component({
    selector: 'thy-select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select thyPlaceHolder="Food" [thyShowSearch]="thyShowSearch">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithSearchComponent {
    foods: FoodsInfo[] = [
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
    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    selector: 'thy-select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select thyPlaceHolder="team-members" [thyShowSearch]="thyShowSearch">
                @for (member of teamMembers; track member._id) {
                    <thy-option [thyValue]="member._id" [thyLabelText]="member.name" thySearchKey="{{ member.name }},{{ member.pin_yin }}">
                    </thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithSearchUseSearchKeyComponent {
    teamMembers: Array<{ _id: string; name: string; pin_yin: string }> = [
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
    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    selector: 'thy-select-with-group-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select
                thyPlaceHolder="Pokemon"
                [thyShowSearch]="true"
                [thyEmptySearchMessageText]="thyEmptySearchMessageText"
                [formControl]="control">
                @for (group of pokemonTypes; track $index) {
                    <thy-option-group [thyGroupLabel]="group.name">
                        @for (pokemon of group.pokemon; track pokemon.value) {
                            <thy-option [thyValue]="pokemon.value" [thyLabelText]="pokemon.viewValue"></thy-option>
                        }
                    </thy-option-group>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThySelectOptionGroup, ThyFormModule, FormsModule, ReactiveFormsModule]
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
    readonly select = viewChild<ThySelect>(ThySelect);
}

@Component({
    selector: 'thy-select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select
                thyPlaceHolder="Food"
                name="foods"
                [thyShowSearch]="thyShowSearch"
                [thyServerSearch]="true"
                (thyOnSearch)="thyOnSearch()">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithSearchAndServerSearchComponent {
    foods: FoodsInfo[] = [
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
    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
    thyOnSearch = jasmine.createSpy('thyServerSearch callback');
}

@Component({
    selector: 'thy-basic-select',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select
                thyPlaceHolder="Food"
                [thyMode]="mode"
                style="width:500px"
                [thyAllowClear]="thyAllowClear"
                [(ngModel)]="selectedValue"
                [thyDisabled]="disabled"
                name="Food"
                [required]="isRequired">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectEimtOptionsChangesComponent {
    foods: FoodsInfo[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
        { value: 'sandwich-3', viewValue: 'Sandwich' },
        { value: 'chips-4', viewValue: 'Chips' },
        { value: 'eggs-5', viewValue: 'Eggs' },
        { value: 'pasta-6', viewValue: 'Pasta' },
        { value: 'sushi-7', viewValue: 'Sushi' }
    ];
    mode: SelectMode = 'multiple';
    selectedValue = ['sushi-7'];
    thyAllowClear = true;
    disabled = false;
    isRequired: boolean;
    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    selector: 'thy-select-expand-status',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select [formControl]="control" (thyOnExpandStatusChange)="thyOnExpandStatusChange($event)">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithExpandStatusComponent {
    foods: FoodsInfo[] = [{ value: 'pizza-1', viewValue: 'Pizza' }];
    control = new UntypedFormControl();
    thyOnExpandStatusChange = jasmine.createSpy('thyOnExpandStatusChange callback');
    readonly select = viewChild<ThySelect>(ThySelect);
}

@Component({
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select placeholder="Food" [(ngModel)]="selectedFoods" name="food" [thyMode]="selectMode">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyLabelText]="food.viewValue"></thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithThyModeComponent {
    foods: FoodsInfo[] = [
        { value: ['steak-0', 'steak-1'], viewValue: 'Steak' },
        { value: ['pizza-1', 'pizza-2'], viewValue: 'Pizza' },
        { value: ['tacos-2', 'tacos-3'], viewValue: 'Tacos' }
    ];

    selectMode: SelectMode = 'multiple';

    selectedFoods: string[] = null;

    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select
                placeholder="Food"
                [(ngModel)]="selectedFoods"
                name="food"
                [thyMode]="selectMode"
                [thySortComparator]="thySortComparator">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyLabelText]="food.viewValue"></thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithThySortComparatorComponent {
    foods: FoodsInfo[] = [
        { value: ['steak-0', 'steak-1'], viewValue: 'Steak' },
        { value: ['pizza-1', 'pizza-2'], viewValue: 'Pizza' },
        { value: ['tacos-2', 'tacos-3'], viewValue: 'Tacos' }
    ];

    selectMode: SelectMode = 'multiple';

    thySortComparator: (a: ThyOption, b: ThyOption, options: ThyOption[]) => number;

    selectedFoods: string[] = null;

    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
}

@Component({
    selector: 'thy-auto-expend-select',
    template: `
        <thy-select [thyAutoExpand]="isAutoExpend" style="width:500px;">
            @for (option of listOfOption; track option.value) {
                <thy-option [thyValue]="option.value" [thyLabelText]="option.label"></thy-option>
            }
        </thy-select>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithThyAutoExpendComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    isAutoExpend = true;

    readonly select = viewChild<ThySelect>(ThySelect);

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
        <thy-select [thyPlacement]="thyPlacement" style="width:500px;">
            @for (option of listOfOption; track option.value) {
                <thy-option [thyValue]="option.value" [thyLabelText]="option.label"></thy-option>
            }
        </thy-select>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithThyPlacementComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    thyPlacement: ThyPlacement = 'top';

    readonly select = viewChild<ThySelect>(ThySelect);

    constructor() {}

    ngOnInit() {}
}

@Component({
    selector: 'thy-select-with-scroll-and-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select
                thyPlaceHolder="Food"
                name="foods"
                [thyShowSearch]="showSearch"
                [thyServerSearch]="serverSearch"
                [thyEnableScrollLoad]="true"
                (thyOnSearch)="thyOnSearch($event)">
                @for (food of foods; track food.value) {
                    <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
                }
            </thy-select>
        </form>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithScrollAndSearchComponent {
    foods: FoodsInfo[] = [
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
    readonly select = viewChild<ThySelect>(ThySelect);
    readonly options = viewChildren<ThyOption>(ThyOption);
    thyOnSearch(value: string) {
        timer(100).subscribe(() => {
            this.foods = this.foods.slice(5);
        });
    }
}

@Component({
    selector: 'thy-select-with-load-state',
    template: `
        <thy-select (thyOnExpandStatusChange)="expandChange($event)" [thyLoadState]="loadState" [thyShowSearch]="showSearch">
            @for (food of foods; track food.value) {
                <thy-option [thyValue]="food.value" [thyDisabled]="food.disabled" [thyLabelText]="food.viewValue"> </thy-option>
            }
        </thy-select>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
})
class SelectWithAsyncLoadComponent implements OnInit {
    readonly customSelect = viewChild<ThySelect>(ThySelect);

    loadState = true;

    showSearch = false;

    foods: FoodsInfo[] = [];

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
            <thy-select class="select1" [thyDropdownWidthMode]="dropdownWidthMode" [(ngModel)]="selectedValue">
                @for (option of options; track option.value) {
                    <thy-option [thyValue]="option.value" [thyLabelText]="option.viewValue"> </thy-option>
                }
            </thy-select>
        </div>
        <div style="width:100px">
            <thy-select class="select2" [(ngModel)]="selectedValue">
                @for (option of options; track option.value) {
                    <thy-option [thyValue]="option.value" [thyLabelText]="option.viewValue"> </thy-option>
                }
            </thy-select>
        </div>
    `,
    imports: [ThySelect, ThyOption, ThyFormModule, FormsModule, ReactiveFormsModule]
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
            <thy-select [thyOptions]="options" class="select1" [(ngModel)]="selectedValue"> </thy-select>
        </div>
    `,
    imports: [ThySelect, ThyOption, ThySelectOptionGroup, ThyFormModule, FormsModule, ReactiveFormsModule]
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
    let overlayContainer!: OverlayContainer;
    let overlayContainerElement!: HTMLElement;
    let platform!: Platform;

    function configureThyCustomSelectTestingModule(providers: any[] = []) {
        TestBed.configureTestingModule({
            imports: [ThySelectModule],
            providers: [bypassSanitizeProvider, ...providers, provideHttpClient(), provideNoopAnimations()]
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
            configureThyCustomSelectTestingModule();
        });

        describe('basic class', () => {
            let fixture!: ComponentFixture<BasicSelectComponent>;
            let selectElement!: HTMLElement;

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
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();
                flush();

                const componentInstance = fixture.debugElement.query(By.directive(ThySelect)).componentInstance;
                expect(componentInstance.dropDownPositions[0].originY).toEqual('bottom');
            }));

            it('should get right item count when invoke itemCount method', () => {
                const ins = fixture.componentInstance.select();
                expect(fixture.componentInstance.foods.length).toEqual(ins.getItemCount());
            });

            it('should get correct mode when get thyMode', () => {
                fixture.componentInstance.mode = 'multiple';
                fixture.detectChanges();
                expect(fixture.componentInstance.select().thyMode()).toEqual('multiple');
            });

            it('select component modelValue will be null when multiple is false and changeValue length is 0', () => {
                fixture.componentInstance.mode = '';
                const selectComponent = fixture.componentInstance.select();
                selectComponent.selectionModel.clear();
                fixture.detectChanges();
                selectComponent.clearSelectValue();
                fixture.detectChanges();
                expect(selectComponent.modalValue).toBeNull();
            });

            it('should auto focus to input element when select focus', fakeAsync(() => {
                const customSelectDebugElement = fixture.debugElement.query(By.directive(ThySelect));
                fixture.detectChanges();
                const focusSpy = spyOn(fixture.componentInstance.select(), 'onFocus').and.callThrough();

                dispatchFakeEvent(customSelectDebugElement.nativeElement, 'focus');
                fixture.detectChanges();
                flush();

                expect(focusSpy).toHaveBeenCalled();

                fixture.componentInstance.select().onFocus({ relatedTarget: fixture.debugElement } as any);
                fixture.detectChanges();

                const inputElement = fixture.nativeElement.querySelector('input');
                expect(document.activeElement).toEqual(inputElement);
            }));

            it(`should update manualFocusing when manual focus select`, fakeAsync(() => {
                fixture.detectChanges();
                let focusCalled = false;
                spyOn(selectElement, 'focus').and.callFake(() => {
                    focusCalled = true;
                    expect(fixture.componentInstance.select()['manualFocusing']).toBe(true);
                });
                fixture.componentInstance.select().focus();
                expect(fixture.componentInstance.select()['manualFocusing']).toBe(false);
                expect(focusCalled).toBe(true);
            }));

            it(`should can't call input focus when manual focusing select for close`, fakeAsync(() => {
                fixture.detectChanges();
                const input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input');
                expect(input).toBeTruthy();
                const focusSpy = spyOn(input, 'focus');
                fixture.componentInstance.select()['manualFocusing'] = true;
                fixture.componentInstance.select().onFocus({ relatedTarget: input } as unknown as FocusEvent);
                expect(focusSpy).not.toHaveBeenCalled();
                expect(fixture.componentInstance.select()['manualFocusing']).toBe(false);
                fixture.componentInstance.select().onFocus({ relatedTarget: fixture.debugElement.nativeElement } as unknown as FocusEvent);
                expect(focusSpy).toHaveBeenCalled();
            }));

            it('should call onBlur methods when blur', fakeAsync(() => {
                const customSelectDebugElement = fixture.debugElement.query(By.directive(ThySelect));
                fixture.detectChanges();
                const blurSpy = spyOn(fixture.componentInstance.select(), 'onBlur').and.callThrough();

                dispatchFakeEvent(customSelectDebugElement.nativeElement, 'blur');
                fixture.detectChanges();

                flush();

                expect(blurSpy).toHaveBeenCalled();
            }));

            it('should call blur and not call onTouchFn when blur', fakeAsync(() => {
                const blurSpy = spyOn<any>(fixture.componentInstance.select(), 'onTouchedFn');
                const trigger = fixture.debugElement.query(By.css('.select-control-search input')).nativeElement;
                fixture.componentInstance.select().onBlur({ relatedTarget: trigger } as FocusEvent);

                fixture.detectChanges();

                expect(blurSpy).not.toHaveBeenCalled();
            }));

            it('should call onTouchFn when value change in single mode', () => {
                const blurSpy = spyOn<any>(fixture.componentInstance.select(), 'onTouchedFn');
                const optionInstances = fixture.componentInstance.options();
                optionInstances[1].select();
                fixture.detectChanges();
                optionInstances[1].deselect();
                fixture.detectChanges();
                expect(blurSpy).toHaveBeenCalled();
            });

            it('should not call onTouchFn when value change in multiple mode', () => {
                fixture.componentInstance.mode = 'multiple';
                fixture.detectChanges();
                const blurSpy = spyOn<any>(fixture.componentInstance.select(), 'onTouchedFn');
                const optionInstances = fixture.componentInstance.options();
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
            let fixture!: ComponentFixture<BasicSelectComponent>;

            beforeEach(waitForAsync(() => {
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
                sizes.forEach((size: SelectControlSize) => {
                    fixture.componentInstance.size = size;
                    fixture.detectChanges();
                    expect(formControl.classList.contains(`form-control-${size}`)).toBeTruthy();
                });
            });
        });

        describe('overlay panel', () => {
            let fixture!: ComponentFixture<BasicSelectComponent>;
            let trigger!: HTMLElement;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            }));

            it('should not throw when attempting to open too early', () => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                expect(() => fixture.componentInstance.select().open()).not.toThrow();
            });

            it('should open the panel when trigger is clicked', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.select().panelOpen).toBe(true);
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
                expect(fixture.componentInstance.select().panelOpen).toBe(false);
            }));

            it('should remove select active item when mousemove', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                const el = overlayContainerElement.querySelector('.thy-select-dropdown') as HTMLElement;
                dispatchMouseEvent(el, 'mousemove');
                expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(null);
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
                expect(fixture.componentInstance.select().panelOpen).toBe(false);
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
                const selectSelectCustomComponentDebugElement = fixture.debugElement.query(By.directive(ThySelect));
                const resizedSpy = spyOn(selectSelectCustomComponentDebugElement.componentInstance, 'getOriginRectWidth');
                trigger.style.width = '300px';
                resizedSpy.and.callThrough();

                trigger.click();
                fixture.detectChanges();
                flush();

                const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

                const initialWidth = parseInt(pane.style.width || '0');

                expect(initialWidth).toBeGreaterThan(0);

                setTimeout(() => {
                    fixture.whenStable().then(() => {
                        trigger.style.width = '400px';
                        resizedSpy.and.callThrough();
                        fixture.detectChanges();
                        setTimeout(() => {
                            fixture.whenStable().then(() => {
                                expect(resizedSpy).toHaveBeenCalledTimes(1);
                            });
                        }, 0);
                        tick(100);
                    });
                }, 0);
                tick(100);

                // expect(parseInt(pane.style.width || '0')).toBeGreaterThan(initialWidth);
            }));

            it('should attempt to open a select that does not have any options', fakeAsync(() => {
                fixture.componentInstance.foods = [];
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();

                expect(fixture.componentInstance.select().panelOpen).toBe(true);

                expect(fixture.componentInstance.select().options.length).toBe(0);

                flush();
            }));

            it('should show default emptyStateText when does not have any options', fakeAsync(() => {
                fixture.componentInstance.foods = [];
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();

                expect(overlayContainerElement.textContent).toContain(fixture.componentInstance.select().thyEmptyStateText());
                flush();
            }));

            it('should show thyEmptyStateText when assign thyEmptyStateText property', fakeAsync(() => {
                const thyEmptyStateText = '无任何内容';
                fixture.componentInstance.foods = [];
                fixture.componentInstance.emptyStateText = thyEmptyStateText;
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

                expect(fixture.componentInstance.select().panelOpen).toBe(true);

                dispatchKeyboardEvent(trigger, 'keydown', ESCAPE);
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.select().panelOpen).toBe(false);
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
                fixture.componentInstance.customizeOrigin = fixture.componentInstance.origin();
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();
                flush();
                const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
                expect(pane.style.width).toBe('200px');
            }));

            it('should custom origin effected when origin is htmlElement', fakeAsync(() => {
                fixture.componentInstance.customizeOrigin = fixture.debugElement.query(By.css('#custom-select-origin')).nativeElement;
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();
                flush();
                const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
                expect(pane.style.width).toBe('200px');
            }));
        });

        describe('thyFooter', () => {
            let fixture!: ComponentFixture<BasicSelectComponent>;
            let trigger!: HTMLElement;

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
                fixture.componentInstance.footerTmp = fixture.componentInstance.footerTemplate();
                trigger.click();
                fixture.detectChanges();
                flush();
                const footerElement = overlayContainer.getContainerElement().querySelector('.thy-custom-select-footer');
                expect(footerElement).toBeTruthy();
            }));

            it('should show thyFooterTemplate with custom-footer-class when thyFooterTemplate had been assign', fakeAsync(() => {
                const footerClass = 'custom-footer-class';
                fixture.componentInstance.footerTmp = fixture.componentInstance.footerTemplate();
                fixture.componentInstance.footerClass = footerClass;
                trigger.click();
                fixture.detectChanges();
                flush();
                const footerElement = overlayContainer.getContainerElement().querySelector(`.${footerClass}`);
                expect(footerElement).toBeTruthy();
            }));
        });

        describe('close logic', () => {
            let fixture!: ComponentFixture<MultipleSelectComponent>;

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

                expect(fixture.componentInstance.foodsComponent().panelOpen).toBe(true);

                vegetablesTrigger.click();
                fixture.detectChanges();
                flush();

                expect(fixture.componentInstance.foodsComponent().panelOpen).toBe(false);
            }));

            it('should handle Ctrl + A correctly', fakeAsync(() => {
                const foodsTrigger = fixture.debugElement.query(By.css('.foods .form-control-custom')).nativeElement;
                foodsTrigger.click();
                fixture.detectChanges();
                flush();
                dispatchKeyboardEvent(foodsTrigger, 'keydown', 65, 'a', { control: true });
                fixture.detectChanges();
                tick(1000);
                fixture.detectChanges();
                expect(foodsTrigger.querySelectorAll('.choice-item').length).toBe(7);
            }));
        });

        describe('selection logic', () => {
            let fixture!: ComponentFixture<BasicSelectComponent>;
            let trigger!: HTMLElement;
            let form!: HTMLElement;

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
                expect(fixture.componentInstance.options()[0].selected()).toEqual(true);
                expect(fixture.componentInstance.select().selectionModel.selected[0]).toBe(fixture.componentInstance.options()[0]);
            }));

            it('should be able to select to an option using th ThyOptionComponent API', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                const optionInstances = fixture.componentInstance.options();
                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('thy-option');

                optionInstances[1].select();
                fixture.detectChanges();
                flush();
                expect(optionNodes[1].classList).toContain('active');
                expect(optionInstances[1].selected()).toBe(true);
                expect(fixture.componentInstance.select().selectionModel.selected[0]).toBe(optionInstances[1]);
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

                const optionInstances = fixture.componentInstance.options();
                expect(optionInstances[1].selected()).toBe(false);
                expect(optionInstances[2].selected()).toBe(false);
            }));
        });

        describe('select expand status change', () => {
            let fixture!: ComponentFixture<SelectWithExpandStatusComponent>;
            let trigger!: HTMLElement;

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
            let fixture!: ComponentFixture<SelectWithScrollAndSearchComponent>;
            let fixtureIns!: SelectWithScrollAndSearchComponent;
            beforeEach(waitForAsync(() => {
                fixture = TestBed.createComponent(SelectWithScrollAndSearchComponent);
                fixtureIns = fixture.componentInstance;
                fixture.detectChanges();
            }));

            it('should scroll to active item when thyEnableScrollLoad and thyServerSearch is true', fakeAsync(() => {
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                tick(100);
                trigger.click();
                fixture.detectChanges();

                const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
                typeInElement('any word', input);
                fixture.detectChanges();
                expect(fixtureIns.select()['isSearching']).toBeTruthy();
                tick(200);
                fixture.detectChanges();
                expect(fixtureIns.select()['isSearching']).toBeFalsy();

                expect(fixtureIns.select().keyManager.activeItem).toEqual(fixtureIns.select().options.toArray()[0]);
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
                expect(fixtureIns.select()['isSearching']).toBeFalsy();
                flush();
            }));

            it('should close panel when dispatch toggle at thyShowSearch is false', fakeAsync(() => {
                fixture.componentInstance.showSearch = false;
                fixture.componentInstance.serverSearch = false;
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();

                expect(fixture.componentInstance.select().panelOpen).toBeTruthy();

                trigger.click();
                fixture.detectChanges();
                expect(fixture.componentInstance.select().panelOpen).toBeFalsy();
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
        let containerSelector!: string;

        it('should support thyDropdownWidthMode to set cdkConnectedOverlayMinWidth', fakeAsync(() => {
            configureThyCustomSelectTestingModule();

            const fixture: ComponentFixture<SelectDropdownWidthComponent> = TestBed.createComponent(SelectDropdownWidthComponent);
            fixture.detectChanges();

            containerSelector = '.select1';
            assertDropdownMinWidth(fixture, 'match-select', 'width', 100);
            assertDropdownMinWidth(fixture, 'min-width', 'minWidth', THY_SELECT_PANEL_MIN_WIDTH);
            assertDropdownMinWidth(fixture, { minWidth: 300 }, 'minWidth', 300);
        }));

        it('should support global setting dropdownWidthMode in THY_SELECT_CONFIG', () => {
            configureThyCustomSelectTestingModule([
                {
                    provide: THY_SELECT_CONFIG,
                    useValue: {
                        dropdownWidthMode: 'min-width'
                    }
                }
            ]);

            const fixture: ComponentFixture<SelectDropdownWidthComponent> = TestBed.createComponent(SelectDropdownWidthComponent);
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
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule()));

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
            expect(fixture.componentInstance.select().panelOpen).toBe(false, `Expected select panelOpen property to stay false.`);

            fixture.componentInstance.isDisabled = false;
            fixture.detectChanges();
            flush();

            expect(trigger.classList).not.toContain('disabled');

            trigger.click();
            fixture.detectChanges();

            expect(overlayContainerElement.textContent).toContain('Steak', `Expected select panel to open normally on re-enabled control`);
            expect(fixture.componentInstance.select().panelOpen).toBe(true, `Expected select panelOpen property to become true.`);
        }));
    });

    describe('with preselected array values', () => {
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule()));

        it('should be able to preselect an array value in single-selection mode', fakeAsync(() => {
            const fixture = TestBed.createComponent(SingleSelectWithPreselectedArrayValuesComponent);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;

            expect(trigger.textContent).toContain('Pizza');
            expect(fixture.componentInstance.options()[1].selected()).toBe(true);
        }));
    });

    describe('single choice when ngModel value change', () => {
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule()));

        it('should clear selection model for single choice when ngModel value change ', fakeAsync(() => {
            const fixture = TestBed.createComponent(SingleSelectNgModelComponent);
            fixture.detectChanges();
            const optionComponents = fixture.componentInstance.options();
            fixture.componentInstance.selectedValues = null;
            fixture.detectChanges();
            flush();
            expect(optionComponents[0].selected()).toBe(false);
            expect(optionComponents[1].selected()).toBe(false);
            expect(optionComponents[2].selected()).toBe(false);
        }));
    });

    describe('when initially hidden', () => {
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule()));

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
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule()));

        it('should not throw when trying to access the selected value on init', fakeAsync(() => {
            expect(() => {
                TestBed.createComponent(SelectEarlyAccessSiblingComponent).detectChanges();
            }).not.toThrow();
        }));
    });

    describe('search logic', () => {
        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
        }));
        it('should show thy-input-search when set thyShowSearch', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchComponent);
            fixture.detectChanges();

            expect(fixture.componentInstance.select().thyShowSearch()).toBe(false);

            fixture.componentInstance.thyShowSearch = true;
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            expect(fixture.componentInstance.select().thyShowSearch()).toBe(true);
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

            const options = fixture.componentInstance.select().options.toArray();

            expect(options[0].hidden()).toBe(false);
            expect(options[1].hidden()).toBe(true);
            const optionNodes = overlayContainerElement.querySelectorAll('thy-option') as NodeListOf<HTMLElement>;
            expect(optionNodes[0].classList).not.toContain('hidden');
            expect(optionNodes[1].classList).toContain('hidden');

            typeInElement('', input);
            fixture.detectChanges();
            flush();

            expect(options[0].hidden()).toBe(false);
            expect(options[1].hidden()).toBe(false);
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

            const options = fixture.componentInstance.select().options.toArray();
            const optionNodes = overlayContainerElement.querySelectorAll('thy-option') as NodeListOf<HTMLElement>;

            expect(options[1].hidden()).toBe(false);
            expect(optionNodes[1].classList).not.toContain('hidden');

            typeInElement('other', input);
            fixture.detectChanges();
            flush();

            expect(options[1].hidden()).toBe(true);
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

            const options = fixture.componentInstance.select().options.toArray();
            expect(options[0].hidden()).toBe(false);
        }));
        it('should hide the thy-group when all options of the group is hidden', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchAndGroupComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            const groups = fixture.componentInstance.select().contentGroups();
            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
            tick(100);
            typeInElement('Cat', input);

            tick(1000);
            fixture.detectChanges();
            flush();

            expect(groups[0].hidden()).toBe(false);
            expect(groups[1].hidden()).toBe(true);

            typeInElement('cat2', input);

            tick(1000);
            fixture.detectChanges();
            flush();

            expect(groups[0].hidden()).toBe(true);
            expect(groups[1].hidden()).toBe(true);
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
            tick(100);
            trigger.click();
            fixture.detectChanges();

            expect(overlayContainerElement.querySelector('thy-empty')).not.toBeTruthy();

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
        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
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

            fixture.componentInstance.select().disabled = true;
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

            const blurSpy = spyOn<any>(fixture.componentInstance.select(), 'onTouchedFn');
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

            const blurSpy = spyOn<any>(fixture.componentInstance.select(), 'onTouchedFn');
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
        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
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
        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
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

            expect(fixture.componentInstance.select().panelOpen).toBe(true);
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

            expect(fixture.componentInstance.select().panelOpen).toBe(false);
        }));

        it('should clear selected status when thyMode change', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const optionComponents = fixture.componentInstance.options();
            const options = overlayContainerElement.querySelectorAll('thy-option');

            (options.item(0) as HTMLElement).click();
            (options.item(1) as HTMLElement).click();

            const backdrop = fixture.debugElement.nativeElement.querySelector('form') as HTMLElement;
            backdrop.click();

            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected()).toBe(true);
            expect(optionComponents[1].selected()).toBe(true);

            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected()).toBe(false);
            expect(optionComponents[1].selected()).toBe(false);

            trigger.click();
            fixture.detectChanges();
            flush();
            (options.item(0) as HTMLElement).click();
            expect(optionComponents[0].selected()).toBe(true);

            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected()).toBe(false);
        }));

        it('should not clear status when the thyMode value is not change', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            const optionComponents = fixture.componentInstance.options();
            const options = overlayContainerElement.querySelectorAll('thy-option');

            (options.item(0) as HTMLElement).click();
            (options.item(1) as HTMLElement).click();

            const backdrop = fixture.debugElement.nativeElement.querySelector('form') as HTMLElement;
            backdrop.click();

            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected()).toBe(true);
            expect(optionComponents[1].selected()).toBe(true);

            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected()).toBe(true);
            expect(optionComponents[1].selected()).toBe(true);
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
            const optionComponents = fixture.componentInstance.options();
            expect(optionComponents[0].selected()).toBe(true);
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();
            expect(optionComponents[0].selected()).toBe(false);
            expect(optionComponents[1].selected()).toBe(true);
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

            const optionComponents = fixture.componentInstance.options();

            (options.item(0) as HTMLElement).click();
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            expect(optionComponents[0].selected()).toBe(true);
            expect(optionComponents[1].selected()).toBe(true);
        }));
    });

    describe('thySortComparator', () => {
        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
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
        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
        }));

        it('should set first option active when open panel', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[0]
            );
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

            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[1]
            );
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
            expect(fixture.componentInstance.select().panelOpen).toBeFalsy();

            trigger.click();
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[1]
            );
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

            expect(fixture.componentInstance.options()[0].selected()).toEqual(true);
            expect(fixture.componentInstance.select().selectionModel.selected[0]).toBe(fixture.componentInstance.options()[0]);
        }));

        it('should open the panel when press enter on trigger', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select().panelOpen).toEqual(true);
        }));

        it('should select an option when press down_arrow on trigger', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.options()[0].selected()).toEqual(true);
            expect(fixture.componentInstance.select().selectionModel.selected[0]).toBe(fixture.componentInstance.options()[0]);
        }));
    });

    describe('autoExpend', () => {
        let fixture!: ComponentFixture<SelectWithThyAutoExpendComponent>;

        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
        }));

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(SelectWithThyAutoExpendComponent);
            fixture.detectChanges();
            tick(1000);
        }));

        it('auto expend', fakeAsync(() => {
            expect(fixture.componentInstance.select().panelOpen).toBe(true);
        }));
    });

    describe('placement', () => {
        it('should support thyPlacement', fakeAsync(() => {
            configureThyCustomSelectTestingModule();

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

            configureThyCustomSelectTestingModule([
                {
                    provide: THY_SELECT_CONFIG,
                    useValue: {
                        placement: globalPlacement
                    }
                }
            ]);

            const fixture: ComponentFixture<SelectWithThyPlacementComponent> = TestBed.createComponent(SelectWithThyPlacementComponent);
            fixture.detectChanges();

            assertPlacement(fixture, globalPlacement);
        }));

        function assertPlacement(fixture: ComponentFixture<SelectWithThyPlacementComponent>, placement: ThyPlacement) {
            const testComponent = fixture.debugElement.componentInstance;
            testComponent.thyPlacement = placement;
            fixture.detectChanges();

            const selectComponent = fixture.debugElement.query(By.directive(ThySelect)).componentInstance;
            selectComponent.ngOnInit();
            fixture.detectChanges();
            flush();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
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
            const scrolledSubject = new Subject<void>();
            beforeEach(waitForAsync(() =>
                configureThyCustomSelectTestingModule([
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
                ])));

            let fixture!: ComponentFixture<BasicSelectComponent>;
            let selectElement!: HTMLElement;
            let trigger!: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement;
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            });

            it('should close panel when scroll container', () => {
                trigger.click();
                fixture.detectChanges();

                spyOn(fixture.componentInstance.select().cdkConnectedOverlay().overlayRef, 'detach');

                expect(fixture.componentInstance.select().cdkConnectedOverlay().overlayRef.detach).toHaveBeenCalledTimes(0);

                scrolledSubject.next();
                expect(fixture.componentInstance.select().cdkConnectedOverlay().overlayRef.detach).toHaveBeenCalledTimes(1);
            });
        });

        describe('not set default config', () => {
            const scrolledSubject = new Subject<void>();
            beforeEach(waitForAsync(() =>
                configureThyCustomSelectTestingModule([
                    {
                        provide: ScrollDispatcher,
                        useFactory: () => ({
                            scrolled: () => scrolledSubject
                        })
                    }
                ])));

            let fixture!: ComponentFixture<BasicSelectComponent>;
            let selectElement!: HTMLElement;
            let trigger!: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement;
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            });

            it('should updatePosition when scroll container', () => {
                trigger.click();
                fixture.detectChanges();

                spyOn(fixture.componentInstance.select().cdkConnectedOverlay().overlayRef, 'updatePosition');
                expect(fixture.componentInstance.select().cdkConnectedOverlay().overlayRef.updatePosition).toHaveBeenCalledTimes(0);

                scrolledSubject.next();
                expect(fixture.componentInstance.select().cdkConnectedOverlay().overlayRef.updatePosition).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('active', () => {
        beforeEach(waitForAsync(() => {
            configureThyCustomSelectTestingModule();
        }));
        it('should default active first option when open panel', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[0]
            );
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

            expect(fixture.componentInstance.select().keyManager.activeItem).toBeFalsy();
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
            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[1]
            );
            fixture.detectChanges();
            dispatchKeyboardEvent(trigger, 'keydown', HOME);
            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[0]
            );
        }));

        it('should active last option when set keycode END', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', END);
            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[fixture.componentInstance.select().options.length - 1]
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
            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[fixture.componentInstance.select().options.length - 1]
            );
            dispatchKeyboardEvent(trigger, 'keydown', HOME);
            tick();
            expect(fixture.componentInstance.select().keyManager.activeItem).toEqual(
                fixture.componentInstance.select().options.toArray()[0]
            );
        }));

        it('should close panel when set keycode arrow', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW, '', { alt: true });
            expect(fixture.componentInstance.select().panelOpen).toBe(false);
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
            configureThyCustomSelectTestingModule();
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

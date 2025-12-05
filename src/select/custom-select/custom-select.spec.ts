import { ConnectionPositionPair, Overlay, OverlayContainer, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { provideHttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { POSITION_MAP, ThyPlacement } from 'ngx-tethys/core';
import { ThyFormModule } from 'ngx-tethys/form';
import { THY_SELECT_CONFIG, THY_SELECT_SCROLL_STRATEGY, ThyDropdownWidthMode, ThySelect, ThySelectModule } from 'ngx-tethys/select';
import { SelectControlSize, ThyOption, ThyOptionGroupRender, ThyOptionRender, ThySelectOptionGroup } from 'ngx-tethys/shared';
import {
    bypassSanitizeProvider,
    dispatchFakeEvent,
    dispatchKeyboardEvent,
    dispatchMouseEvent,
    injectDefaultSvgIconSet,
    typeInElement
} from 'ngx-tethys/testing';
import { THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER } from 'ngx-tethys/tooltip';
import { DOWN_ARROW, END, ENTER, ESCAPE, HOME } from 'ngx-tethys/util';
import { fromEvent, Subject, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
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
        { value: 'sushi-7', viewValue: 'Bref' },
        { value: 'sushi-8', viewValue: 'Tomato' },
        { value: 'sushi-9', viewValue: 'Apple' },
        { value: 'sushi-10', viewValue: 'Banana' },
        { value: 'sushi-11', viewValue: 'Orange' },
        { value: 'sushi-12', viewValue: 'Pear' },
        { value: 'sushi-13', viewValue: 'Pineapple' },
        { value: 'sushi-14', viewValue: 'Strawberry' }
    ];
    selectDisabled = false;
    control = new UntypedFormControl();
    isRequired!: boolean;
    enableScrollLoad!: boolean;
    size: SelectControlSize = '';
    mode: 'multiple' | '' = '';
    thyAutoActiveFirstItem = true;
    customizeOrigin!: ElementRef | HTMLElement;
    borderless = false;
    footerTmp!: TemplateRef<any>;
    footerClass!: string;
    emptyStateText!: string;
    readonly select = viewChild.required<ThySelect>(ThySelect);
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
    vegetables: { value: string; viewValue: string }[] = [{ value: 'potatoes', viewValue: 'Potatoes' }];

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
    isDisabled!: boolean;

    readonly select = viewChild.required<ThySelect>(ThySelect);
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

    readonly select = viewChild.required<ThySelect>(ThySelect);
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

    selectedValues: string | null = this.values[1].value;

    readonly select = viewChild.required<ThySelect>(ThySelect);
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
    readonly select = viewChild.required<ThySelect>(ThySelect);
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
    teamMembers: { _id: string; name: string; pin_yin: string }[] = [
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
    readonly select = viewChild.required<ThySelect>(ThySelect);
}

@Component({
    selector: 'thy-select-with-group-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-select
                thyPlaceHolder="Pokemon"
                [thyShowSearch]="true"
                [thyEmptySearchMessageText]="emptySearchMessageText"
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
    emptySearchMessageText = 'empty result';
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
    isRequired!: boolean;
    readonly select = viewChild.required<ThySelect>(ThySelect);
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

    selectedFoods: string[] | null = null;

    readonly select = viewChild.required<ThySelect>(ThySelect);
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

    thySortComparator?: (a: ThyOption, b: ThyOption, options: ThyOption[]) => number;

    selectedFoods: string[] | null = null;

    readonly select = viewChild<ThySelect>(ThySelect);
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

    readonly select = viewChild.required<ThySelect>(ThySelect);

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
                (thyOnSearch)="search($event)">
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
    readonly select = viewChild.required<ThySelect>(ThySelect);

    search(value: string) {
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
    dropdownWidthMode!: ThyDropdownWidthMode | null;

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
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    function configureThyCustomSelectTestingModule(providers: any[] = []) {
        TestBed.configureTestingModule({
            imports: [ThySelectModule],
            providers: [
                bypassSanitizeProvider,
                ...providers,
                provideHttpClient(),
                provideNoopAnimations(),
                THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER
            ]
        }).compileComponents();

        inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
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
            let fixture: ComponentFixture<BasicSelectComponent>;
            let selectElement: HTMLElement;
            let trigger: HTMLElement;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement;
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            }));

            it('should get correct class', () => {
                expect(selectElement).toBeTruthy();
                expect(selectElement.classList.contains('thy-select')).toBeTruthy();
            });

            it('should get correct icon element', () => {
                const iconElement = selectElement.querySelector('.thy-icon');
                expect(iconElement).toBeTruthy();
                expect(iconElement!.classList.contains('thy-icon-angle-down')).toBeTruthy();
            });

            it('should get default placement', fakeAsync(() => {
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();
                flush();

                const componentInstance = fixture.debugElement.query(By.directive(ThySelect)).componentInstance;
                expect(componentInstance.dropDownPositions()[0].originY).toEqual('bottom');
            }));

            it('should get correct mode when get thyMode', () => {
                fixture.componentInstance.mode = 'multiple';
                fixture.detectChanges();
                expect(fixture.componentInstance.select().thyMode()).toEqual('multiple');
            });

            it('select component modelValue will be null when multiple is false and changeValue length is 0', () => {
                fixture.componentInstance.mode = '';
                const selectComponent = fixture.componentInstance.select();
                selectComponent.clearSelectValue();
                fixture.detectChanges();
                expect(selectComponent.selectedValues().length).toBe(0);
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

            it('should call onTouchFn when value change in single mode', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                tick(100);
                fixture.detectChanges();

                const blurSpy = spyOn<any>(fixture.componentInstance.select(), 'onTouchedFn');
                const optionInstances = fixture.componentInstance.select().optionRenders.toArray();
                optionInstances[1].select();
                fixture.detectChanges();
                optionInstances[1].deselect();
                fixture.detectChanges();
                expect(blurSpy).toHaveBeenCalled();
            }));

            it('should not call onTouchFn when value change in multiple mode', fakeAsync(() => {
                fixture.componentInstance.mode = 'multiple';
                fixture.detectChanges();

                trigger.click();
                fixture.detectChanges();
                flush();

                tick(100);
                fixture.detectChanges();

                const blurSpy = spyOn<any>(fixture.componentInstance.select(), 'onTouchedFn');
                const optionInstances = fixture.componentInstance.select().optionRenders.toArray();
                optionInstances[1].select();
                fixture.detectChanges();
                optionInstances[1].deselect();
                fixture.detectChanges();
                expect(blurSpy).not.toHaveBeenCalled();
            }));

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
                const sizes: SelectControlSize[] = ['xs', 'sm', 'md', 'lg'];
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
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                expect(fixture.componentInstance.select().panelOpen).toBe(true);
                expect(overlayContainerElement.textContent).toContain('Steak');
                expect(overlayContainerElement.textContent).toContain('Pizza');
                expect(overlayContainerElement.textContent).toContain('Tacos');
            }));

            it('should close the panel when an item is clicked', fakeAsync(() => {
                trigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                const option = overlayContainerElement.querySelector('thy-option-render') as HTMLElement;
                option.click();

                fixture.detectChanges();
                flush();

                expect(overlayContainerElement.textContent).toEqual('');
                expect(fixture.componentInstance.select().panelOpen).toBe(false);
            }));

            it('should remove activated option when mouseleave', fakeAsync(() => {
                trigger.click();
                fixture.detectChanges();
                flush();

                const el = overlayContainerElement.querySelector('.thy-select-scroll-viewport') as HTMLElement;
                dispatchMouseEvent(el, 'mouselease');
                expect(fixture.componentInstance.select().activatedValue()).toEqual(null);
            }));

            it('should exec thyOnScrollToBottom when thyEnableScrollLoad is true', fakeAsync(() => {
                fixture.componentInstance.enableScrollLoad = true;
                const spy = fixture.componentInstance.thyOnScrollToBottom;

                trigger.click();
                fixture.detectChanges();
                flush();

                const viewport = fixture.componentInstance.select().cdkVirtualScrollViewport();
                expect(viewport).toBeTruthy();

                const scrollIndex = 8;
                fixture.componentInstance.select().optionsScrolled(scrollIndex);
                fixture.detectChanges();

                expect(spy).toHaveBeenCalled();
            }));

            it('should not exec thyOnScrollToBottom when thyEnableScrollLoad is false', fakeAsync(() => {
                fixture.componentInstance.enableScrollLoad = false;
                const spy = fixture.componentInstance.thyOnScrollToBottom;

                trigger.click();
                fixture.detectChanges();
                flush();

                const viewport = fixture.componentInstance.select().cdkVirtualScrollViewport();
                expect(viewport).toBeTruthy();

                const scrollIndex = 8;
                fixture.componentInstance.select().optionsScrolled(scrollIndex);
                fixture.detectChanges();

                expect(spy).not.toHaveBeenCalled();
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

                expect(fixture.componentInstance.select().optionRenders.toArray().length).toBe(0);

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
                flush();
                groupFixture.detectChanges();
                tick(100);
                groupFixture.detectChanges();
                expect(document.querySelectorAll('.cdk-overlay-container thy-option-render').length).toBeGreaterThan(
                    0,
                    'Expected at least one option to be rendered.'
                );
            }));

            it('should custom origin effected when origin is elementRef', fakeAsync(() => {
                fixture.componentInstance.customizeOrigin = fixture.componentInstance.origin()!;
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
                fixture.componentInstance.footerTmp = fixture.componentInstance.footerTemplate()!;
                trigger.click();
                fixture.detectChanges();
                flush();
                const footerElement = overlayContainer.getContainerElement().querySelector('.thy-custom-select-footer');
                expect(footerElement).toBeTruthy();
            }));

            it('should show thyFooterTemplate with custom-footer-class when thyFooterTemplate had been assign', fakeAsync(() => {
                const footerClass = 'custom-footer-class';
                fixture.componentInstance.footerTmp = fixture.componentInstance.footerTemplate()!;
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
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                expect(fixture.componentInstance.foodsComponent()!.panelOpen).toBe(true);

                vegetablesTrigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                expect(fixture.componentInstance.foodsComponent()!.panelOpen).toBe(false);
            }));

            it('should handle Ctrl + A correctly', fakeAsync(() => {
                const foodsTrigger = fixture.debugElement.query(By.css('.foods .form-control-custom')).nativeElement;
                foodsTrigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();
                dispatchKeyboardEvent(foodsTrigger, 'keydown', 65, 'a', { control: true });
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();
                expect(foodsTrigger.querySelectorAll('.choice-item').length).toBe(7);
            }));
        });

        describe('selection logic', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let trigger: HTMLElement;
            let selectComponent: ThySelect;

            beforeEach(fakeAsync(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                selectComponent = fixture.componentInstance.select();
            }));

            it('should select an option when it is clicked', fakeAsync(() => {
                trigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                let option = overlayContainerElement.querySelector('thy-option-render') as HTMLElement;
                option.click();
                fixture.detectChanges();
                flush();

                trigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                option = overlayContainerElement.querySelector('thy-option-render') as HTMLElement;

                expect(option.classList).toContain('active');
                expect(fixture.componentInstance.select().optionRenders.toArray()[0].selected()).toEqual(true);
            }));

            it('should be able to select to an option using the ThyOptionRenderComponent API', fakeAsync(() => {
                fixture.componentInstance.mode = 'multiple';
                fixture.detectChanges();

                trigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                const optionInstances = selectComponent.optionRenders.toArray();
                optionInstances[1].select();
                fixture.detectChanges();
                flush();
                expect(optionInstances[1].element.nativeElement.classList).toContain('active');
                expect(optionInstances[1].selected()).toBe(true);
            }));

            it('should deselect other options when one is selected', fakeAsync(() => {
                let optionInstances: ThyOptionRender[];
                const foods = fixture.componentInstance.foods;

                trigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();
                optionInstances = selectComponent.optionRenders.toArray();
                optionInstances[1].element.nativeElement.click();
                fixture.detectChanges();
                expect(selectComponent.selectedValues().length).toBe(1);
                expect(selectComponent.selectedValues()[0]).toBe(foods[1].value);

                trigger.click();
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();
                optionInstances = selectComponent.optionRenders.toArray();
                optionInstances[0].element.nativeElement.click();
                fixture.detectChanges();
                expect(selectComponent.selectedValues().length).toBe(1);
                expect(selectComponent.selectedValues()[0]).toBe(foods[0].value);
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
                flush();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy).toHaveBeenCalledWith(true);

                const option = overlayContainerElement.querySelector('thy-option-render') as HTMLElement;
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
            let trigger: HTMLElement;

            beforeEach(waitForAsync(() => {
                fixture = TestBed.createComponent(SelectWithScrollAndSearchComponent);
                fixtureIns = fixture.componentInstance;
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            }));

            it('should scroll to active item when thyEnableScrollLoad and thyServerSearch is true', fakeAsync(() => {
                fixture.detectChanges();
                tick(100);
                trigger.click();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();

                const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
                typeInElement('any word', input);
                fixture.detectChanges();
                tick(100);
                trigger.click();
                fixture.detectChanges();
                tick(100);
                fixture.detectChanges();
                expect(fixtureIns.select().activatedValue()).toEqual(fixtureIns.foods[0].value as any);
            }));

            it('should close panel when dispatch toggle at thyShowSearch is false', fakeAsync(() => {
                fixture.componentInstance.showSearch = false;
                fixture.componentInstance.serverSearch = false;
                fixture.detectChanges();
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
            dropdownWidthMode: ThyDropdownWidthMode | null,
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
            tick(100);
            fixture.detectChanges();

            expect(overlayContainerElement.textContent).toEqual('', `Expected select panel to stay closed.`);
            expect(fixture.componentInstance.select().panelOpen).toBe(false, `Expected select panelOpen property to stay false.`);

            fixture.componentInstance.isDisabled = false;
            fixture.detectChanges();
            flush();

            expect(trigger.classList).not.toContain('disabled');

            trigger.click();
            fixture.detectChanges();
            tick(100);
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

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            expect(trigger.textContent).toContain('Pizza');
            const optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            expect(optionRenders[1].selected()).toBe(true);
        }));
    });

    describe('single choice when ngModel value change', () => {
        beforeEach(waitForAsync(() => configureThyCustomSelectTestingModule()));

        it('should clear selection model for single choice when ngModel value change ', fakeAsync(() => {
            const fixture = TestBed.createComponent(SingleSelectNgModelComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            fixture.componentInstance.selectedValues = null;
            fixture.detectChanges();

            const optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            flush();
            fixture.detectChanges();
            expect(optionRenders[0].selected()).toBe(false);
            expect(optionRenders[1].selected()).toBe(false);
            expect(optionRenders[2].selected()).toBe(false);
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

        it('should show the options that match the search keywords', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchComponent);
            fixture.detectChanges();
            fixture.componentInstance.thyShowSearch = true;
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            let optionRenders: ThyOptionRender[];
            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

            typeInElement('Steak', input);
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            expect(optionRenders.length).toBe(1);
            expect(optionRenders[0].thyLabelText()).toContain('Steak');

            typeInElement('', input);
            flush();
            fixture.detectChanges();
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            expect(optionRenders.length).toBe(fixture.componentInstance.foods.length);
        }));

        it('should search option use thySearchKey', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchUseSearchKeyComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

            typeInElement('lrs', input);
            flush();
            fixture.detectChanges();
            let optionRenders: ThyOptionRender[];
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            expect(optionRenders.length).toBe(1);
            const teamMembers = fixture.debugElement.componentInstance.teamMembers;
            expect(optionRenders[0].thyValue()).toBe(teamMembers[1]._id);

            typeInElement('qq', input);
            flush();
            fixture.detectChanges();
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            expect(optionRenders.length).toBe(0);
        }));

        it('should also find content when search by upperCase or lowerCase', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchComponent);
            fixture.detectChanges();
            fixture.componentInstance.thyShowSearch = true;
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
            typeInElement('sTeAk', input);
            flush();
            fixture.detectChanges();
            flush();

            const optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            expect(optionRenders.length).toBe(1);
            expect(optionRenders[0].thyLabelText()).toContain('Steak');
        }));

        it('should show the thy-group when at least one option of the group is shown', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchAndGroupComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
            tick(100);
            typeInElement('Cat', input);
            flush();
            fixture.detectChanges();

            const optionGroups = overlayContainerElement.querySelectorAll('thy-option-group-render');
            expect(optionGroups.length).toBe(1);
            const groupName = optionGroups[0].querySelector('.group-name') as HTMLElement;
            expect(groupName.innerText).toEqual('Grass');

            const optionRenders = overlayContainerElement.querySelectorAll('thy-option-render');
            console.log('optionRenders', optionRenders);
            expect(optionRenders.length).toBe(1);

            typeInElement('cat2', input);
            flush();
            fixture.detectChanges();
            const optionGroups2 = overlayContainerElement.querySelectorAll('thy-option-group-render');
            expect(optionGroups2.length).toBe(0);
            const optionRenders2 = overlayContainerElement.querySelectorAll('thy-option-render');
            expect(optionRenders2.length).toBe(0);
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
            flush();
            fixture.detectChanges();

            expect(overlayContainerElement.querySelector('thy-empty')).not.toBeTruthy();

            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;
            typeInElement('cat2', input);

            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            const emptyNode = overlayContainerElement.querySelector('thy-empty') as HTMLElement;
            expect(emptyNode).toBeTruthy();
            const emptyTextNode = emptyNode.querySelector('.thy-empty-text') as HTMLElement;
            expect(emptyTextNode).toBeTruthy();
            expect(emptyTextNode.textContent).toContain(fixture.componentInstance.emptySearchMessageText);
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            expect(overlayContainerElement.textContent).toContain('Sushi');
            fixture.componentInstance.foods.pop();
            fixture.detectChanges();
            flush();
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const optionRenders = fixture.componentInstance.select().optionRenders.toArray()[0];
            optionRenders.element.nativeElement.click();
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const option = overlayContainerElement.querySelector('thy-option-render') as HTMLElement;
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            let optionRenders: ThyOptionRender[];
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            optionRenders[0].select();
            optionRenders[1].select();
            fixture.detectChanges();
            flush();
            expect(optionRenders[0].selected()).toBe(true);
            expect(optionRenders[1].selected()).toBe(true);
            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            expect(optionRenders[0].selected()).toBe(false);
            expect(optionRenders[1].selected()).toBe(false);

            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            optionRenders[0].select();
            expect(fixture.componentInstance.select().selectedValues().length).toBe(1);
            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            expect(fixture.componentInstance.select().selectedValues().length).toBe(0);
        }));

        it('should not clear status when the thyMode value is not change', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            optionRenders[0].element.nativeElement.click();
            optionRenders[1].element.nativeElement.click();

            fixture.detectChanges();
            flush();

            expect(optionRenders[0].selected()).toBe(true);
            expect(optionRenders[1].selected()).toBe(true);

            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            flush();

            expect(optionRenders[0].selected()).toBe(true);
            expect(optionRenders[1].selected()).toBe(true);
        }));

        it('should apply default mode when thyMode change to empty', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();
            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            flush();

            let optionRenders: ThyOptionRender[];
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            optionRenders[0].element.nativeElement.click();
            fixture.detectChanges();
            flush();
            const selectComponent = fixture.componentInstance.select();
            expect(selectComponent.selectedValues().length).toBe(1);
            expect(selectComponent.selectedValues()[0]).toBe(fixture.componentInstance.foods[0].value);

            trigger.click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            optionRenders[1].element.nativeElement.click();
            fixture.detectChanges();
            flush();
            expect(selectComponent.selectedValues().length).toBe(1);
            expect(selectComponent.selectedValues()[0]).toBe(fixture.componentInstance.foods[1].value);
        }));

        it('should apply multiple mode when thyMode change to multiple', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThyModeComponent);
            fixture.detectChanges();
            fixture.componentInstance.selectMode = '';
            fixture.detectChanges();
            flush();
            let optionRenders: ThyOptionRender[];

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            optionRenders[0].element.nativeElement.click();
            fixture.detectChanges();
            flush();

            fixture.componentInstance.selectMode = 'multiple';
            fixture.detectChanges();
            flush();

            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            optionRenders = fixture.componentInstance.select().optionRenders.toArray();
            optionRenders[0].element.nativeElement.click();
            optionRenders[1].element.nativeElement.click();
            fixture.detectChanges();
            flush();

            expect(optionRenders[0].selected()).toBe(true);
            expect(optionRenders[1].selected()).toBe(true);
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const options = overlayContainerElement.querySelectorAll('thy-option-render');
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            (options.item(0) as HTMLElement).click();
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.selectedFoods![0]).toEqual(fixture.componentInstance.foods[1].value);
            expect(fixture.componentInstance.selectedFoods![1]).toEqual(fixture.componentInstance.foods[0].value);
        }));

        it('should get list order by index in options', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithThySortComparatorComponent);
            fixture.componentInstance.thySortComparator = (a, b, optionComponents) => {
                return optionComponents.indexOf(a) - optionComponents.indexOf(b);
            };
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            const options = overlayContainerElement.querySelectorAll('thy-option-render');
            (options.item(1) as HTMLElement).click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            (options.item(0) as HTMLElement).click();
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            expect(fixture.componentInstance.selectedFoods![0]).toEqual(fixture.componentInstance.foods[0].value);
            expect(fixture.componentInstance.selectedFoods![1]).toEqual(fixture.componentInstance.foods[1].value);
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[0].value as any);
        }));

        it('should set next active option when press down_arrow', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[0].value as any);

            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[1].value as any);
        }));

        it('should set selected option active when open panel', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            dispatchKeyboardEvent(trigger, 'keydown', ESCAPE);
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.select().panelOpen).toBeFalsy();

            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[1].value as any);
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();

            expect(fixture.componentInstance.select().selectedValues().length).toBe(1);
            expect(fixture.componentInstance.select().selectedValues()[0]).toBe(fixture.componentInstance.foods[0].value);
        }));

        it('should open the panel when press enter on trigger', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            expect(fixture.componentInstance.select().panelOpen).toEqual(true);
        }));

        it('should select an option when press down_arrow on trigger', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[0].value as any);

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            flush();
            expect(fixture.componentInstance.select().selectedValues().length).toBe(1);
            expect(fixture.componentInstance.select().selectedValues()[0]).toBe(fixture.componentInstance.foods[0].value);
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
                expect(selectComponent.dropDownPositions()[0][key as keyof ConnectionPositionPair]).toEqual(
                    POSITION_MAP[placement][key as keyof ConnectionPositionPair]
                );
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

            let fixture: ComponentFixture<BasicSelectComponent>;
            let trigger: HTMLElement;

            beforeEach(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            });

            it('should close panel when scroll container', () => {
                trigger.click();
                fixture.detectChanges();

                spyOn(fixture.componentInstance.select().cdkConnectedOverlay()!.overlayRef, 'detach');

                expect(fixture.componentInstance.select().cdkConnectedOverlay()!.overlayRef.detach).toHaveBeenCalledTimes(0);

                scrolledSubject.next();
                expect(fixture.componentInstance.select().cdkConnectedOverlay()!.overlayRef.detach).toHaveBeenCalledTimes(1);
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

                spyOn(fixture.componentInstance.select().cdkConnectedOverlay()!.overlayRef, 'updatePosition');
                expect(fixture.componentInstance.select().cdkConnectedOverlay()!.overlayRef.updatePosition).toHaveBeenCalledTimes(0);

                scrolledSubject.next();
                expect(fixture.componentInstance.select().cdkConnectedOverlay()!.overlayRef.updatePosition).toHaveBeenCalledTimes(1);
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();

            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[0].value as any);
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

            expect(fixture.componentInstance.select().activatedValue()).toBeFalsy();
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[1].value as any);
            fixture.detectChanges();
            dispatchKeyboardEvent(trigger, 'keydown', HOME);
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[0].value as any);
        }));

        it('should active last option when set keycode END', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            dispatchKeyboardEvent(trigger, 'keydown', END);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(
                fixture.componentInstance.foods[fixture.componentInstance.foods.length - 1].value as any
            );
        }));

        it('should select correct option when panel is closed', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            fixture.detectChanges();
            flush();
            dispatchKeyboardEvent(trigger, 'keydown', END);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(
                fixture.componentInstance.foods[fixture.componentInstance.foods.length - 1]!.value as any
            );

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().selectedValues().length).toBe(1);
            expect(fixture.componentInstance.select().selectedValues()[0]).toEqual(
                fixture.componentInstance.foods[fixture.componentInstance.foods.length - 1].value
            );

            dispatchKeyboardEvent(trigger, 'keydown', HOME);
            fixture.detectChanges();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().activatedValue()).toEqual(fixture.componentInstance.foods[0].value as any);

            dispatchKeyboardEvent(trigger, 'keydown', ENTER);
            fixture.detectChanges();
            expect(fixture.componentInstance.select().selectedValues().length).toBe(1);
            expect(fixture.componentInstance.select().selectedValues()[0]).toEqual(fixture.componentInstance.foods[0].value);
        }));

        it('should close panel when set keycode arrow', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
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
            flush();
            fixture.detectChanges();
            tick(100);
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            const option = overlayContainerElement.querySelector('thy-option-render') as HTMLElement;
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
            flush();
            fixture.detectChanges();
            tick(100);
            fixture.detectChanges();
            const optionGroup = overlayContainerElement.querySelector('thy-option-group-render') as HTMLElement;
            const groupName = optionGroup.querySelector('.group-name') as HTMLElement;
            expect(groupName.innerText).toEqual(fixture.componentInstance.options[0].groupLabel as any);
        }));
    });
});

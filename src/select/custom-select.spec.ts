import { TestBed, async, ComponentFixture, fakeAsync, tick, inject, flush, discardPeriodicTasks } from '@angular/core/testing';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Sanitizer, SecurityContext, TemplateRef, OnInit } from '@angular/core';
import { ThySelectModule } from './module';
import { ThySelectCustomComponent, SelectMode } from './custom-select/custom-select.component';
import { ThyOptionComponent } from '../core/option/option.component';
import { By, DomSanitizer } from '@angular/platform-browser';
import { UpdateHostClassService } from '../shared';
import { ThyPositioningService } from '../positioning/positioning.service';
import { OverlayContainer, ViewportRuler } from '@angular/cdk/overlay';
import { Observable, Subject, fromEvent } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { ThySelectComponent } from './select.component';
import { ThyFormModule } from '../form';
import { dispatchFakeEvent, dispatchKeyboardEvent } from '../core/testing/dispatcher-events';
import { TAB, ESCAPE, DOWN_ARROW, ENTER } from '../util/keycodes';
import { typeInElement, injectDefaultSvgIconSet, bypassSanitizeProvider } from '../core/testing';
import { ThyIconRegistry } from '../icon';
import { ThyOptionModule } from '../core/option/module';

@Component({
    selector: 'basic-select',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="Food" [formControl]="control" [required]="isRequired">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue"
                >
                </thy-option>
                <ng-template #footer>
                    <a>更多</a>
                </ng-template>
            </thy-custom-select>
        </form>
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
    control = new FormControl();
    isRequired: boolean;
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;

    @ViewChild('footer', { static: true, read: TemplateRef })
    footerTemplate: TemplateRef<any>;
}

@Component({
    selector: 'multiple-select',
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
    selector: 'ng-model-select',
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
    selector: 'select-with-groups',
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
    control = new FormControl();
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
    foods: any[] = [
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
    selector: 'basic-select-initially-hidden',
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
    selector: 'select-early-sibling-access',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select #select="thyCustomSelect"></thy-custom-select>
            <div *ngIf="select.selected"></div>
        </form>
    `
})
class SelectEarlyAccessSiblingComponent {}

@Component({
    selector: 'select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="Food" [thyShowSearch]="thyShowSearch">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue"
                >
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
    control = new FormControl();
    isRequired: boolean;
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="team-members" [thyShowSearch]="thyShowSearch">
                <thy-option
                    *ngFor="let member of teamMembers"
                    [thyValue]="member.id"
                    [thyLabelText]="member.name"
                    thySearchKey="{{ member.name }},{{ member.pin_yin }}"
                >
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
    control = new FormControl();
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'select-with-group-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select thyPlaceHolder="Pokemon" [thyShowSearch]="true" [formControl]="control">
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
    control = new FormControl();
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

    @ViewChild(ThySelectCustomComponent, { static: true })
    select: ThySelectCustomComponent;
}

@Component({
    selector: 'select-with-search',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                thyPlaceHolder="Food"
                name="foods"
                [thyShowSearch]="thyShowSearch"
                [thyServerSearch]="true"
                (thyOnSearch)="thyOnSearch()"
            >
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue"
                >
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
    control = new FormControl();
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
    thyOnSearch = jasmine.createSpy('thyServerSearch callback');
}

@Component({
    selector: 'basic-select',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select
                thyPlaceHolder="Food"
                [thyMode]="'multiple'"
                style="width:500px"
                [(ngModel)]="selectedValue"
                [formControl]="control"
                [required]="isRequired"
            >
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue"
                >
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
    selectedValue = ['sushi-7'];
    control = new FormControl();
    isRequired: boolean;
    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'select-expand-status',
    template: `
        <form thyForm name="demoForm" #demoForm="ngForm">
            <thy-custom-select [formControl]="control" (thyOnExpandStatusChange)="thyOnExpandStatusChange($event)">
                <thy-option
                    *ngFor="let food of foods"
                    [thyValue]="food.value"
                    [thyDisabled]="food.disabled"
                    [thyLabelText]="food.viewValue"
                >
                </thy-option>
            </thy-custom-select>
        </form>
    `
})
class SelectWithExpandStatusComponent {
    foods: any[] = [{ value: 'pizza-1', viewValue: 'Pizza' }];
    control = new FormControl();
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

    selectedFoods = null;

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
                [thySortComparator]="thySortComparator"
            >
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

    thySortComparator;

    selectedFoods = null;

    @ViewChild(ThySelectCustomComponent, { static: true }) select: ThySelectCustomComponent;
    @ViewChildren(ThyOptionComponent) options: QueryList<ThyOptionComponent>;
}

@Component({
    selector: 'auto-expend-select',
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

describe('ThyCustomSelect', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: Platform;

    function configureThyCustomSelectTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, ThyOptionModule, ThySelectModule, ReactiveFormsModule, FormsModule],
            declarations: declarations,
            providers: [UpdateHostClassService, ThyPositioningService, bypassSanitizeProvider]
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
        beforeEach(async(() => {
            configureThyCustomSelectTestingModule([
                BasicSelectComponent,
                SelectWithGroupsAndNgContainerComponent,
                SelectWithExpandStatusComponent,
                MultipleSelectComponent,
                SelectWithThyAutoExpendComponent
            ]);
        }));

        describe('basic class', () => {
            let fixture: ComponentFixture<BasicSelectComponent>;
            let selectElement: HTMLElement;

            beforeEach(async(() => {
                fixture = TestBed.createComponent(BasicSelectComponent);
                fixture.detectChanges();
                selectElement = fixture.debugElement.query(By.css('.thy-select-custom')).nativeElement;
            }));

            it('should get correct class', () => {
                expect(selectElement).toBeTruthy();
                expect(selectElement.classList.contains('thy-select')).toBeTruthy();
            });

            it('should get correct icon element', () => {
                const iconElement = selectElement.querySelector('.thy-icon');
                expect(iconElement).toBeTruthy();
                expect(iconElement.classList.contains('thy-icon-angle-down')).toBeTruthy();
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
                // tslint:disable-next-line:radix
                const initialWidth = parseInt(pane.style.width || '0');

                expect(initialWidth).toBeGreaterThan(0);

                trigger.style.width = '400px';
                dispatchFakeEvent(window, 'resize');
                fixture.detectChanges();
                tick(1000);
                fixture.detectChanges();

                // tslint:disable-next-line:radix
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
        it('should hide the thy-group when all options of the group is hidden', fakeAsync(() => {
            const fixture = TestBed.createComponent(SelectWithSearchAndGroupComponent);
            fixture.detectChanges();
            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();

            const groups = fixture.componentInstance.select.optionGroups.toArray();
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

            const groups = fixture.componentInstance.select.optionGroups.toArray();
            const input = fixture.debugElement.query(By.css('.search-input-field')).nativeElement;

            typeInElement('cat2', input);

            tick(1000);
            fixture.detectChanges();
            flush();

            expect(overlayContainerElement.querySelector('thy-empty')).toBeTruthy();
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
        it('should stopPropagation when press enter on custom-select', fakeAsync(() => {
            const fixture = TestBed.createComponent(BasicSelectComponent);
            fixture.detectChanges();

            const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();

            // expect(fixture.componentInstance.select.panelOpen).toBe(true);

            dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);
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
});

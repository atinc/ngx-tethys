import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { CommonModule, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ThyCascaderComponent } from 'ngx-tethys/cascader';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThyCascaderExpandTrigger, ThyCascaderTriggerType } from '../cascader.component';
import { ThyCascaderModule } from '../module';
import { clone } from '../examples/cascader-address-options';
registerLocaleData(zh);

const customerOptions = [
    {
        value: 'zhejiang',
        label: 'zhejiang',
        code: 477200,
        children: [
            {
                value: 'hangzhou',
                label: 'hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'xihu',
                        code: 752100,
                        isLeaf: true
                    }
                ]
            }
        ]
    }
];

const multipleOptions = [
    {
        value: 'beijing',
        label: 'beijing',
        children: [
            {
                value: 'shixiaqu',
                label: 'shixiaqu',
                children: [
                    {
                        value: 'haidianqu',
                        label: 'haidianqu',
                        isLeaf: true
                    }
                ]
            }
        ]
    },
    {
        value: 'tianjinshi',
        label: 'tianjinshi',
        children: [
            {
                value: 'shixiaqu',
                label: 'shixiaqu',
                children: [
                    {
                        value: 'hepingqu',
                        label: 'hepingqu',
                        isLeaf: true
                    }
                ]
            }
        ]
    },
    {
        value: 'jilinsheng',
        label: 'jilinsheng',
        children: [
            {
                value: 'liaoyuanshi',
                label: 'liaoyuanshi',
                children: [
                    {
                        value: 'kongshanqu',
                        label: 'kongshanqu',
                        isLeaf: true
                    }
                ]
            }
        ]
    },
    {
        value: 'jiangsusheng',
        label: 'jiangsusheng',
        children: [
            {
                value: 'nanjingshi',
                label: 'nanjingshi',
                children: [
                    {
                        value: 'xuanxushi',
                        label: 'xuanxushi',
                        isLeaf: true
                    }
                ]
            }
        ]
    },
    {
        value: 'shanghaishi',
        label: 'shanghaishi',
        children: [
            {
                value: 'shixiaqu',
                label: 'shixiaqu',
                children: [
                    {
                        value: 'hongkouqu',
                        label: 'hongkouqu',
                        isLeaf: true
                    }
                ]
            }
        ]
    },
    {
        value: 'zhejiang',
        label: 'zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'xihu',
                        isLeaf: true
                    }
                ]
            }
        ]
    }
];

const emptyOptions = [
    {
        value: 'zhejiang',
        label: 'zhejiang',
        code: 477200,
        children: [
            {
                value: 'hangzhou',
                label: 'hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'xihu',
                        code: 752100,
                        isLeaf: true
                    }
                ]
            }
        ]
    },
    {
        value: 'anhui',
        label: 'anhui',
        code: 477201,
        children: []
    }
];

const loadDataOption: { [key: string]: { children?: any[]; [key: string]: any }[] } = {
    root: [
        {
            value: 'zhejiang',
            label: 'zhejiang',
            code: 477200,
            children: []
        },
        {
            value: 'anhui',
            label: 'anhui',
            code: 477201,
            children: []
        }
    ],
    firstChildren: [
        {
            value: 'hangzhou',
            label: 'hangzhou',
            children: [
                {
                    value: 'xihu',
                    label: 'xihu',
                    code: 752100,
                    isLeaf: true
                }
            ]
        }
    ]
};

@Component({
    selector: 'thy-cascader-basic',
    template: `
        <button class="cancel-anchor" *ngIf="thyChangeOnSelect">取消锚点</button>

        <thy-cascader
            #cascader
            [thyOptions]="thyCustomerOptions"
            (ngModelChange)="onChanges($event)"
            [(ngModel)]="curVal"
            style="width:400px;"
            [thyPlaceholder]="placeholder"
            [thyTriggerAction]="thyTriggerAction"
            [thyExpandTriggerAction]="thyExpandTriggerAction"
            [thyChangeOnSelect]="thyChangeOnSelect"
            [thyMenuClassName]="thyMenuClassName"
            [thyColumnClassName]="columnClassName"
            [thyLoadData]="loadData"
        >
        </thy-cascader>
    `
})
class CascaderBasicComponent {
    public thyTriggerAction: ThyCascaderTriggerType = 'click';
    public thyExpandTriggerAction: ThyCascaderExpandTrigger = 'click';
    public curVal: string | string[] = null;
    public placeholder = '';
    public thyCustomerOptions: any[] = clone(customerOptions);
    public thyChangeOnSelect = false;
    public thyMenuClassName = 'test-menu-class';
    public columnClassName = 'column-menu-class';
    public loadData: any;
    @ViewChild('cascader', { static: true }) cascaderRef: ThyCascaderComponent;

    changeValue$ = new Subject<string[]>();
    constructor() {}
    onChanges(e: string[]) {
        this.changeValue$.next(e);
    }
}
@Component({
    selector: 'thy-cascader-load',
    template: `
        <thy-cascader [thyLoadData]="thyLoadData" [(ngModel)]="curVal" style="width:400px;"> </thy-cascader>
    `
})
class CascaderLoadComponent {
    success = true;
    public curVal: string | string[] = 'zhejiang';

    constructor() {}

    thyLoadData = (option: any) => {
        return new Promise<void>((res, rej) => {
            if (this.success) {
                option.children = clone(customerOptions);
                res();
            } else {
                rej();
            }
        });
    };
}
@Component({
    selector: 'thy-cascader-template',
    template: `
        <thy-cascader
            [thyOptions]="thyCustomerOptions"
            (ngModelChange)="onChanges($event)"
            [(ngModel)]="curVal"
            style="width:400px;"
            [thyLabelRender]="renderTpl"
        >
        </thy-cascader>
        <ng-template #renderTpl let-labels="labels" let-selectedOptions="selectedOptions">
            <ng-container>
                {{ isDisplay(labels) }}

                <ng-container *ngFor="let label of labels; let i = index; let isLast = last">
                    <span *ngIf="!isLast" class="display-name-no-last">{{ label }} / </span>
                    <span *ngIf="isLast" class="display-name-last">
                        {{ label }}
                        (
                        <a>
                            {{ selectedOptions[i].code }}
                        </a>
                        )
                    </span>
                </ng-container>
            </ng-container>
        </ng-template>
    `
})
class CascaderTemplateComponent {
    public curVal: string | string[] = 'xihu';

    public thyCustomerOptions: any[] = clone(customerOptions);
    isDisplayName$ = new Subject();
    constructor() {}

    isDisplay(labels: any[]) {
        this.isDisplayName$.next();
    }
}

@Component({
    selector: 'test-cascader-multiple',
    template: `
        <thy-cascader
            [thyMultiple]="true"
            [thyOptions]="multipleOptions"
            [(ngModel)]="multipleVal"
            (ngModelChange)="selectChange($event)"
            style="width:400px;"
        >
        </thy-cascader>
    `
})
class CascaderMultipleComponent {
    public multipleOptions: any[] = multipleOptions;

    public multipleVal: string[][] = [
        ['beijing', 'shixiaqu', 'haidianqu'],
        ['tianjinshi', 'shixiaqu', 'hepingqu']
    ];
    public selectSpy = jasmine.createSpy('multiple select option');

    constructor() {}

    selectChange(e: string[]) {
        this.selectSpy(e);
    }
}

describe('thy-cascader', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, CommonModule, OverlayModule, ThyCascaderModule],
                declarations: [CascaderTemplateComponent, CascaderBasicComponent, CascaderLoadComponent, CascaderMultipleComponent],
                providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
            });
            TestBed.compileComponents();
        })
    );

    describe('base', () => {
        let fixture: ComponentFixture<CascaderBasicComponent>;
        let component: CascaderBasicComponent;
        let debugElement: DebugElement;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CascaderBasicComponent);
            component = fixture.componentRef.instance;
            debugElement = fixture.debugElement;
        });

        beforeEach(inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        }));

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(component).toBeTruthy();
        });

        it('should clear', async () => {
            component.curVal = 'zhejiang';
            fixture.detectChanges();
            await fixture.whenStable();
            component.changeValue$
                .pipe(take(1))
                .toPromise()
                .then(e => {
                    expect(e.length).toBe(0);
                });
            const el = debugElement.query(By.css('.select-control-clear'));
            dispatchFakeEvent(el.nativeElement, 'click', true);
            expect(el).toBeTruthy();
            fixture.detectChanges();
        });

        it('should change placeholder', () => {
            component.curVal = null;
            component.placeholder = 'test-change';
            const el = debugElement.query(By.css('.text-placeholder'));
            fixture.detectChanges();
            expect(el.nativeElement.innerText).toBe(component.placeholder);
        });

        it('should click open', () => {
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();

            fixture.detectChanges();
            const menu = debugElement.query(By.css('.thy-cascader-menu')).nativeElement;
            expect(menu.classList.contains(component.columnClassName)).toBe(true);
        });

        it('should select', done => {
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
            fixture.detectChanges();

            component.changeValue$.pipe(take(1)).subscribe(e => {
                expect(e).toEqual(['zhejiang', 'hangzhou', 'xihu']);
                done();
            });
            let list = debugElement.queryAll(By.css(`ul li`));
            while (list.length) {
                dispatchFakeEvent(list.pop().nativeElement, 'click', true);

                fixture.detectChanges();
                list = debugElement.queryAll(By.css(`ul li`));
            }
        });

        it('should hover item', () => {
            component.curVal = null;
            component.thyExpandTriggerAction = 'hover';
            fixture.detectChanges();
            // component.curVal=['zhejiang','hangzhou'];
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
            fixture.detectChanges();
            expect(debugElement.queryAll(By.css(`ul li`)).length).toBe(1);
            const li = debugElement.query(By.css(`ul li`));
            dispatchFakeEvent(li.nativeElement, 'mouseover', true);

            fixture.detectChanges();
            expect(debugElement.queryAll(By.css(`ul li`)).length).toBe(2);
        });

        it('should hover open', () => {
            component.thyTriggerAction = 'hover';
            fixture.detectChanges();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'mouseover', true);
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
        });

        it('should select one', done => {
            component.thyChangeOnSelect = true;
            fixture.detectChanges();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
            fixture.detectChanges();
            component.changeValue$.pipe(take(1)).subscribe(value => {
                expect(value.length).toBe(1);
                done();
            });
            dispatchFakeEvent(debugElement.query(By.css(`ul li`)).nativeElement, 'mouseover', true);
            dispatchFakeEvent(debugElement.query(By.css(`ul li`)).nativeElement, 'click', true);
            fixture.detectChanges();
            dispatchFakeEvent(document.querySelector('.cdk-overlay-backdrop'), 'click', true);
            fixture.detectChanges();
        });

        it('should menu mouse leave(hover)', () => {
            component.thyTriggerAction = 'hover';
            fixture.detectChanges();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'mouseover', true);
            fixture.detectChanges();
            let el = debugElement.query(By.css('.thy-cascader-menus'));
            expect(el).toBeTruthy();
            dispatchFakeEvent(el.nativeElement, 'mouseleave', true);
            fixture.detectChanges();
            el = debugElement.query(By.css('.thy-cascader-menus'));
            expect(el).not.toBeTruthy();
        });

        it('should menu mouse leave(click)', () => {
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            let el = debugElement.query(By.css('.thy-cascader-menus'));
            expect(el).toBeTruthy();
            dispatchFakeEvent(el.nativeElement, 'mouseleave', true);
            fixture.detectChanges();
            el = debugElement.query(By.css('.thy-cascader-menus'));
            expect(el).toBeTruthy();
        });

        it('should have custom menu class', () => {
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            const el = debugElement.query(By.css('.test-menu-class'));
            expect(el).toBeTruthy();
        });

        it('should active selectedOptions when menu open', fakeAsync(() => {
            fixture.componentInstance.curVal = ['zhejiang', 'hangzhou', 'xihu'];
            fixture.detectChanges();
            flush();
            const trigger = debugElement.query(By.css('input')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            const activatedOptions: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('.thy-cascader-menu-item-active');
            const activatedOptionsText: string[] = [];
            activatedOptions.forEach(item => activatedOptionsText.push(item.innerText.trim()));
            expect(activatedOptionsText).toEqual(fixture.componentInstance.curVal);
        }));

        it('should scroll to active item when menu open', fakeAsync(() => {
            fixture.componentInstance.thyCustomerOptions = multipleOptions;
            fixture.componentInstance.curVal = ['zhejiang', 'hangzhou', 'xihu'];
            fixture.detectChanges();
            flush();
            const trigger = debugElement.query(By.css('input')).nativeElement;
            trigger.click();
            fixture.detectChanges();
            flush();
            const el = debugElement.query(By.css('.thy-cascader-menus')).nativeElement;
            el.style.height = 180;
            const elementRect = el.getBoundingClientRect();
            const activatedOption = overlayContainerElement.querySelector('.thy-cascader-menu-item-active').getBoundingClientRect();
            expect(activatedOption.top - elementRect.top < 180).toBeTruthy();
        }));

        it('should show empty state when options is []', fakeAsync(() => {
            component.thyCustomerOptions = [];
            fixture.detectChanges();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            flush();
            const emptyContent = overlayContainerElement.querySelector('thy-empty') as HTMLElement;
            expect(emptyContent).toBeTruthy();
        }));

        xit('should change height when the window is resized', fakeAsync(() => {
            const element = component.cascaderRef.trigger.nativeElement as Element;
            const getBoundingClientRect = spyOn(element, 'getBoundingClientRect');

            getBoundingClientRect.and.returnValues(
                {
                    height: 10,
                    width: 20,
                    top: 30,
                    left: 4
                },
                {
                    height: 50,
                    width: 60,
                    top: 70,
                    left: 80
                }
            );
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            const event = new Event('resize');
            window.dispatchEvent(event);
            fixture.detectChanges();
            tick(100);
            const triggerRect = component.cascaderRef.triggerRect;

            expect((triggerRect as DOMRect).height).toBe(50);
            expect((triggerRect as DOMRect).width).toBe(60);
        }));

        it('should show nothing when children is []', fakeAsync(() => {
            fixture.componentInstance.thyCustomerOptions = emptyOptions;
            fixture.detectChanges();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            flush();
            const el = debugElement.query(By.css('.thy-cascader-menus'));
            const items = el.queryAll(By.css('.thy-cascader-menu-item'));
            const haveChildrenItem = items[0];
            const noChildrenItem = items[1];
            dispatchFakeEvent(haveChildrenItem.nativeElement, 'click', true);
            fixture.detectChanges();
            flush();
            const secondMenu = el.queryAll(By.css('.thy-cascader-menu'))[1];
            expect(secondMenu.children.length).toEqual(1);
            dispatchFakeEvent(noChildrenItem.nativeElement, 'click', true);
            fixture.detectChanges();
            flush();
            const emptySecondMenu = el.queryAll(By.css('.thy-cascader-menu'))[1];
            expect(emptySecondMenu.children.length).toEqual(0);
        }));

        it('should loadData by thyLoadData when thyLoadData is function', async () => {
            fixture.componentInstance.thyCustomerOptions = loadDataOption.root;
            fixture.componentInstance.loadData = (option: any) => {
                return new Promise<void>((res, rej) => {
                    if (option.label === 'zhejiang') {
                        option.children = loadDataOption.firstChildren;
                    }
                    res();
                });
            };
            fixture.detectChanges();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            await fixture.whenStable();
            const el = debugElement.query(By.css('.thy-cascader-menus'));
            const items = el.queryAll(By.css('.thy-cascader-menu-item'));
            const haveChildrenItem = items[0];
            const noChildrenItem = items[1];
            dispatchFakeEvent(haveChildrenItem.nativeElement, 'click', true);
            fixture.detectChanges();
            await fixture.whenStable();
            const secondMenu = el.queryAll(By.css('.thy-cascader-menu'))[1];
            expect(secondMenu.children.length).toEqual(1);
            dispatchFakeEvent(noChildrenItem.nativeElement, 'click', true);
            fixture.detectChanges();
            await fixture.whenStable();
            const emptySecondMenu = el.queryAll(By.css('.thy-cascader-menu'))[1];
            expect(emptySecondMenu.children.length).toEqual(0);
        });

        it('should only show one column when first opened', fakeAsync(() => {
            fixture.componentInstance.thyCustomerOptions = emptyOptions;
            fixture.detectChanges();
            fixture.componentInstance.curVal = ['anhui'];
            fixture.detectChanges();
            flush();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            flush();
            expect(component.cascaderRef.columns.length).toEqual(1);
        }));
    });

    describe('loadData', () => {
        let fixture: ComponentFixture<CascaderLoadComponent>;
        let component: CascaderLoadComponent;
        let debugElement: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CascaderLoadComponent);
            component = fixture.componentRef.instance;
            debugElement = fixture.debugElement;
        });

        it('should load data', async () => {
            component.success = true;
            fixture.detectChanges();
            await fixture.whenStable();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
            await fixture.whenStable();
            expect(debugElement.queryAll(By.css(`ul li`)).length).toBeGreaterThan(0);
        });

        it('should load data error', async () => {
            component.success = false;
            fixture.detectChanges();
            await fixture.whenStable();
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            fixture.detectChanges();
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
            await fixture.whenStable();
            expect(debugElement.queryAll(By.css(`ul li`)).length).toBe(0);
        });
    });

    describe('template', () => {
        let fixture: ComponentFixture<CascaderTemplateComponent>;
        let component: CascaderTemplateComponent;
        let debugElement: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CascaderTemplateComponent);
            component = fixture.componentRef.instance;
            debugElement = fixture.debugElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(component).toBeTruthy();
        });

        it('should display', done => {
            fixture.detectChanges();
            component.isDisplayName$
                .pipe(take(1))
                .toPromise()
                .then(() => {
                    const el = debugElement.query(By.css('.thy-cascader-picker-label .display-name-last'));
                    expect(el).toBeTruthy();
                    done();
                });
        });

        it('should display multi', done => {
            component.curVal = ['zhejiang', 'hangzhou', 'xihu'];
            component.isDisplayName$
                .pipe(take(1))
                .toPromise()
                .then(() => {
                    expect(debugElement.queryAll(By.css('.thy-cascader-picker-label .display-name-last')).length === 1).toBeTruthy();
                    expect(debugElement.queryAll(By.css('.thy-cascader-picker-label .display-name-no-last')).length === 2).toBeTruthy();
                    done();
                });
        });
    });

    describe('multiple mode', () => {
        let fixture: ComponentFixture<CascaderMultipleComponent>;
        let component: CascaderMultipleComponent;
        let debugElement: DebugElement;
        let overlayContainer: OverlayContainer;
        let overlayContainerElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(CascaderMultipleComponent);
            component = fixture.componentRef.instance;
            debugElement = fixture.debugElement;
        });

        beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        }));

        afterEach(() => {
            overlayContainer.ngOnDestroy();
        });

        it('should create', () => {
            expect(fixture).toBeDefined();
            expect(component).toBeDefined();
        });

        it('should show multiple selected label', async () => {
            await fixture.whenStable();
            const labels = debugElement.queryAll(By.css('.choice'));
            const selectedValue = component.multipleVal;
            expect(labels.length).toBe(selectedValue.length);
        });

        it('should add item when click', async () => {
            await fixture.whenStable();
            const originSelectedCount = component.multipleVal?.length;
            dispatchFakeEvent(debugElement.query(By.css('.form-control')).nativeElement, 'click', true);
            fixture.detectChanges();

            const firstLevelItem = getOptionByLevel();
            dispatchFakeEvent(firstLevelItem[2].nativeElement, 'click');
            fixture.detectChanges();

            const sectionLevelItem = getOptionByLevel(1)[0];
            dispatchFakeEvent(sectionLevelItem.nativeElement, 'click');
            fixture.detectChanges();

            const thirdLevelItem = getOptionByLevel(2)[0];
            thirdLevelItem.query(By.css('label')).nativeElement.click();
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.selectSpy).toHaveBeenCalled();
            expect(component.multipleVal.length).toBe(originSelectedCount + 1);
            const labels = debugElement.queryAll(By.css('.choice'));
            expect(labels.length).toBe(component.multipleVal.length);
        });

        it('should remove item when click x', async () => {
            await fixture.whenStable();
            const originSelectedCount = component.multipleVal?.length;
            dispatchFakeEvent(debugElement.query(By.css('.thy-icon-close')).nativeElement, 'click', true);
            fixture.detectChanges();
            expect(component.multipleVal.length).toBe(originSelectedCount - 1);
            const labels = debugElement.queryAll(By.css('.choice'));
            expect(labels.length).toBe(component.multipleVal.length);
        });

        it('should clear item when click clear btn', async () => {
            await fixture.whenStable();
            const originSelectedCount = component.multipleVal?.length;
            dispatchFakeEvent(debugElement.query(By.css('.form-control')).nativeElement, 'click', true);
            fixture.detectChanges();
            const firstLevelItem = getOptionByLevel();
            const originFirstLevelItemLength = firstLevelItem.length;
            dispatchFakeEvent(firstLevelItem[0].nativeElement, 'click');
            fixture.detectChanges();

            const sectionLevelItem = getOptionByLevel(1)[0];
            dispatchFakeEvent(sectionLevelItem.nativeElement, 'click');
            fixture.detectChanges();

            const thirdLevelItem = getOptionByLevel(2)[0];
            thirdLevelItem.query(By.css('label')).nativeElement.click();
            fixture.detectChanges();
            await fixture.whenStable();

            expect(component.multipleVal.length).toBe(originSelectedCount - 1);
            const labels = debugElement.queryAll(By.css('.choice'));
            expect(labels.length).toBe(component.multipleVal.length);

            const updateFirstLevelItem = getOptionByLevel();
            expect(originFirstLevelItemLength).toBe(updateFirstLevelItem.length);
        });

        it('should show nothing when ngModel is []', fakeAsync(() => {
            component.multipleVal = [];
            fixture.detectChanges();
            const labels = debugElement.queryAll(By.css('.choice'));
            expect(labels.length).toBe(0);
        }));

        function getOptionByLevel(level: number = 0) {
            const levelUlList = debugElement.queryAll(By.css('.thy-cascader-menu'))[level];
            const levelLi = levelUlList.queryAll(By.css('li'));
            return levelLi;
        }
    });
});

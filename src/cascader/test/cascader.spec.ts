import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ThyCascaderModule } from '../module';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
import { ThyCascaderTriggerType, ThyCascaderExpandTrigger } from '../cascader.component';
const customerOptions = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        code: 477200,
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                        code: 752100,
                        isLeaf: true
                    }
                ]
            }
        ]
    }
];
@Component({
    selector: 'thy-cascader-basic',
    template: `
        <button class="cancel-anchor" *ngIf="thyChangeOnSelect">取消锚点</button>

        <thy-cascader
            [thyOptions]="thyCustomerOptions"
            (ngModelChange)="onChanges($event)"
            [(ngModel)]="curVal"
            style="width:400px;"
            [thyPlaceHolder]="placeholder"
            [thyTriggerAction]="thyTriggerAction"
            [thyExpandTriggerAction]="thyExpandTriggerAction"
            [thyChangeOnSelect]="thyChangeOnSelect"
            [thyMenuClassName]="thyMenuClassName"
        >
        </thy-cascader>
    `
})
class CascaderBasicComponent {
    public thyTriggerAction: ThyCascaderTriggerType = 'click';
    public thyExpandTriggerAction: ThyCascaderExpandTrigger = 'click';
    public curVal: string | string[] = null;
    public placeholder = '';
    public thyCustomerOptions: any[] = customerOptions;
    public thyChangeOnSelect = false;
    public thyMenuClassName = 'test-menu-class';
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
                option.children = customerOptions;
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

    public thyCustomerOptions: any[] = customerOptions;
    isDisplayName$ = new Subject();
    constructor() {}

    isDisplay(labels: any[]) {
        this.isDisplayName$.next();
    }
}
describe('thy-cascader', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyCascaderModule, FormsModule, CommonModule],
            declarations: [CascaderTemplateComponent, CascaderBasicComponent, CascaderLoadComponent],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
        });
        TestBed.compileComponents();
    });
    describe('base', () => {
        let fixture: ComponentFixture<CascaderBasicComponent>;
        let component: CascaderBasicComponent;
        let debugElement: DebugElement;
        beforeEach(() => {
            fixture = TestBed.createComponent(CascaderBasicComponent);
            component = fixture.componentRef.instance;
            debugElement = fixture.debugElement;
        });
        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(component).toBeTruthy();
        });

        it('should display', () => {
            const el = debugElement.query(By.css('.thy-cascader-picker-label'));
            expect(el).toBeTruthy();
        });
        it('should clear', async done => {
            component.curVal = 'zhejiang';
            fixture.detectChanges();
            await fixture.whenStable();
            component.changeValue$.pipe(take(1)).subscribe(e => {
                expect(e.length).toBe(0);
                done();
            });
            const el = debugElement.query(By.css('.thy-cascader-picker-clear'));
            dispatchFakeEvent(el.nativeElement, 'click', true);
            expect(el).toBeTruthy();
            fixture.detectChanges();
        });
        it('should change placeholder', () => {
            component.curVal = null;
            component.placeholder = 'test-change';
            const el = debugElement.query(By.css('input'));
            fixture.detectChanges();
            expect(el.attributes.placeholder).toBe(component.placeholder);
        });
        it('should click open', () => {
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
        });
        it('should select', done => {
            // component.curVal=['zhejiang','hangzhou'];
            dispatchFakeEvent(debugElement.query(By.css('input')).nativeElement, 'click', true);
            const el = debugElement.query(By.css(`.thy-cascader-picker-open`));
            expect(el).toBeTruthy();
            fixture.detectChanges();

            component.changeValue$
                .pipe(take(1))
                .toPromise()
                .then(e => {
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
});

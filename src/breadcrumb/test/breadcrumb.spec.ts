import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyBreadcrumbModule } from '../module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { ThyBreadcrumbItemComponent } from '../breadcrumb-item.component';
import { By } from '@angular/platform-browser';
import { ThyBreadcrumbComponent } from '../breadcrumb.component';
import { ThyIconModule } from './../../icon/icon.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyActionMenuModule } from '../../action-menu/action-menu.module';

@Component({
    selector: 'thy-demo-breadcrumb-basic',
    template: `
        <thy-breadcrumb [thyIcon]="thyIconName" [thySeparator]="thySeparator">
            <ng-container *ngFor="let item of data">
                <thy-breadcrumb-item
                    ><span>{{ item.name }}</span></thy-breadcrumb-item
                >
            </ng-container>
        </thy-breadcrumb>
    `
})
class ThyDemoBreadcrumbBasicComponent {
    thyIconName = `folder-fill`;
    thySeparator = `slash`;
    data = [{ name: '首页' }, { name: '产品研发部' }, { name: '架构' }, { name: '基础' }];

    addData() {
        this.data = [...this.data, { name: '内容1' }, { name: '内容2' }, { name: '内容3' }];
    }
}

@Component({
    selector: 'thy-demo-breadcrumb-content-ref',
    template: `
        <thy-breadcrumb [thyMaxItemCount]="max" [thyIcon]="thyIconName" [thySeparator]="thySeparator">
            <ng-container *ngFor="let item of data">
                <thy-breadcrumb-item>
                    <ng-template #contentRef>
                        <span>{{ item.name }}</span>
                    </ng-template>
                </thy-breadcrumb-item>
            </ng-container>
        </thy-breadcrumb>
    `
})
export class ThyDemoBreadcrumbContentRefComponent {
    data = [{ name: '首页' }, { name: '产品研发部' }, { name: '架构' }, { name: '基础' }];

    max = 3;

    addData(data: { name: string }[] = []) {
        this.data = [...this.data, { name: '内容1' }, { name: '内容2' }, { name: '内容3' }, ...data];
    }
}

@NgModule({
    imports: [CommonModule, ThyBreadcrumbModule, ThyIconModule],
    declarations: [ThyDemoBreadcrumbBasicComponent, ThyDemoBreadcrumbContentRefComponent],
    exports: [ThyDemoBreadcrumbBasicComponent, ThyDemoBreadcrumbContentRefComponent]
})
export class BreadcrumbTestModule {}

describe('ThyBreadcrumb', () => {
    function assertBreadcrumbComponentAndItemsClass(breadcrumbComponent: DebugElement, breadcrumbItems) {
        expect(breadcrumbComponent.nativeElement.classList.contains('thy-breadcrumb')).toBe(true);
        expect(breadcrumbItems.every(item => item.nativeElement.classList.contains('thy-breadcrumb-item'))).toBe(true);
    }

    function getFoldIconElement(breadcrumbComponent: DebugElement) {
        const breadcrumbItem = breadcrumbComponent.nativeElement.children[0];
        const iconElement = breadcrumbItem.children[0].children[0];
        return iconElement;
    }

    function assertBreadcrumbIconClass(breadcrumbComponent: DebugElement, expectedIconClass?: string) {
        const breadcrumbIcon = breadcrumbComponent.nativeElement.children[0];
        expect(breadcrumbIcon).toBeTruthy();
        expect(breadcrumbIcon.classList.contains(`thy-breadcrumb-icon`)).toBe(true);
        const iconElement = breadcrumbIcon.children[0];
        expect(iconElement).toBeTruthy();
        if (expectedIconClass.includes('wtf')) {
            expect(iconElement.classList.contains(`wtf`)).toBe(true);
            expect(iconElement.classList.contains(expectedIconClass)).toBe(
                true,
                `expectedIconClass is ${expectedIconClass}, but actual is ${iconElement.classList}`
            );
        } else {
            expect(iconElement.classList.contains(`thy-icon`)).toBe(true);
            expect(iconElement.classList.contains(`thy-icon-${expectedIconClass}`)).toBe(
                true,
                `expectedIconClass is thy-icon-${expectedIconClass}, but actual is ${iconElement.classList}`
            );
        }
    }

    function assertBreadcrumbFoldIcon(breadcrumbComponent: DebugElement) {
        const iconElement = getFoldIconElement(breadcrumbComponent);
        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains(`thy-icon`)).toBe(true);
        expect(iconElement.classList.contains(`thy-icon-file-more`)).toBe(
            true,
            `expectedIconClass is thy-icon-file-more, but actual is ${iconElement.classList}`
        );
    }

    function assertBreadcrumbExpandItem(breadcrumbComponent: DebugElement, count: number = 5) {
        const items = breadcrumbComponent.nativeElement.children;
        const childrenCount = items.length;
        // reduce 1 because items includes folds icon elements
        expect(childrenCount - 1).toBe(count);
    }

    function assertBreadcrumbFoldItem(
        testComponent: Partial<ThyDemoBreadcrumbBasicComponent & ThyDemoBreadcrumbContentRefComponent>,
        count: number = 2
    ) {
        const actionMenu = document.querySelector('.action-menu');
        const items = actionMenu.children as any;
        expect(items.length).toBe(count);
        expect(items[0].innerText).toBe(testComponent.data[0].name);
    }

    describe('basic breadcrumb', () => {
        let fixture: ComponentFixture<ThyDemoBreadcrumbBasicComponent | ThyDemoBreadcrumbContentRefComponent>;
        let basicTestComponent: Partial<ThyDemoBreadcrumbBasicComponent & ThyDemoBreadcrumbContentRefComponent>;
        let breadcrumbComponent: DebugElement;
        let breadcrumbItems: DebugElement[];

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    ThyActionMenuModule,
                    ThyBreadcrumbModule,
                    BreadcrumbTestModule,
                    ThyIconModule,
                    BrowserAnimationsModule
                ],
                providers: []
            });

            TestBed.compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoBreadcrumbBasicComponent);
            basicTestComponent = fixture.debugElement.componentInstance;
            breadcrumbItems = fixture.debugElement.queryAll(By.directive(ThyBreadcrumbItemComponent));
            breadcrumbComponent = fixture.debugElement.query(By.directive(ThyBreadcrumbComponent));
        });

        it('should have correct class', () => {
            fixture.detectChanges();
            assertBreadcrumbComponentAndItemsClass(breadcrumbComponent, breadcrumbItems);
            assertBreadcrumbIconClass(breadcrumbComponent, `folder-fill`);
            expect(breadcrumbComponent.nativeElement.classList.contains('separator-slash')).toBe(true);
        });

        it('should have correct class when change icon name', () => {
            basicTestComponent.thyIconName = `folder-open-fill`;
            fixture.detectChanges();
            assertBreadcrumbComponentAndItemsClass(breadcrumbComponent, breadcrumbItems);
            assertBreadcrumbIconClass(breadcrumbComponent, `folder-open-fill`);
        });

        it('should have correct class when icon with wtf', () => {
            basicTestComponent.thyIconName = `wtf wtf-folder1`;
            fixture.detectChanges();
            assertBreadcrumbComponentAndItemsClass(breadcrumbComponent, breadcrumbItems);
            assertBreadcrumbIconClass(breadcrumbComponent, `wtf-folder1`);
        });

        it('should have not icon element when icon is null', () => {
            basicTestComponent.thyIconName = ``;
            fixture.detectChanges();
            const breadcrumbIcon = breadcrumbComponent.nativeElement.querySelector(`thy-breadcrumb-icon`);
            expect(breadcrumbIcon).toBeNull();
        });

        it('should have correct class when separator is backslash', () => {
            basicTestComponent.thySeparator = `backslash`;
            fixture.detectChanges();
            expect(breadcrumbComponent.nativeElement.classList.contains('separator-backslash')).toBe(true);
        });

        it('should have correct class when separator is null', () => {
            basicTestComponent.thySeparator = ``;
            fixture.detectChanges();
            assertBreadcrumbComponentAndItemsClass(breadcrumbComponent, breadcrumbItems);
        });

        it('should fold breadcrumb items when breadcrumb data length overflow 5', () => {
            basicTestComponent.addData();
            fixture.detectChanges();
            assertBreadcrumbFoldIcon(breadcrumbComponent);
        });

        it('should have correct breadcrumb item when breadcrumb fold', () => {
            basicTestComponent.addData();
            fixture.detectChanges();
            assertBreadcrumbExpandItem(breadcrumbComponent);
        });

        it('should have correct fold breadcrumb item when open fold', () => {
            basicTestComponent.addData();
            fixture.detectChanges();
            const foldElement = getFoldIconElement(breadcrumbComponent);
            foldElement.click();
            assertBreadcrumbFoldItem(basicTestComponent);
            foldElement.click();
        });
    });

    describe('content ref breadcrumb item', () => {
        let fixture: ComponentFixture<ThyDemoBreadcrumbBasicComponent | ThyDemoBreadcrumbContentRefComponent>;
        let contentRefTestComponent: Partial<ThyDemoBreadcrumbBasicComponent & ThyDemoBreadcrumbContentRefComponent>;
        let breadcrumbComponent: DebugElement;
        let breadcrumbItems: DebugElement[];

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [
                    CommonModule,
                    ThyActionMenuModule,
                    ThyBreadcrumbModule,
                    BreadcrumbTestModule,
                    ThyIconModule,
                    BrowserAnimationsModule
                ],
                providers: []
            });

            TestBed.compileComponents();
        }));
        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoBreadcrumbContentRefComponent);
            contentRefTestComponent = fixture.debugElement.componentInstance;
            breadcrumbItems = fixture.debugElement.queryAll(By.directive(ThyBreadcrumbItemComponent));
            breadcrumbComponent = fixture.debugElement.query(By.directive(ThyBreadcrumbComponent));
        });

        it('should fold breadcrumb items when breadcrumb data length overflow 5', () => {
            contentRefTestComponent.addData();
            fixture.detectChanges();
            assertBreadcrumbFoldIcon(breadcrumbComponent);
        });

        it('should have correct breadcrumb item when breadcrumb fold', () => {
            contentRefTestComponent.addData();
            fixture.detectChanges();
            assertBreadcrumbExpandItem(breadcrumbComponent, contentRefTestComponent.max);
        });

        it('should have correct fold breadcrumb item when open fold', () => {
            contentRefTestComponent.addData();
            fixture.detectChanges();
            const foldElement = getFoldIconElement(breadcrumbComponent);
            foldElement.click();
            assertBreadcrumbFoldItem(contentRefTestComponent, contentRefTestComponent.data.length);
            foldElement.click();
        });

        it('should have correct breadcrumb items when breadcrumb data change', () => {
            contentRefTestComponent.addData([{ name: '大象席地而坐' }, { name: '大象不会坐' }]);
            fixture.detectChanges();
            const foldElement = getFoldIconElement(breadcrumbComponent);
            foldElement.click();
            assertBreadcrumbFoldItem(contentRefTestComponent, contentRefTestComponent.data.length);
        });
    });
});

import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyBreadcrumbModule } from '../module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { ThyBreadcrumbItemComponent } from '../breadcrumb-item.component';
import { By } from '@angular/platform-browser';
import { ThyBreadcrumbComponent } from '../breadcrumb.component';
import { ThyIconModule } from './../../icon/icon.module';

@Component({
    selector: 'thy-demo-breadcrumb-basic',
    template: `
        <thy-breadcrumb [thyIcon]="thyIconName" [thySeparator]="thySeparator">
            <thy-breadcrumb-item><span>首页</span></thy-breadcrumb-item>
            <thy-breadcrumb-item>
                <a href="javascript:;">产品研发部</a>
            </thy-breadcrumb-item>
            <thy-breadcrumb-item>
                <a href="javascript:;">架构</a>
            </thy-breadcrumb-item>
            <thy-breadcrumb-item>
                <a href="javascript:;">基础 <thy-icon thyIconName="angle-down"></thy-icon></a>
            </thy-breadcrumb-item>
        </thy-breadcrumb>
    `
})
class ThyDemoBreadcrumbBasicComponent {
    thyIconName = `folder-fill`;
    thySeparator = `slash`;
}

@NgModule({
    imports: [ThyBreadcrumbModule, ThyIconModule],
    declarations: [ThyDemoBreadcrumbBasicComponent],
    exports: [ThyDemoBreadcrumbBasicComponent]
})
export class BreadcrumbTestModule {}

describe('ThyBreadcrumb', () => {
    let fixture: ComponentFixture<ThyDemoBreadcrumbBasicComponent>;
    let basicTestComponent: ThyDemoBreadcrumbBasicComponent;
    let breadcrumbComponent: DebugElement;
    let breadcrumbItems: DebugElement[];

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyBreadcrumbModule, BreadcrumbTestModule, ThyIconModule],
            providers: [
                // { provide: Location, useClass: SpyLocation }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoBreadcrumbBasicComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        breadcrumbItems = fixture.debugElement.queryAll(By.directive(ThyBreadcrumbItemComponent));
        breadcrumbComponent = fixture.debugElement.query(By.directive(ThyBreadcrumbComponent));
    });

    function assertBreadcrumbComponentAndItemsClass() {
        expect(breadcrumbComponent.nativeElement.classList.contains('thy-breadcrumb')).toBe(true);
        expect(breadcrumbItems.every(item => item.nativeElement.classList.contains('thy-breadcrumb-item'))).toBe(true);
    }

    function assertBreadcrumbIconClass(expectedIconClass?: string) {
        const breadcrumbIcon = breadcrumbComponent.nativeElement.children[0];
        expect(breadcrumbIcon).toBeTruthy();
        expect(breadcrumbIcon.classList.contains(`thy-breadcrumb-icon`)).toBe(true);
        const iconElement = breadcrumbIcon.children[0];
        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains(`thy-icon`)).toBe(true);
        expect(iconElement.classList.contains(`thy-icon-${expectedIconClass}`)).toBe(
            true,
            `expectedIconClass is thy-icon-${expectedIconClass}, but actual is ${iconElement.classList}`
        );
    }

    it('should have correct class', () => {
        fixture.detectChanges();
        assertBreadcrumbComponentAndItemsClass();
        assertBreadcrumbIconClass(`folder-fill`);
        expect(breadcrumbComponent.nativeElement.classList.contains('separator-slash')).toBe(true);
    });

    it('should have correct class when change icon name', () => {
        basicTestComponent.thyIconName = `folder-open-fill`;
        fixture.detectChanges();
        assertBreadcrumbComponentAndItemsClass();
        assertBreadcrumbIconClass(`folder-open-fill`);
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
        assertBreadcrumbComponentAndItemsClass();
    });
});

import { fakeAsync, TestBed, ComponentFixture, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { ThyBreadcrumbModule } from '../module';
import { Component } from '@angular/core';
import { ThyBreadcrumbItem } from '../breadcrumb-item.component';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'thy-demo-breadcrumb-basic',
    template: `
        <thy-breadcrumb [thyItems]="breadcrumbs" [thyMaxCount]="maxCount" [thyExpandable]="expandable">
            <ng-template #item let-value>{{ value }}</ng-template>
        </thy-breadcrumb>
    `,
    standalone: false
})
class ThyDemoBreadcrumbWithItemsComponent {
    breadcrumbs = ['一级', '二级', '三级', '四级', '五级', '六级'];

    maxCount = 4;

    expandable = true;
}

describe('ThyBreadcrumb With Items', () => {
    let fixture: ComponentFixture<ThyDemoBreadcrumbWithItemsComponent>;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyBreadcrumbModule, NoopAnimationsModule],
            declarations: [ThyDemoBreadcrumbWithItemsComponent],
            providers: [provideHttpClient()]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoBreadcrumbWithItemsComponent);
        fixture.detectChanges();
    });

    it(`should ellipsis when items length less than or equal maxCount`, () => {
        const breadcrumbs = ['一级', '二级', '三级', '四级'];
        fixture.componentInstance.breadcrumbs = breadcrumbs;
        fixture.detectChanges();

        const breadcrumbItems = fixture.debugElement.queryAll(By.directive(ThyBreadcrumbItem));
        expect(breadcrumbItems.length).toBe(breadcrumbs.length);
        breadcrumbs.forEach((item, index) => {
            expect(breadcrumbItems[index].nativeElement.textContent.trim()).toEqual(item);
        });
    });

    it(`should not ellipsis when thyMaxCount is 0`, () => {
        fixture.componentInstance.maxCount = 0;
        fixture.detectChanges();
        const breadcrumbItems = fixture.debugElement.queryAll(By.directive(ThyBreadcrumbItem));
        expect(breadcrumbItems.length).toBe(fixture.componentInstance.breadcrumbs.length);
    });

    it(`should ellipsis correctly`, fakeAsync(() => {
        const breadcrumbItems = fixture.debugElement.queryAll(By.directive(ThyBreadcrumbItem));
        fixture.detectChanges();
        expect(breadcrumbItems.length).toBe(fixture.componentInstance.maxCount);
        const ellipsisAction: HTMLElement = breadcrumbItems[1].query(By.css('.ellipsis-action')).nativeElement;
        expect(ellipsisAction).toBeTruthy();

        ellipsisAction.click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const dropdown = document.querySelector('thy-dropdown-menu');
        const dropdownItems = dropdown.querySelectorAll('.dropdown-menu-item');
        expect(dropdown).toBeTruthy();
        expect(dropdownItems.length).toBe(3);
        discardPeriodicTasks();
    }));

    it(`should expandable worked`, () => {
        fixture.componentInstance.expandable = false;
        fixture.detectChanges();
        const breadcrumbItems = fixture.debugElement.queryAll(By.directive(ThyBreadcrumbItem));
        const ellipsisAction: HTMLElement = breadcrumbItems[1].query(By.css('.ellipsis-action')).nativeElement;
        expect(ellipsisAction.classList.contains('disabled')).toBeTruthy();
    });
});

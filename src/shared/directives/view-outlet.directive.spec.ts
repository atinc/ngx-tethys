import { ApplicationRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchEvent, dispatchFakeEvent } from 'ngx-tethys/testing';

import { ThySharedModule } from '../shared.module';

@Component({
    selector: 'thy-shared-view-outlet-template-test',
    template: `
        <ng-container *thyViewOutlet="counter; context: { count: count }"></ng-container>

        <ng-template #counter let-count="count">Count: {{ count }}</ng-template>
    `
})
class ThyViewOutletTemplateTestComponent {
    count = 1;
}

@Component({
    selector: 'thy-shared-view-outlet-content',
    template: `
        Count: {{ count }}
    `
})
class ThyViewOutletContentTestComponent {
    count = 1;
}

@Component({
    selector: 'thy-shared-view-outlet-component-test',
    template: `
        <ng-container *thyViewOutlet="contentComponent; context: { count: count }"></ng-container>
    `
})
class ThyViewOutletComponentTestComponent {
    contentComponent = ThyViewOutletContentTestComponent;
    count = 1;
}

describe('thy-view-outlet', () => {
    describe('template', () => {
        let fixture: ComponentFixture<ThyViewOutletTemplateTestComponent>;
        let fixtureInstance: ThyViewOutletTemplateTestComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyViewOutletTemplateTestComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyViewOutletTemplateTestComponent);
            fixtureInstance = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should render template outlet', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.textContent).toEqual('Count: 1');
        });

        it('should update context for template outlet', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            fixtureInstance.count = 10;
            fixture.detectChanges();
            expect(element.textContent).toEqual('Count: 10');
        });
    });

    describe('component', () => {
        let fixture: ComponentFixture<ThyViewOutletComponentTestComponent>;
        let fixtureInstance: ThyViewOutletComponentTestComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyViewOutletComponentTestComponent, ThyViewOutletContentTestComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyViewOutletComponentTestComponent);
            fixtureInstance = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should render component outlet', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.textContent).toContain('Count: 1');
        });

        it('should update context for component outlet', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            fixtureInstance.count = 10;
            fixture.detectChanges();
            expect(element.textContent).toContain('Count: 10');
        });
    });
});

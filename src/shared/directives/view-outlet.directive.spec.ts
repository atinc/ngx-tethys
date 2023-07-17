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
    template: `Count: {{ count }}`
})
class ThyViewOutletContentTestComponent {
    count = 1;
}

@Component({
    selector: 'thy-shared-view-outlet-component-test',
    template: `<ng-container *thyViewOutlet="contentComponent; context: context"></ng-container>`
})
class ThyViewOutletComponentTestComponent {
    contentComponent = ThyViewOutletContentTestComponent;
    context = { count: 1 };
}

@Component({
    selector: 'thy-shared-view-outlet-content-multi',
    template: `Count: {{ count }}, Name: {{ innerName }}, Called: {{ nameSetInvokeCount }}`
})
class ThyViewOutletContentMultiTestComponent {
    count = 1;

    innerName: string;

    nameSetInvokeCount = 0;

    set name(value: string) {
        this.innerName = value;
        this.nameSetInvokeCount = this.nameSetInvokeCount + 1;
    }
}

@Component({
    selector: 'thy-shared-view-outlet-component-multi-test',
    template: `<ng-container *thyViewOutlet="contentComponent; context: { count: count, name: name }"></ng-container>`
})
class ThyViewOutletComponentMultiTestComponent {
    contentComponent = ThyViewOutletContentMultiTestComponent;
    count = 1;
    name = 'peter';
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
            fixtureInstance.context = { count: 10 };
            fixture.detectChanges();
            expect(element.textContent).toContain('Count: 10');
        });

        it('should update context when current context and previous context are the same object', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            fixtureInstance.context = { ...fixtureInstance.context };
            fixture.detectChanges();
            expect(element.textContent).toContain('Count: 1');
        });
    });

    describe('component-multi', () => {
        let fixture: ComponentFixture<ThyViewOutletComponentMultiTestComponent>;
        let fixtureInstance: ThyViewOutletComponentMultiTestComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyViewOutletComponentMultiTestComponent, ThyViewOutletContentMultiTestComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyViewOutletComponentMultiTestComponent);
            fixtureInstance = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should render component outlet', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            expect(element.textContent).toContain('Count: 1');
            expect(element.textContent).toContain('Name: peter');
            expect(element.textContent).toContain('Called: 1');
        });

        it('should update context that changed', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            fixtureInstance.count = 10;
            fixture.detectChanges();
            expect(element.textContent).toContain('Count: 10');
            expect(element.textContent).toContain('Name: peter');
            expect(element.textContent).toContain('Called: 1');
            fixtureInstance.name = 'lily';
            fixture.detectChanges();
            expect(element.textContent).toContain('Name: lily');
            expect(element.textContent).toContain('Called: 2');
        });
    });
});

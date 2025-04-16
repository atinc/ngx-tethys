import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThySharedModule } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-shared-view-outlet-template-test',
    template: `
        <ng-container *thyViewOutlet="counter; context: { count: count }"></ng-container>

        <ng-template #counter let-count="count">Count: {{ count }}</ng-template>
    `,
    imports: [ThySharedModule]
})
class ThyViewOutletTemplateTestComponent {
    count = 1;
}

@Component({
    selector: 'thy-shared-view-outlet-content',
    template: `Count: {{ count }}`,
    imports: [ThySharedModule]
})
class ThyViewOutletContentTestComponent {
    count = 1;
}

@Component({
    selector: 'thy-shared-view-outlet-component-test',
    template: `<ng-container *thyViewOutlet="contentComponent; context: context"></ng-container>`,
    imports: [ThySharedModule]
})
class ThyViewOutletComponentTestComponent {
    contentComponent = ThyViewOutletContentTestComponent;
    context = { count: 1 };
}

let contentMultiTestChanges: SimpleChanges;
@Component({
    selector: 'thy-shared-view-outlet-content-multi',
    template: `Count: {{ count }}, Name: {{ innerName }}, Called: {{ nameSetInvokeCount }}, Input Name: {{ inputName }}`,
    imports: [ThySharedModule]
})
class ThyViewOutletContentMultiTestComponent implements OnChanges {
    @Input() count = 1;

    innerName: string;

    nameSetInvokeCount = 0;

    set name(value: string) {
        this.innerName = value;
        this.nameSetInvokeCount = this.nameSetInvokeCount + 1;
    }

    @Input() inputName: string;

    ngOnChanges(changes: SimpleChanges): void {
        contentMultiTestChanges = changes;
    }
}

@Component({
    selector: 'thy-shared-view-outlet-component-multi-test',
    template: `<ng-container
        *thyViewOutlet="contentComponent; context: { count: count, name: name, inputName: inputName }"></ng-container>`,
    imports: [ThySharedModule]
})
class ThyViewOutletComponentMultiTestComponent {
    contentComponent = ThyViewOutletContentMultiTestComponent;
    count = 1;
    name = 'peter';
    inputName: string = undefined;
}

describe('thy-view-outlet', () => {
    describe('template', () => {
        let fixture: ComponentFixture<ThyViewOutletTemplateTestComponent>;
        let fixtureInstance: ThyViewOutletTemplateTestComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({});
            TestBed.compileComponents();
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
            TestBed.configureTestingModule({});
            TestBed.compileComponents();
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
            TestBed.configureTestingModule({});
            TestBed.compileComponents();
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

        it('should trigger ngOnChanges when update inputName', () => {
            const element = fixture.debugElement.nativeElement as HTMLElement;
            fixtureInstance.inputName = 'peter';
            const beforeChanges = contentMultiTestChanges;
            expect(beforeChanges.inputName.previousValue).toEqual(undefined);
            expect(beforeChanges.inputName.currentValue).toEqual(undefined);
            expect(beforeChanges.inputName.isFirstChange()).toEqual(true);
            fixture.detectChanges();
            expect(element.textContent).toContain('Input Name: peter');
            const afterChanges = contentMultiTestChanges;
            expect(afterChanges.inputName.previousValue).toEqual(undefined);
            expect(afterChanges.inputName.currentValue).toEqual('peter');
            expect(afterChanges.inputName.isFirstChange()).toEqual(false);
        });
    });
});

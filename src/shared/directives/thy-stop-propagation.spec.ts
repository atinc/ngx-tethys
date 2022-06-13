import { ApplicationRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchEvent, dispatchFakeEvent } from 'ngx-tethys/testing';

import { ThySharedModule } from '../shared.module';

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" thyStopPropagation></div>
        </div>
    `
})
class ThyStopPropagationDirectiveTrueViewComponent {
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" [thyStopPropagation]></div>
        </div>
    `
})
class ThyStopPropagationDirectiveTrueComponent {
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" [thyStopPropagation]="true"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveBooleanTrueComponent {
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" [thyStopPropagation]="'true'"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveStringTrueComponent {
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" [thyStopPropagation]="false"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveFalseComponent {
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" thyStopPropagation="false"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveFalseViewComponent {
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" [thyStopPropagation]="'hover'"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveEventComponent {
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()" (mouseover)="parentMouseOver()">
            <div class="child-container" [thyStopPropagation]="'mouseover'"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveValueIsEventNameComponent {
    parentClick = jasmine.createSpy('thyStopPropagation click callback');
    parentMouseOver = jasmine.createSpy('thyStopPropagation mouseover callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()">
            <div class="child-container" [thyStopPropagation]="isStopPropagation"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveValueIsUndefinedComponent {
    isStopPropagation: string | boolean;
    parentClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="parent-container" (click)="parentClick()" (mouseover)="parentMouseover()">
            <div class="child-container" [thyStopPropagation]="stopPropagation"></div>
        </div>
    `
})
class ThyStopPropagationDirectiveWithDynamicBindingComponent {
    stopPropagation: string | boolean;
    parentClick = jasmine.createSpy('thyStopPropagation click callback');
    parentMouseover = jasmine.createSpy('thyStopPropagation mouseover callback');
}

describe('thy-stop-propagation', () => {
    describe('thy-stop-propagation', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveTrueViewComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveTrueViewComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveTrueViewComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveTrueViewComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should stop propagation when thyStopPropagation is not false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thy-stop-propagation-true', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveTrueComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveTrueComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveTrueComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveTrueComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should stop propagation when thyStopPropagation is not false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thyStopPropagation value is string true', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveStringTrueComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveStringTrueComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveStringTrueComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveStringTrueComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should stop propagation when value is string true', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thyStopPropagation value is boolean true', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveBooleanTrueComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveBooleanTrueComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveBooleanTrueComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveBooleanTrueComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should stop propagation when value is boolean true', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thy-stop-propagation-false', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveFalseComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveFalseComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveFalseComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveFalseComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should propagation when thyStopPropagation is false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('thy-stop-propagation-false', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveFalseViewComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveFalseViewComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveFalseViewComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveFalseViewComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should propagation when thyStopPropagation is false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('thy-stop-propagation-event', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveEventComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveEventComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveEventComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveEventComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should stop propagation when hover', () => {
            childElement.nativeElement.thyTriggerAction = 'hover';
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thyStopPropagation value is mouseover', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveValueIsEventNameComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveValueIsEventNameComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveValueIsEventNameComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveValueIsEventNameComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should stop propagation for mouseover event when value is mouseover', () => {
            dispatchFakeEvent(childElement.nativeElement, 'mouseover', true);
            fixture.detectChanges();
            expect(fixtureInstance.parentMouseOver).toHaveBeenCalledTimes(0);
        });

        it('should not stop propagation for click event when value is mouseover', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('thyStopPropagation value is undefined', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveValueIsUndefinedComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveValueIsUndefinedComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveValueIsUndefinedComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveValueIsUndefinedComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should stop propagation when value is undefined', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thyStopPropagation with dynamic binding', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveWithDynamicBindingComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveWithDynamicBindingComponent;
        let childElement: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule],
                declarations: [ThyStopPropagationDirectiveWithDynamicBindingComponent]
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyStopPropagationDirectiveWithDynamicBindingComponent);
            fixtureInstance = fixture.componentInstance;
            childElement = fixture.debugElement.query(By.css('.child-container'));
            fixture.detectChanges();
        });

        it('should not run change detection when the element is clicked', () => {
            fixtureInstance.stopPropagation = true;
            fixture.detectChanges();

            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');

            childElement.nativeElement.click();

            expect(appRef.tick).not.toHaveBeenCalled();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(0);
        });

        it('should respect dynamic binding', () => {
            fixtureInstance.stopPropagation = false;
            fixture.detectChanges();

            childElement.nativeElement.click();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(1);

            fixtureInstance.stopPropagation = 'mouseover';
            fixture.detectChanges();

            const mouseoverEvent = new Event('mouseover');
            spyOn(mouseoverEvent, 'stopPropagation').and.callThrough();
            dispatchEvent(childElement.nativeElement, mouseoverEvent);

            expect(mouseoverEvent.stopPropagation).toHaveBeenCalled();
            expect(fixtureInstance.parentMouseover).not.toHaveBeenCalled();

            fixtureInstance.stopPropagation = false;
            fixture.detectChanges();

            childElement.nativeElement.click();
            expect(fixtureInstance.parentClick).toHaveBeenCalledTimes(2);
        });
    });
});

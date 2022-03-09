import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchFakeEvent } from 'ngx-tethys/testing';
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

describe('thy-stop-propagation', () => {
    describe('thy-stop-propagation', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveTrueViewComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveTrueViewComponent;
        let childElement: DebugElement;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveTrueViewComponent]
            }).compileComponents();
        }));

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

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveTrueComponent]
            }).compileComponents();
        }));

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
        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveStringTrueComponent]
            }).compileComponents();
        }));

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
        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveBooleanTrueComponent]
            }).compileComponents();
        }));

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

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveFalseComponent]
            }).compileComponents();
        }));

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

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveFalseViewComponent]
            }).compileComponents();
        }));

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

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveEventComponent]
            }).compileComponents();
        }));

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
        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveValueIsEventNameComponent]
            }).compileComponents();
        }));

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
        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ThySharedModule, BrowserAnimationsModule],
                declarations: [ThyStopPropagationDirectiveValueIsUndefinedComponent]
            }).compileComponents();
        }));

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
});

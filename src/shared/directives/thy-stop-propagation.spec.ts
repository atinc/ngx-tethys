import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThySharedModule } from '../shared.module';

@Component({
    template: `
        <div class="fatherContainer" (click)="fatherClick()">
            <div class="childContainer" thyStopPropagation></div>
        </div>
    `,
    styles: [
        `
            .childContainer {
                width: 50px;
                height: 50px;
            }
        `
    ]
})
class ThyStopPropagationDirectiveTrueViewComponent {
    fatherClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="fatherContainer" (click)="fatherClick()">
            <div class="childContainer" [thyStopPropagation]></div>
        </div>
    `,
    styles: [
        `
            .childContainer {
                width: 50px;
                height: 50px;
            }
        `
    ]
})
class ThyStopPropagationDirectiveTrueComponent {
    fatherClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="fatherContainer" (click)="fatherClick()">
            <div class="childContainer" [thyStopPropagation]="false"></div>
        </div>
    `,
    styles: [
        `
            .childContainer {
                width: 50px;
                height: 50px;
            }
        `
    ]
})
class ThyStopPropagationDirectiveFalseComponent {
    fatherClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="fatherContainer" (click)="fatherClick()">
            <div class="childContainer" thyStopPropagation="false"></div>
        </div>
    `,
    styles: [
        `
            .childContainer {
                width: 50px;
                height: 50px;
            }
        `
    ]
})
class ThyStopPropagationDirectiveFalseViewComponent {
    fatherClick = jasmine.createSpy('thyStopPropagation callback');
}

@Component({
    template: `
        <div class="fatherContainer" (click)="fatherClick()">
            <div class="childContainer" [thyStopPropagation]="hover"></div>
        </div>
    `,
    styles: [
        `
            .childContainer {
                width: 50px;
                height: 50px;
            }
        `
    ]
})
class ThyStopPropagationDirectiveEventComponent {
    fatherClick = jasmine.createSpy('thyStopPropagation callback');
}

describe('thy-stop-propagation', () => {
    describe('thy-stop-propagation', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveTrueViewComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveTrueViewComponent;
        let fatherElement: DebugElement;
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
            fatherElement = fixture.debugElement.query(By.css('.fatherContainer'));
            childElement = fixture.debugElement.query(By.css('.childContainer'));
            fixture.detectChanges();
        });

        it('should stop propagation when thyStopPropagation is not false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.fatherClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thy-stop-propagation-true', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveTrueComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveTrueComponent;
        let fatherElement: DebugElement;
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
            fatherElement = fixture.debugElement.query(By.css('.fatherContainer'));
            childElement = fixture.debugElement.query(By.css('.childContainer'));
            fixture.detectChanges();
        });

        it('should stop propagation when thyStopPropagation is not false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.fatherClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('thy-stop-propagation-false', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveFalseComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveFalseComponent;
        let fatherElement: DebugElement;
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
            fatherElement = fixture.debugElement.query(By.css('.fatherContainer'));
            childElement = fixture.debugElement.query(By.css('.childContainer'));
            fixture.detectChanges();
        });

        it('should propagation when thyStopPropagation is false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.fatherClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('thy-stop-propagation-false', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveFalseViewComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveFalseViewComponent;
        let fatherElement: DebugElement;
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
            fatherElement = fixture.debugElement.query(By.css('.fatherContainer'));
            childElement = fixture.debugElement.query(By.css('.childContainer'));
            fixture.detectChanges();
        });

        it('should propagation when thyStopPropagation is false', () => {
            childElement.nativeElement.click();
            fixture.detectChanges();
            expect(fixtureInstance.fatherClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('thy-stop-propagation-event', () => {
        let fixture: ComponentFixture<ThyStopPropagationDirectiveEventComponent>;
        let fixtureInstance: ThyStopPropagationDirectiveEventComponent;
        let fatherElement: DebugElement;
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
            fatherElement = fixture.debugElement.query(By.css('.fatherContainer'));
            childElement = fixture.debugElement.query(By.css('.childContainer'));
            fixture.detectChanges();
        });

        it('should stop propagation when hover', () => {
            childElement.nativeElement.thyTriggerAction = 'hover';
            fixture.detectChanges();
            expect(fixtureInstance.fatherClick).toHaveBeenCalledTimes(0);
        });
    });
});

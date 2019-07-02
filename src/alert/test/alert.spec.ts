import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyAlertModule } from '../alert.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyAlertComponent } from '../alert.component';

describe('ThyAlert', () => {
    let fixture: ComponentFixture<ThyDemoAlertComponent>;
    let testComponent: ThyDemoAlertComponent;
    let alertComponent;
    let alertElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyAlertModule, AlertTestModule],
            providers: []
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoAlertComponent);
        testComponent = fixture.debugElement.componentInstance;
        alertComponent = fixture.debugElement.query(By.directive(ThyAlertComponent));
        alertElement = alertComponent.nativeElement.children[0];
    });

    it('should create', () => {
        expect(alertComponent).toBeTruthy();
        expect(alertElement).toBeTruthy();
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        const iconElement = alertElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-info')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-minus-circle-fill')).toBe(true);
    });

    it('should have correct text', () => {
        fixture.detectChanges();
        const textElement = alertElement.children[1];
        expect(textElement.textContent).toContain(testComponent.message);
    });

    it('should have correct class when type is success', () => {
        testComponent.type = `success`;
        fixture.detectChanges();
        const iconElement = alertElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-success')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-check-circle-fill')).toBe(true);
    });

    it('should have correct class when type is warning', () => {
        testComponent.type = `warning`;
        fixture.detectChanges();
        const iconElement = alertElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-warning')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-waring-fill')).toBe(true);
    });

    it('should have correct class when type is danger', () => {
        testComponent.type = `danger`;
        fixture.detectChanges();
        const iconElement = alertElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-danger')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-close-circle-fill')).toBe(true);
    });

    it('should have correct class when type is primary-week', () => {
        testComponent.type = `primary-week`;
        fixture.detectChanges();
        const iconElement = alertElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-primary-week')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-question-circle-fill')).toBe(true);
    });

    it('should have correct class when icon is available string', () => {
        testComponent.icon = `wtf-mission`;
        fixture.detectChanges();
        const iconElement = alertElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains('thy-icon-wtf-mission')).toBe(true);
    });

    it('should have correct class when icon is null', () => {
        testComponent.icon = ``;
        fixture.detectChanges();
        const childrenLen = alertElement.children.length;
        expect(childrenLen).toBe(1);
    });

    it('should have correct class when icon is false', () => {
        testComponent.icon = false;
        fixture.detectChanges();
        const childrenLen = alertElement.children.length;
        const textElement = alertElement.children[0];
        expect(childrenLen).toBe(1);
        expect(textElement.textContent).toContain(testComponent.message);
    });

    it('should have not text element when message is null', () => {
        testComponent.message = ``;
        fixture.detectChanges();
        const childrenLen = alertElement.children.length;
        const iconElement = alertElement.children[0];
        expect(childrenLen).toBe(1);
        expect(iconElement.classList.contains('thy-alert-icon')).toBe(true);
    });
});

@Component({
    selector: 'thy-demo-alert',
    template: `
        <thy-alert [thyType]="type" [thyMessage]="message" [thyIcon]="icon"></thy-alert>
    `
})
class ThyDemoAlertComponent {
    type = `info`;
    message = `this is a message`;
    icon: string | boolean = true;
}

@NgModule({
    imports: [ThyAlertModule],
    declarations: [ThyDemoAlertComponent],
    exports: [ThyDemoAlertComponent]
})
export class AlertTestModule {}

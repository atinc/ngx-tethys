import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyAlertModule } from '../alert.module';
import { NgModule, Component, ViewChild, TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyAlertComponent } from '../alert.component';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from '../../core/testing/thy-icon';

describe('ThyAlert', () => {
    let fixture: ComponentFixture<ThyDemoAlertComponent>;
    let testComponent: ThyDemoAlertComponent;
    let alertComponent;
    let alertElement;
    let alertContentElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyAlertModule, AlertTestModule],
            providers: [bypassSanitizeProvider]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoAlertComponent);
        testComponent = fixture.debugElement.componentInstance;
        alertComponent = fixture.debugElement.query(By.directive(ThyAlertComponent));
        alertElement = alertComponent.nativeElement;
        alertContentElement = alertComponent.nativeElement.children[0];
    });

    it('should create', () => {
        expect(alertComponent).toBeTruthy();
        expect(alertElement).toBeTruthy();
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        const iconElement = alertContentElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-info')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-minus-circle-fill')).toBe(true);
    });

    it('should have correct text', () => {
        fixture.detectChanges();
        const textElement = alertContentElement.children[1];
        expect(textElement.textContent).toContain(testComponent.message);
    });

    it('should have correct class when type is success', () => {
        testComponent.type = `success`;
        fixture.detectChanges();
        const iconElement = alertContentElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-success')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-check-circle-fill')).toBe(true);
    });

    it('should have correct class when type is warning', () => {
        testComponent.type = `warning`;
        fixture.detectChanges();
        const iconElement = alertContentElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-warning')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-waring-fill')).toBe(true);
    });

    it('should have correct class when type is danger', () => {
        testComponent.type = `danger`;
        fixture.detectChanges();
        const iconElement = alertContentElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-danger')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-close-circle-fill')).toBe(true);
    });

    it('should have correct class when type is primary-week', () => {
        testComponent.type = `primary-week`;
        fixture.detectChanges();
        const iconElement = alertContentElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(alertElement.classList.contains('thy-alert-primary-week')).toBe(true);
        expect(iconElement.classList.contains('thy-icon-question-circle-fill')).toBe(true);
    });

    it('should have correct class when icon is available string', () => {
        testComponent.icon = `calendar-check`;
        fixture.detectChanges();
        const iconElement = alertContentElement.children[0];
        expect(iconElement).toBeTruthy();
        expect(iconElement.classList.contains('thy-icon-calendar-check')).toBe(true);
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
        const textElement = alertContentElement.children[0];
        expect(childrenLen).toBe(1);
        expect(textElement.textContent).toContain(testComponent.message);
    });

    it('should have not text element when message is null', () => {
        testComponent.message = ``;
        fixture.detectChanges();
        const childrenLen = alertElement.children.length;
        const iconElement = alertContentElement.children[0];
        expect(childrenLen).toBe(1);
        expect(iconElement.classList.contains('thy-alert-icon')).toBe(true);
    });

    it('should have correct element when message is template', () => {
        testComponent.message = testComponent.messageRef;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.message'))).toBeTruthy();
    });

    it('should have close element when thyCloseable is true', () => {
        testComponent.close = true;
        fixture.detectChanges();
        const closeElement = alertElement.children[1];
        expect(closeElement).toBeTruthy();
    });

    it('should close alert when click close', () => {
        testComponent.close = true;
        fixture.detectChanges();
        const closeElement = alertElement.children[1];
        expect(closeElement).toBeTruthy();
        closeElement.click();
        fixture.detectChanges();
        expect(alertComponent.nativeElement.classList.contains('thy-alert-hidden')).toBeTruthy();
    });

    it('should have operation when has operation template', () => {
        testComponent.close = true;
        fixture.detectChanges();
        const operationElement = alertContentElement.children[2];
        expect(operationElement).toBeTruthy();
    });
});

@Component({
    selector: 'thy-demo-alert',
    template: `
        <thy-alert [thyType]="type" [thyCloseable]="close" [thyMessage]="message" [thyIcon]="icon">
            <ng-template #operation>
                <a href="javascript:;" thyAlertActionItem>恢复</a>
                <a href="javascript:;" thyAlertActionItem class="link-danger">彻底删除</a>
            </ng-template>
        </thy-alert>
        <ng-template #messageTemplateRef>
            <div class="message">
                hello world
            </div>
        </ng-template>
    `
})
class ThyDemoAlertComponent {
    type = `info`;
    message: string | TemplateRef<HTMLElement> = `this is a message`;
    icon: string | boolean = true;
    close = false;
    @ViewChild('messageTemplateRef', { static: true }) messageRef: TemplateRef<HTMLElement>;
}

@NgModule({
    imports: [ThyAlertModule],
    declarations: [ThyDemoAlertComponent],
    exports: [ThyDemoAlertComponent]
})
export class AlertTestModule {}

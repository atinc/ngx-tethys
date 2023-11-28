import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyAlertModule } from '../alert.module';
import { NgModule, Component, ViewChild, TemplateRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyAlert } from '../alert.component';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';

describe('ThyAlert', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyAlertModule, AlertTestModule],
            providers: [bypassSanitizeProvider]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<ThyDemoAlertComponent>;
        let testComponent: ThyDemoAlertComponent;
        let alertComponent: DebugElement;
        let alertElement: HTMLElement;
        let alertContentElement: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoAlertComponent);
            testComponent = fixture.debugElement.componentInstance;
            alertComponent = fixture.debugElement.query(By.directive(ThyAlert));
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
            expect(alertElement.classList.contains('thy-alert-fill-info')).toBe(true);
            expect(iconElement.classList.contains('thy-icon-minus-circle-fill')).toBe(true);
        });

        it('should have correct text', () => {
            fixture.detectChanges();
            const textElement = alertContentElement.children[1];
            expect(textElement.textContent).toContain(testComponent.message as string);
        });

        it('should have correct class when type is primary', () => {
            testComponent.type = `primary`;
            fixture.detectChanges();
            const iconElement = alertContentElement.children[0];
            expect(iconElement).toBeTruthy();
            expect(alertElement.classList.contains('thy-alert-fill-primary')).toBe(true);
            expect(iconElement.classList.contains('thy-icon-info-circle-fill')).toBe(true);
        });

        it('should have correct class when type is success', () => {
            testComponent.type = `success`;
            fixture.detectChanges();
            const iconElement = alertContentElement.children[0];
            expect(iconElement).toBeTruthy();
            expect(alertElement.classList.contains('thy-alert-fill-success')).toBe(true);
            expect(iconElement.classList.contains('thy-icon-check-circle-fill')).toBe(true);
        });

        it('should have correct class when type is warning', () => {
            testComponent.type = `warning`;
            fixture.detectChanges();
            const iconElement = alertContentElement.children[0];
            expect(iconElement).toBeTruthy();
            expect(alertElement.classList.contains('thy-alert-fill-warning')).toBe(true);
            expect(iconElement.classList.contains('thy-icon-waring-fill')).toBe(true);
        });

        it('should have correct class when type is danger', () => {
            testComponent.type = `danger`;
            fixture.detectChanges();
            const iconElement = alertContentElement.children[0];
            expect(iconElement).toBeTruthy();
            expect(alertElement.classList.contains('thy-alert-fill-danger')).toBe(true);
            expect(iconElement.classList.contains('thy-icon-close-circle-fill')).toBe(true);
        });

        it('should have correct class when type is primary-weak', () => {
            testComponent.type = `primary-weak`;
            fixture.detectChanges();
            const iconElement = alertContentElement.children[0];
            expect(iconElement).toBeTruthy();
            expect(alertElement.classList.contains('thy-alert-bordered-primary')).toBe(true);
            expect(iconElement.classList.contains('thy-icon-info-circle-fill')).toBe(true);
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
            expect(textElement.textContent).toContain(testComponent.message as string);
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
            const closeElement = alertElement.children[1] as HTMLElement;
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

        it('should have correct class when theme is bordered', () => {
            testComponent.theme = `bordered`;
            fixture.detectChanges();
            expect(alertElement.classList.contains('thy-alert-bordered')).toBe(true);
        });

        it('should have correct class and element when theme is naked', () => {
            testComponent.theme = `naked`;
            fixture.detectChanges();
            const tipsElement = alertContentElement.children[0];
            expect(tipsElement).toBeTruthy();
            expect(alertElement.classList.contains('thy-alert-naked')).toBe(true);
        });
    });
});

@Component({
    selector: 'thy-demo-alert',
    template: `
        <thy-alert [thyTheme]="theme" [thyType]="type" [thyCloseable]="close" [thyMessage]="message" [thyIcon]="icon">
            <ng-template #operation>
                <a href="javascript:;" thyAlertActionItem>恢复</a>
                <a href="javascript:;" thyAlertActionItem class="link-danger">彻底删除</a>
            </ng-template>
        </thy-alert>
        <ng-template #messageTemplateRef>
            <div class="message">hello world</div>
        </ng-template>
    `
})
class ThyDemoAlertComponent {
    theme = 'fill';
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

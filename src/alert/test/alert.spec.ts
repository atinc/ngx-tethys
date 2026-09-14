import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyAlert, ThyAlertActionItemDirective } from 'ngx-tethys/alert';
import { Component, ViewChild, TemplateRef, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { provideHttpClient, withXhr } from '@angular/common/http';

describe('ThyAlert', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [bypassSanitizeProvider, provideHttpClient(withXhr())]
        });
        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    }));

    describe('basic', () => {
        let fixture!: ComponentFixture<ThyDemoAlertComponent>;
        let testComponent!: ThyDemoAlertComponent;
        let alertComponent!: DebugElement;
        let alertElement!: HTMLElement;
        let alertContentElement!: HTMLElement;

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
    });

    describe('thyColor', () => {
        let fixture!: ComponentFixture<ThyDemoAlertColorComponent>;
        let alertElement!: HTMLElement;
        let alertContentElement!: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoAlertColorComponent);
            alertElement = fixture.debugElement.query(By.directive(ThyAlert)).nativeElement;
            alertContentElement = alertElement.children[0] as HTMLElement;
        });

        it('should apply fill classes for theme colors', () => {
            [
                { color: 'primary', className: 'thy-alert-fill-primary', icon: 'thy-icon-info-circle-fill' },
                { color: 'success', className: 'thy-alert-fill-success', icon: 'thy-icon-check-circle-fill' },
                { color: 'warning', className: 'thy-alert-fill-warning', icon: 'thy-icon-waring-fill' },
                { color: 'danger', className: 'thy-alert-fill-danger', icon: 'thy-icon-close-circle-fill' },
                { color: 'info', className: 'thy-alert-fill-info', icon: 'thy-icon-minus-circle-fill' }
            ].forEach(({ color, className, icon }) => {
                fixture.componentInstance.color = color;
                fixture.detectChanges();
                expect(alertElement.classList.contains(className)).toBe(true);
                expect(alertContentElement.children[0].classList.contains(icon)).toBe(true);
            });
        });

        it('should map weak colors to bordered appearance', () => {
            [
                { color: 'primary-weak', className: 'thy-alert-bordered-primary' },
                { color: 'success-weak', className: 'thy-alert-bordered-success' },
                { color: 'warning-weak', className: 'thy-alert-bordered-warning' },
                { color: 'danger-weak', className: 'thy-alert-bordered-danger' }
            ].forEach(({ color, className }) => {
                fixture.componentInstance.color = color;
                fixture.detectChanges();
                expect(alertElement.classList.contains(className)).toBe(true);
                expect(alertElement.classList.contains('thy-alert-fill')).toBe(false);
            });
        });
    });

    describe('thyAppearance', () => {
        let fixture!: ComponentFixture<ThyDemoAlertAppearanceComponent>;
        let alertElement!: HTMLElement;
        let alertContentElement!: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoAlertAppearanceComponent);
            alertElement = fixture.debugElement.query(By.directive(ThyAlert)).nativeElement;
            alertContentElement = alertElement.children[0] as HTMLElement;
        });

        it('should apply appearance classes', () => {
            [
                { appearance: 'fill', classes: ['thy-alert-fill', 'thy-alert-fill-info'] },
                { appearance: 'bordered', classes: ['thy-alert-bordered', 'thy-alert-bordered-info'] },
                { appearance: 'naked', classes: ['thy-alert-naked', 'thy-alert-naked-info'] }
            ].forEach(({ appearance, classes }) => {
                fixture.componentInstance.appearance = appearance;
                fixture.detectChanges();
                classes.forEach(className => {
                    expect(alertElement.classList.contains(className)).toBe(true);
                });
            });
        });

        it('should show tips element only when appearance is naked', () => {
            fixture.componentInstance.appearance = 'naked';
            fixture.detectChanges();
            const tipsElement = alertContentElement.querySelector('.thy-alert-tips');
            expect(tipsElement).toBeTruthy();
            expect(tipsElement!.textContent).toContain('Tips：');

            fixture.componentInstance.appearance = 'fill';
            fixture.detectChanges();
            expect(alertContentElement.querySelector('.thy-alert-tips')).toBeFalsy();

            fixture.componentInstance.appearance = 'bordered';
            fixture.detectChanges();
            expect(alertContentElement.querySelector('.thy-alert-tips')).toBeFalsy();
        });
    });

    describe('deprecated api', () => {
        let fixture!: ComponentFixture<ThyDemoAlertDeprecatedComponent>;
        let alertElement!: HTMLElement;
        let alertContentElement!: HTMLElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyDemoAlertDeprecatedComponent);
            alertElement = fixture.debugElement.query(By.directive(ThyAlert)).nativeElement;
            alertContentElement = alertElement.children[0] as HTMLElement;
        });

        it('should still work with thyType', () => {
            fixture.componentInstance.type = 'success';
            fixture.detectChanges();
            expect(alertElement.classList.contains('thy-alert-fill-success')).toBe(true);
        });

        it('should still work with thyTheme', () => {
            fixture.componentInstance.theme = 'bordered';
            fixture.detectChanges();
            expect(alertElement.classList.contains('thy-alert-bordered')).toBe(true);
        });

        it('should still work with thyTheme naked', () => {
            fixture.componentInstance.theme = 'naked';
            fixture.detectChanges();
            expect(alertElement.classList.contains('thy-alert-naked')).toBe(true);
            expect(alertContentElement.querySelector('.thy-alert-tips')).toBeTruthy();
        });
    });
});

@Component({
    selector: 'thy-demo-alert',
    template: `
        <thy-alert thyColor="info" [thyCloseable]="close" [thyMessage]="message" [thyIcon]="icon">
            <ng-template #operation>
                <a href="javascript:;" thyAlertActionItem>恢复</a>
                <a href="javascript:;" thyAlertActionItem class="link-danger">彻底删除</a>
            </ng-template>
        </thy-alert>
        <ng-template #messageTemplateRef>
            <div class="message">hello world</div>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert, ThyAlertActionItemDirective]
})
class ThyDemoAlertComponent {
    message: string | TemplateRef<HTMLElement> = `this is a message`;
    icon: string | boolean = true;
    close = false;
    @ViewChild('messageTemplateRef', { static: true }) messageRef: TemplateRef<HTMLElement>;
}

@Component({
    selector: 'thy-demo-alert-color',
    template: `<thy-alert [thyColor]="color" thyMessage="message"></thy-alert>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert]
})
class ThyDemoAlertColorComponent {
    color: string | undefined;
    type: string | undefined;
}

@Component({
    selector: 'thy-demo-alert-appearance',
    template: `<thy-alert [thyAppearance]="appearance" thyColor="info" thyMessage="message"></thy-alert>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert]
})
class ThyDemoAlertAppearanceComponent {
    appearance: string | undefined;
    theme: string | undefined;
}

@Component({
    selector: 'thy-demo-alert-deprecated',
    template: `<thy-alert [thyType]="type" [thyTheme]="theme" thyMessage="message"></thy-alert>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAlert]
})
class ThyDemoAlertDeprecatedComponent {
    type = 'info';
    theme = 'fill';
}

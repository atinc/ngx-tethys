import { Component, OnInit, TemplateRef, ViewChild, inject as coreInject } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { ThyNotifyModule, ThyNotifyService } from 'ngx-tethys/notify';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ThyNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG } from 'ngx-tethys/notify';
import { OverlayContainer } from '@angular/cdk/overlay';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ngx-tethys/testing';
import { ThyNotifyContentExampleComponent } from '../examples/custom-content/content.component';
import { provideHttpClient } from '@angular/common/http';

const DEFAULT_DURATION_TIME = 4500;

@Component({
    template: `
        <button class="open-btn" (click)="openComponentNotify(option)">Open</button>
        <button class="success-btn" (click)="openComponentSuccessNotify('success')">success</button>
        <button class="info-btn" (click)="openComponentSuccessNotify('info')">info</button>
        <button class="warning-btn" (click)="openComponentSuccessNotify('warning')">warning</button>
        <button class="error-btn" (click)="openComponentSuccessNotify('error')">error</button>
        <button class="close-btn" (click)="closeNotify()">Open</button>

        <ng-template #content>
            <div class="custom-content-template">Custom Content....</div>
        </ng-template>
    `,
    imports: [ThyNotifyModule]
})
export class ThyNotifyBasicComponent implements OnInit {
    private notifyService = coreInject(ThyNotifyService);

    @ViewChild('content') contentTemplate: TemplateRef<any>;

    option: ThyNotifyConfig;

    ngOnInit() {}

    openComponentNotify(options: ThyNotifyConfig) {
        this.notifyService.show(options);
    }

    openComponentSuccessNotify(type: string) {
        this.notifyService[type](`type is ${type}`, 'some content', { detail: 'this is detail' });
    }

    closeNotify() {
        this.notifyService.remove('close');
    }
}

describe('ThyNotify', () => {
    let overlayContainer: OverlayContainer | undefined = undefined;
    let overlayContainerElement: HTMLElement | undefined = undefined;
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyNotifyModule],
            providers: [provideHttpClient(), provideNoopAnimations()]
        });
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
        TestBed.compileComponents();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<ThyNotifyBasicComponent> | undefined = undefined;
        let componentInstance: ThyNotifyBasicComponent | undefined = undefined;
        let btnElement: HTMLElement | undefined = undefined;
        let notifyContainer: NodeListOf<Element> | undefined = undefined,
            notifyTopLeftContainer: NodeListOf<Element> | undefined = undefined;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ThyNotifyBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            btnElement = fixture.nativeElement.querySelector('.open-btn');
        }));

        it('should has thy-notify-container and default is topRight', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys notify'
            };
            fixture.detectChanges();
            flush();
            btnElement.click();
            fixture.detectChanges();
            tick();

            notifyContainer = overlayContainerElement.querySelectorAll('.thy-notify-topRight');
            expect(fetchNotifyNum(notifyContainer) === 1).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            btnElement.click();
            fixture.detectChanges();
            expect(fetchNotifyNum(notifyContainer) === 2).toBeTruthy();
            expect(notifyContainer.length === 1).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should has thy-notify-topLeft when set placement is topLeft', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys notify',
                placement: 'topLeft'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();

            notifyTopLeftContainer = overlayContainerElement.querySelectorAll('.thy-notify-topLeft');
            expect(fetchNotifyNum(notifyTopLeftContainer) === 1).toBeTruthy();
            expect(notifyTopLeftContainer.length === 1).toBeTruthy();
            btnElement.click();
            fixture.detectChanges();
            expect(fetchNotifyNum(notifyTopLeftContainer) === 2).toBeTruthy();
            expect(notifyTopLeftContainer.length === 1).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should custom content is string worked correctly', fakeAsync(() => {
            const content = 'string content';
            componentInstance.option = {
                title: 'ngx tethys notify',
                placement: 'topLeft',
                content
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const contentElement = overlayContainerElement.querySelector('.thy-notify .thy-notify-content');
            expect(contentElement.innerHTML).toContain(content);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should custom content is templateRef worked correctly', fakeAsync(() => {
            const content = componentInstance.contentTemplate;
            componentInstance.option = {
                title: 'ngx tethys notify',
                placement: 'topLeft',
                content
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const contentElement = overlayContainerElement.querySelector('.thy-notify .thy-notify-content');
            expect(contentElement.querySelector('.custom-content-template')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should custom content is component worked correctly', fakeAsync(() => {
            const content = ThyNotifyContentExampleComponent;
            componentInstance.option = {
                title: 'ngx tethys notify',
                placement: 'topLeft',
                content,
                contentInitialState: {
                    title: 'custom...'
                }
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const contentElement = overlayContainerElement.querySelector('.thy-notify .thy-notify-content');
            expect(contentElement.querySelector('.thy-notify-content-example')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should auto disappear when not set duration', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys notify'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-topRight');
            const notify = notifyContainer.querySelector('.thy-notify') as HTMLElement;
            expect(notify.style.opacity === '1').toBe(true);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
            expect(notify.style.opacity).toBe('');
        }));

        it('should not auto disappear when duration is 0', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys notify',
                duration: 0
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-topRight');
            const notify = notifyContainer.querySelector('.thy-notify') as HTMLElement;
            expect(notify.style.opacity === '1').toBe(true);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
            expect(notify.style.opacity === '0').toBe(false);
            const closeBtn = notifyContainer.querySelector('.thy-notify-close');
            dispatchFakeEvent(closeBtn, 'click');
            fixture.detectChanges();
            flush();
        }));

        it('When detail is an object, it should be a clickable link', fakeAsync(() => {
            const actionSpy = jasmine.createSpy('inside event');
            const detail = {
                link: 'Preview',
                content: 'Preview Content'
            };
            componentInstance.option = {
                type: 'info',
                title: 'ngx tethys notify',
                content: 'ngx tethys notify content',
                detail: {
                    ...detail,
                    action: () => {
                        actionSpy();
                    }
                }
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer = overlayContainerElement.querySelector(`.thy-notify-topRight`);
            const linkContainer: HTMLElement = notifyContainer.querySelector(`.link-secondary`);
            expect(linkContainer.textContent).toBe(detail.link);
            linkContainer.click();
            fixture.detectChanges();
            expect(actionSpy).toHaveBeenCalled();
            const detailContentContainer = notifyContainer.querySelector(`.thy-notify-detail`);
            expect(detailContentContainer.textContent).toBe(detail.content);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('When detail is string, detail text should be displayed', fakeAsync(() => {
            const detailText = 'ngx tethys notify detail content';
            componentInstance.option = {
                type: 'warning',
                title: 'Warning',
                content: 'Something is wrong',
                detail: detailText
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer = overlayContainerElement.querySelector(`.thy-notify-topRight`);
            const linkContainer: HTMLElement = notifyContainer.querySelector(`.link-secondary`);
            expect(linkContainer.textContent).toEqual('[详情]');
            linkContainer.click();
            fixture.detectChanges();
            const detailContentContainer = notifyContainer.querySelector(`.thy-notify-detail`);
            expect(detailContentContainer.textContent).toBe(detailText);
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show error type when config.type is error', fakeAsync(() => {
            componentInstance.option = {
                type: 'error',
                title: 'Error'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-notify-topRight`);
            const notify = notifyContainer.querySelector('.thy-notify');
            expect(notify.classList.contains('thy-notify-error')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show success type when invoke success method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.success-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-notify-topRight`);
            const notify = notifyContainer.querySelector('.thy-notify');
            expect(notify.classList.contains('thy-notify-success')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show info type when invoke info method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.info-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-notify-topRight`);
            const notify = notifyContainer.querySelector('.thy-notify');
            expect(notify.classList.contains('thy-notify-info')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show warning type when invoke warning method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.warning-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-notify-topRight`);
            const notify = notifyContainer.querySelector('.thy-notify');
            expect(notify.classList.contains('thy-notify-warning')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should show error type when invoke error method', fakeAsync(() => {
            const typeElement = fixture.nativeElement.querySelector('.error-btn');
            typeElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer: HTMLElement = overlayContainerElement.querySelector(`.thy-notify-topRight`);
            const notify = notifyContainer.querySelector('.thy-notify');
            expect(notify.classList.contains('thy-notify-error')).toBeTruthy();
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            flush();
        }));

        it('should remove notify when click close btn', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys notify'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-topRight');
            const closeBtn = notifyContainer.querySelector('.thy-notify-close');
            dispatchFakeEvent(closeBtn, 'click');
            tick();
            fixture.detectChanges();
            flush();
            const notify: HTMLElement = notifyContainer.querySelector('.thy-notify');
            expect(notify).toBeFalsy();
            fixture.detectChanges();
            flush();
        }));

        it('should close notify when invoke close method', fakeAsync(() => {
            componentInstance.option = {
                id: 'close',
                title: 'Close Notify'
            };
            fixture.detectChanges();
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-topRight');
            const notify = notifyContainer.querySelector('.thy-notify') as HTMLElement;
            expect(notify.style.opacity).toBe('1');
            const closeBtn = fixture.nativeElement.querySelector('.close-btn');
            closeBtn.click();
            fixture.detectChanges();
            flush();
            expect(notifyContainer.querySelector('.thy-notify')).toBeNull();
        }));

        it('should not remove when trigger mouseenter', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys notify',
                pauseOnHover: true
            };
            fixture.detectChanges();
            // mouseenter
            btnElement.click();
            fixture.detectChanges();
            tick();
            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-topRight');

            const notify = notifyContainer.querySelector('.thy-notify') as HTMLElement;
            expect(notify.style.opacity).toBe('1');
            dispatchMouseEvent(notify, 'mouseenter');
            tick(DEFAULT_DURATION_TIME);
            fixture.detectChanges();
            expect(notify.style.opacity === '0').toBeFalsy();
            flush();
        }));
    });
});

describe('ThyNotify with provider', () => {
    let overlayContainer: OverlayContainer | undefined = undefined;
    let overlayContainerElement: HTMLElement | undefined = undefined;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: THY_NOTIFY_DEFAULT_CONFIG,
                    useValue: {
                        placement: 'bottomLeft',
                        duration: DEFAULT_DURATION_TIME
                    }
                },
                provideNoopAnimations(),
                provideHttpClient()
            ]
        });
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
        TestBed.compileComponents();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<ThyNotifyBasicComponent> | undefined = undefined;
        let componentInstance: ThyNotifyBasicComponent | undefined = undefined;
        let btnElement: HTMLElement | undefined = undefined;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ThyNotifyBasicComponent);
            componentInstance = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            btnElement = fixture.nativeElement.querySelector('.open-btn');
        }));

        it('should has thy-notify-bottomLeft', fakeAsync(() => {
            componentInstance.option = {
                title: 'ngx tethys notify'
            };
            btnElement.click();
            fixture.detectChanges();
            flush();

            const notifyContainer = overlayContainerElement.querySelector('.thy-notify-bottomLeft');
            const notify = notifyContainer.querySelector('.thy-notify') as HTMLElement;
            expect(notify.style.opacity === '1').toBe(true);
            tick(DEFAULT_DURATION_TIME + 100);
            expect(notify.style.opacity === '0').toBe(true);
            flush();
        }));
    });
});

function fetchNotifyNum(container: NodeListOf<Element>) {
    const notifies = container[0].querySelectorAll(`thy-notify`);
    return notifies.length;
}

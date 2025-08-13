import { CommonModule } from '@angular/common';
import { ThyFullscreen, ThyFullscreenModule } from 'ngx-tethys/fullscreen';
import { fakeAsync, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, ApplicationRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ESCAPE, SHIFT, SPACE } from 'ngx-tethys/util';
import { ThyFullscreenComponent, ThyFullscreenLaunchDirective } from 'ngx-tethys/fullscreen';

export class FakeFullscreenService extends ThyFullscreen {
    launchImmersiveFullscreen() {
        dispatchFakeEvent(this.document, 'fullscreenchange');
    }

    exitImmersiveFullscreen() {
        dispatchFakeEvent(this.document, 'fullscreenchange');
    }
}

describe('ThyFullscreen', () => {
    let fixture: ComponentFixture<ThyDemoFullscreenComponent> | undefined = undefined;
    let testComponent: ThyDemoFullscreenComponent | undefined = undefined;
    let fullscreenComponent: DebugElement | undefined = undefined;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFullscreenModule],
            providers: [
                {
                    provider: ThyFullscreen,
                    useValue: FakeFullscreenService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoFullscreenComponent);
        testComponent = fixture.debugElement.componentInstance;
        fullscreenComponent = fixture.debugElement.query(By.directive(ThyFullscreenComponent));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fullscreenComponent).toBeTruthy();
        const fullscreenElement: HTMLElement = fullscreenComponent.nativeElement;
        expect(fullscreenElement.tagName).toBe('THY-FULLSCREEN');
    });

    it('should not have thy-fullscreen class at original state', () => {
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active'))).toBeNull();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen'))).toBeNull();
    });

    it('should call fullscreen change when click fullscreen button', () => {
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(1);
        // 第二次点击关闭
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeNull();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.test-fullscreen'))).toBeNull();
    });

    it('should call fullscreen change when keydown at emulated mode', () => {
        testComponent.mode = 'emulated';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeTruthy();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.test-fullscreen'))).toBeTruthy();
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        // ESC退出
        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeNull();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.test-fullscreen'))).toBeNull();
    });

    it('should not run change detection when the fullscreen is launched in an emulated mode and `keydown` events are dispatched', () => {
        testComponent.mode = 'emulated';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        dispatchFakeEvent(buttonEle, 'click');
        fixture.detectChanges();
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');
        dispatchKeyboardEvent(document, 'keydown', SHIFT);
        dispatchKeyboardEvent(document, 'keydown', SPACE);
        expect(appRef.tick).not.toHaveBeenCalled();
        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        expect(appRef.tick).toHaveBeenCalled();
    });

    it('should run change detection when the fullscreen is launched in an immersive mode and `change` events are dispatched', () => {
        testComponent.mode = 'immersive';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        dispatchFakeEvent(buttonEle, 'click');
        fixture.detectChanges();
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');
        dispatchKeyboardEvent(document, 'fullscreenchange');
        expect(appRef.tick).toHaveBeenCalled();
    });
});

@Component({
    selector: 'thy-demo-fullscreen',
    template: `
        <thy-fullscreen [thyMode]="mode" [thyFullscreenClasses]="classes" (thyFullscreenChange)="changeFullscreen($event)">
            <div fullscreen-target [style.backgroundColor]="'#fff'">
                <button fullscreen-launch class="fullscreen-button">全屏</button>
            </div>
        </thy-fullscreen>
    `,
    imports: [ThyFullscreenComponent, ThyFullscreenLaunchDirective]
})
class ThyDemoFullscreenComponent {
    mode = 'immersive';
    classes = 'test-fullscreen';
    constructor() {}
    changeFullscreen(event: boolean) {}
}

describe('Container ThyFullscreen', () => {
    let fixture: ComponentFixture<ThyContainerFullscreenTestComponent> | undefined = undefined;
    let testComponent: ThyContainerFullscreenTestComponent | undefined = undefined;
    let fullscreenComponent: DebugElement | undefined = undefined;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFullscreenModule],
            providers: [
                {
                    provider: ThyFullscreen,
                    useValue: FakeFullscreenService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyContainerFullscreenTestComponent);
        testComponent = fixture.debugElement.componentInstance;
        fullscreenComponent = fixture.debugElement.query(By.directive(ThyFullscreenComponent));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fullscreenComponent).toBeTruthy();
        const fullscreenElement: HTMLElement = fullscreenComponent.nativeElement;
        expect(fullscreenElement.tagName).toBe('THY-FULLSCREEN');
    });

    it('should not have thy-fullscreen class at original state', () => {
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active'))).toBeNull();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen'))).toBeNull();
    });

    it('should call container fullscreen change when click fullscreen button', fakeAsync(() => {
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-container-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(1);
        fixture.detectChanges();
        // 第二次点击关闭
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(2);
    }));

    it('should call container fullscreen change when keydown at emulated mode', () => {
        testComponent.mode = 'emulated';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-container-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        const fullscreenElement: HTMLElement = fullscreenComponent.nativeElement;
        const eleHeight = fullscreenElement.getBoundingClientRect().height;
        expect(eleHeight.toFixed(0)).toBe('300');
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.container-fullscreen'))).toBeTruthy();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.container-fullscreen'))).toBeNull();
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.container-fullscreen'))).toBeNull();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.container-fullscreen'))).toBeNull();
    });
});

describe('`thy-fulscreen` with dynamic launch button', () => {
    let fixture: ComponentFixture<ThyContainerFullscreenDynamicLaunchComponent> | undefined = undefined;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFullscreenModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyContainerFullscreenDynamicLaunchComponent);
        fixture.detectChanges();
    });

    it('should listen to launch button clicks even if it is dynamic', () => {
        expect(fixture.debugElement.query(By.css('.fullscreen-button'))).toBe(null);

        fixture.componentInstance.fullscreenLaunchShown = true;
        fixture.detectChanges();

        const fullscreenLaunchButton = fixture.debugElement.query(By.css('.fullscreen-button'));
        expect(fullscreenLaunchButton).toBeDefined();
        expect(fullscreenLaunchButton.nativeElement.eventListeners().length).toBe(1);
    });
});

@Component({
    selector: 'thy-container-fullscreen',
    template: `
        <thy-fullscreen
            id="testContainer"
            [thyMode]="mode"
            [thyFullscreenClasses]="classes"
            (thyFullscreenChange)="changeFullscreen($event)">
            <div fullscreen-container [style.height.px]="300">
                <div fullscreen-target [style.backgroundColor]="'#fff'">
                    <button fullscreen-launch class="fullscreen-container-button">全屏</button>
                </div>
            </div>
        </thy-fullscreen>
    `,
    imports: [ThyFullscreenModule]
})
class ThyContainerFullscreenTestComponent {
    mode = 'immersive';
    classes = 'container-fullscreen';
    constructor() {}
    changeFullscreen(event: boolean) {}
}

@Component({
    template: `
        <thy-fullscreen>
            <div fullscreen-target [style.backgroundColor]="'#fff'">
                @if (fullscreenLaunchShown) {
                    <button thyFullscreenLaunch class="fullscreen-button">全屏</button>
                }
            </div>
        </thy-fullscreen>
    `,
    imports: [CommonModule, ThyFullscreenModule]
})
class ThyContainerFullscreenDynamicLaunchComponent {
    fullscreenLaunchShown = false;
}

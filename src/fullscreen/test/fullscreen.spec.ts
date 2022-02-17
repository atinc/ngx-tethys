import { ThyFullscreen } from './../fullscreen.service';
import { fakeAsync, ComponentFixture, TestBed, tick, flush } from '@angular/core/testing';
import { ThyFullscreenModule } from '../fullscreen.module';
import { NgModule, Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyFullscreenComponent } from '../fullscreen.component';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ESCAPE } from '../../util/keycodes';

export class FakeFullscreenService extends ThyFullscreen {
    launchImmersiveFullscreen() {
        dispatchFakeEvent(this.document, 'fullscreenchange');
    }

    exitImmersiveFullscreen() {
        dispatchFakeEvent(this.document, 'fullscreenchange');
    }
}

describe('ThyFullscreen', () => {
    let fixture: ComponentFixture<ThyDemoFullscreenComponent>;
    let testComponent: ThyDemoFullscreenComponent;
    let fullscreenComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFullscreenModule, FullscreenTestModule],
            providers: [
                {
                    provider: ThyFullscreen,
                    useValue: FakeFullscreenService
                }
            ]
        });

        TestBed.compileComponents();
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

    it('should call fullscreen change when click fullscreen button', fakeAsync(() => {
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
    }));

    it('should call fullscreen change when keydown at emulated mode', fakeAsync(() => {
        testComponent.mode = 'emulated';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeTruthy();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.test-fullscreen'))).toBeTruthy();
        tick(100);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        // ESC退出
        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeNull();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.test-fullscreen'))).toBeNull();
    }));
});

@Component({
    selector: 'thy-demo-fullscreen',
    template: `
        <thy-fullscreen [thyMode]="mode" [thyFullscreenClasses]="classes" (thyFullscreenChange)="changeFullscreen($event)">
            <div fullscreen-target [style.backgroundColor]="'#fff'">
                <button fullscreen-launch class="fullscreen-button">
                    全屏
                </button>
            </div>
        </thy-fullscreen>
    `
})
class ThyDemoFullscreenComponent {
    mode = 'immersive';
    classes = 'test-fullscreen';
    constructor() {}
    changeFullscreen(event: boolean) {}
}

@NgModule({
    imports: [ThyFullscreenModule],
    declarations: [ThyDemoFullscreenComponent],
    exports: [ThyDemoFullscreenComponent]
})
export class FullscreenTestModule {}

describe('Container ThyFullscreen', () => {
    let fixture: ComponentFixture<ThyContainerFullscreenComponent>;
    let testComponent: ThyContainerFullscreenComponent;
    let fullscreenComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFullscreenModule],
            declarations: [ThyContainerFullscreenComponent],
            providers: [
                {
                    provider: ThyFullscreen,
                    useValue: FakeFullscreenService
                }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyContainerFullscreenComponent);
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
        // 第二次点击关闭
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(2);
    }));

    it('should call container fullscreen change when keydown at emulated mode', fakeAsync(() => {
        testComponent.mode = 'emulated';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-container-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        tick(100);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        const fullscreenElement: HTMLElement = fullscreenComponent.nativeElement;
        const eleHeight = fullscreenElement.getBoundingClientRect().height;
        expect(eleHeight.toFixed(0)).toBe('300');
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.container-fullscreen'))).toBeTruthy();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.container-fullscreen'))).toBeNull();
        // ESC退出
        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.container-fullscreen'))).toBeNull();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen.container-fullscreen'))).toBeNull();
    }));
});

@Component({
    selector: 'thy-container-fullscreen',
    template: `
        <thy-fullscreen
            id="testContainer"
            [thyMode]="mode"
            [thyFullscreenClasses]="classes"
            (thyFullscreenChange)="changeFullscreen($event)"
        >
            <div fullscreen-container [style.height.px]="300">
                <div fullscreen-target [style.backgroundColor]="'#fff'">
                    <button fullscreen-launch class="fullscreen-container-button">
                        全屏
                    </button>
                </div>
            </div>
        </thy-fullscreen>
    `
})
class ThyContainerFullscreenComponent {
    mode = 'immersive';
    classes = 'container-fullscreen';
    constructor() {}
    changeFullscreen(event: boolean) {}
}

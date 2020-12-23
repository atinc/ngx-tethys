import { ThyFullscreenService } from './../fullscreen.service';
import { fakeAsync, ComponentFixture, TestBed, tick, flush } from '@angular/core/testing';
import { ThyFullscreenModule } from '../fullscreen.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyFullscreenComponent } from '../fullscreen.component';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ESCAPE } from '../../util/keycodes';

export class FakeFullscreenService extends ThyFullscreenService {
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
    let fullscreenComponent;
    let fullscreenService: ThyFullscreenService;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFullscreenModule, FullscreenTestModule],
            providers: [
                {
                    provide: ThyFullscreenService,
                    useClass: FakeFullscreenService
                }
            ]
        });
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoFullscreenComponent);
        testComponent = fixture.debugElement.componentInstance;
        fullscreenComponent = fixture.debugElement.query(By.directive(ThyFullscreenComponent));
        fullscreenService = TestBed.inject(ThyFullscreenService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fullscreenComponent).toBeTruthy();
    });

    it('should not have thy-fullscreen class at original state', () => {
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active'))).toBeNull();
    });

    it('should call fullscreen change when click fullscreen button', fakeAsync(() => {
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(1);
        // 第二次点击关闭
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(2);
    }));

    it('should call fullscreen change when keydown at normal mode', fakeAsync(() => {
        testComponent.mode = 'normal';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeTruthy();
        // ESC退出
        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeNull();
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

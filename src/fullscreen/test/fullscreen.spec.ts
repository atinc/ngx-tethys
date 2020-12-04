import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ThyFullscreenModule } from '../fullscreen.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyFullscreenComponent } from '../fullscreen.component';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ngx-tethys/testing';
import { ESCAPE } from '../../util/keycodes';

describe('ThyFullscreen', () => {
    let fixture: ComponentFixture<ThyDemoFullscreenComponent>;
    let testComponent: ThyDemoFullscreenComponent;
    let fullscreenComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyFullscreenModule, FullscreenTestModule]
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
    });

    it('should not have thy-fullscreen class at original state', () => {
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active'))).toBeNull();
    });

    it('should call fullscreen change when click fullscreen button', fakeAsync(() => {
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalled();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeTruthy();

        // 第二次点击关闭
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalled();
        expect(fullscreenComponent.query(By.css('.thy-fullscreen-active.test-fullscreen'))).toBeNull();
    }));

    it('should call fullscreen change when keydown at normal mode', fakeAsync(() => {
        testComponent.mode = 'normal';
        fixture.detectChanges();
        const buttonEle = fixture.debugElement.query(By.css('.fullscreen-button')).nativeElement;
        const spy = spyOn(fixture.componentInstance, 'changeFullscreen');
        // 第一次点击打开
        dispatchFakeEvent(buttonEle, 'click');
        expect(spy).toHaveBeenCalled();

        // ESC关闭
        dispatchKeyboardEvent(document, 'keydown', ESCAPE);
        expect(spy).toHaveBeenCalled();
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

import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyEmpty, ThyEmptyImageFetchPriority, ThyEmptyImageLoading } from 'ngx-tethys/empty';
import { ThyEmptyConfig, ThyEmptyModule } from 'ngx-tethys/empty';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
    selector: 'thy-demo-empty',
    template: `
        <div class="empty-container">
            <thy-empty
                [thyMessage]="thyMessage"
                [thyTranslationKey]="thyTranslationKey"
                [thyTranslationValues]="thyTranslationValues"
                [thyEntityName]="thyEntityName"
                [thyEntityNameTranslateKey]="thyEntityNameTranslateKey"
                [thyIconName]="thyIconName"
                [thySize]="thySize"
                [thyMarginTop]="thyMarginTop"
                [thyTopAuto]="thyTopAuto"
                [thyContainer]="thyContainer"
                [thyImageUrl]="thyImageUrl"
                [thyImageLoading]="thyImageLoading"
                [thyImageFetchPriority]="thyImageFetchPriority"
                class="empty-test-example">
                <ng-template #extra>
                    <div class="sub-message">确实还没有数据啦啦啦啦</div>
                    <button thyButton="primary-square" (click)="goHome()" class="empty-button">返回主页</button>
                </ng-template>
            </thy-empty>
        </div>
    `,
    styles: [
        `
            .empty-container {
                width: 500px;
                height: 20px;
            }
            .sub-message {
                text-align: center;
                font-size: 14px;
                color: #888;
                margin-top: 14px;
            }
            .empty-button {
                margin-top: 18px;
            }
        `
    ],
    imports: [ThyEmptyModule]
})
class EmptyTestComponent {
    @ViewChild('ThyEmptyComponent', { static: true }) thyEmptyComponent: ThyEmpty;
    thyMessage = '暂无数据';
    thyTranslationKey = '暂无活动';
    thyTranslationValues: any;
    thyEntityName = '任务';
    thyEntityNameTranslateKey = '工作项';
    thyIconName = 'copy';
    thySize: string = 'lg';
    thyMarginTop: number = 200;
    thyTopAuto: boolean = true;
    thyContainer: ElementRef;
    thyImageUrl: string;
    thyImageLoading?: ThyEmptyImageLoading;
    thyImageFetchPriority?: ThyEmptyImageFetchPriority;
}

describe('EmptyComponent', () => {
    let componentInstance: EmptyTestComponent;
    let fixture: ComponentFixture<EmptyTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [ThyEmptyConfig, provideHttpClient(), provideAnimations()]
        }).compileComponents();
        fixture = TestBed.createComponent(EmptyTestComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create thy-empty', () => {
        expect(componentInstance).toBeTruthy();
        const empty: DebugElement = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty).toBeTruthy();
        expect(empty.nativeElement).toBeTruthy();
    });

    it('should support translationKey', () => {
        componentInstance.thyMessage = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('暂无活动');
    });

    it('should support entity name', () => {
        componentInstance.thyMessage = '';
        componentInstance.thyTranslationKey = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('common.tips.NO_RESULT_TARGET');
    });

    it('should support entity name translateKey', () => {
        componentInstance.thyMessage = '';
        componentInstance.thyTranslationKey = '';
        componentInstance.thyEntityName = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('common.tips.NO_RESULT_TARGET');
    });

    it('should support default text', () => {
        componentInstance.thyMessage = '';
        componentInstance.thyTranslationKey = '';
        componentInstance.thyEntityName = '';
        componentInstance.thyEntityNameTranslateKey = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('暂无数据');
    });

    it('should set message text', () => {
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        empty.componentInstance.setMessage('custom message');
        fixture.detectChanges();
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('custom message');
    });

    it('should contain outer class', () => {
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.classList).toContain('empty-test-example');
    });

    it('should create a lg empty', () => {
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.classList).toContain('thy-empty-state--lg');
    });

    it('should create a sm empty', () => {
        componentInstance.thySize = 'sm';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.classList).toContain('thy-empty-state--sm');
    });

    it('should create a md empty', () => {
        componentInstance.thySize = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.classList).toContain('thy-empty-state');
        expect(empty.nativeElement.classList).not.toContain('thy-empty-state--sm');
        expect(empty.nativeElement.classList).not.toContain('thy-empty-state--lg');
    });

    it('should create correct size empty', () => {
        componentInstance.thySize = 'lg';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmpty));
        expect(empty.nativeElement.classList).toContain('thy-empty-state--lg');
        componentInstance.thySize = 'sm';
        fixture.detectChanges();
        expect(empty.nativeElement.classList).toContain('thy-empty-state--sm');
        expect(empty.nativeElement.classList).not.toContain('thy-empty-state--lg');
    });

    it('should set `loading` and `fetchpriority` attributes on the `<img>`', () => {
        fixture.componentInstance.thyImageUrl = '/image.jpg';
        fixture.detectChanges();
        const image = fixture.debugElement.query(By.css('img.empty-img'));
        expect(image).toBeDefined();
        expect(image.nativeElement.hasAttribute('loading')).toEqual(false);
        expect(image.nativeElement.hasAttribute('fetchpriority')).toEqual(false);
        fixture.componentInstance.thyImageLoading = 'lazy';
        fixture.componentInstance.thyImageFetchPriority = 'low';
        fixture.detectChanges();
        expect(image.nativeElement.getAttribute('loading')).toEqual('lazy');
        expect(image.nativeElement.getAttribute('fetchpriority')).toEqual('low');
    });
});

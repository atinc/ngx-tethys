import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ThyEmptyComponent, ThyEmptyImageFetchPriority, ThyEmptyImageLoading } from '../empty.component';
import { ThyEmptyConfig } from '../empty.config';
import { ThyEmptyModule } from '../empty.module';

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
    ]
})
class EmptyTestComponent {
    @ViewChild('ThyEmptyComponent', { static: true }) thyEmptyComponent: ThyEmptyComponent;
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
            imports: [BrowserAnimationsModule, ThyEmptyModule],
            declarations: [EmptyTestComponent],
            providers: [ThyEmptyConfig]
        }).compileComponents();
        fixture = TestBed.createComponent(EmptyTestComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create thy-empty', () => {
        expect(componentInstance).toBeTruthy();
        const empty: DebugElement = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty).toBeTruthy();
        expect(empty.nativeElement).toBeTruthy();
    });

    it('should should translationKey', () => {
        componentInstance.thyMessage = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('暂无活动');
    });

    it('should should entity name', () => {
        componentInstance.thyMessage = '';
        componentInstance.thyTranslationKey = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('common.tips.NO_RESULT_TARGET');
    });

    it('should should entity name translateKey', () => {
        componentInstance.thyMessage = '';
        componentInstance.thyTranslationKey = '';
        componentInstance.thyEntityName = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('common.tips.NO_RESULT_TARGET');
    });

    it('should should no result translateKey', () => {
        componentInstance.thyMessage = '';
        componentInstance.thyTranslationKey = '';
        componentInstance.thyEntityName = '';
        componentInstance.thyEntityNameTranslateKey = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.querySelector('.thy-empty-text').textContent).toContain('common.tips.NO_RESULT');
    });

    it('should should contain outer class', () => {
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.classList).toContain('empty-test-example');
    });

    it('should should create a lg empty', () => {
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.classList).toContain('thy-empty-state--lg');
    });

    it('should should create a sm empty', () => {
        componentInstance.thySize = 'sm';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.classList).toContain('thy-empty-state--sm');
    });

    it('should should create a md empty', () => {
        componentInstance.thySize = '';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
        expect(empty.nativeElement.classList).toContain('thy-empty-state');
        expect(empty.nativeElement.classList).not.toContain('thy-empty-state--sm');
        expect(empty.nativeElement.classList).not.toContain('thy-empty-state--lg');
    });

    it('should should create correct size empty', () => {
        componentInstance.thySize = 'lg';
        fixture.detectChanges();
        const empty = fixture.debugElement.query(By.directive(ThyEmptyComponent));
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

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyResult } from 'ngx-tethys/result';

describe('ThyResult', () => {
    let fixture: ComponentFixture<ThyResultDemoComponent>;
    let testComponent: ThyResultDemoComponent;
    let thyResultComponent: DebugElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyResultDemoComponent);
        testComponent = fixture.debugElement.componentInstance;
        thyResultComponent = fixture.debugElement.query(By.directive(ThyResult));
    });

    it('should create', () => {
        expect(thyResultComponent).toBeTruthy();
    });

    it('should has custom icon ', () => {
        fixture.detectChanges();
        const customIconElement = thyResultComponent.nativeElement.querySelector('.result-icon .custom-icon');
        expect(customIconElement).toBeTruthy();
    });

    it('should has extra content', () => {
        fixture.detectChanges();
        const extraElement = thyResultComponent.nativeElement.querySelector('.thy-result-extra');
        expect(extraElement).toBeTruthy();
    });

    it('should has custom title ', () => {
        fixture.detectChanges();
        const customTitleElement = thyResultComponent.nativeElement.querySelector('.thy-result-title .custom-title');
        expect(customTitleElement).toBeTruthy();
    });

    it('should has custom subtitle ', () => {
        fixture.detectChanges();
        const customSubtitleElement = thyResultComponent.nativeElement.querySelector('.thy-result-subtitle .custom-subtitle');
        expect(customSubtitleElement).toBeTruthy();
    });
});

@Component({
    selector: 'thy-result-demo',
    template: `
        <thy-result>
            <ng-template #thyTitle>
                <div class="custom-title">自定义Title</div>
            </ng-template>
            <ng-template #thySubtitle>
                <div class="custom-subtitle">自定义subtitle</div>
            </ng-template>
            <ng-template #thyExtra>
                <button thyButton="primary-square">关闭</button>
                <button thyButton="outline-primary-square">查看详情</button>
            </ng-template>
            <ng-template #thyIcon>
                <div class="custom-icon"></div>
            </ng-template>
        </thy-result>
    `,
    imports: [ThyResult]
})
class ThyResultDemoComponent {}

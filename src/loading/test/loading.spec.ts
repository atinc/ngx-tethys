import { Component, DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyLoading, ThyLoadingModule } from 'ngx-tethys/loading';

@Component({
    selector: `test-loading`,
    template: `
        @if (loadingDone) {
            <div style="width: 500px; height:500px">Test loading</div>
        }
        <thy-loading [thyDone]="loadingDone" [thyIsMask]="isMask" [thyTips]="tips"></thy-loading>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoadingModule]
})
export class TestLoadingComponent {
    loadingDone!: boolean;
    isMask!: boolean;
    tips!: string;
}

@Component({
    selector: `test-loading-deprecated-tip`,
    template: `<thy-loading [thyDone]="false" [thyTip]="tip"></thy-loading>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoadingModule]
})
export class TestLoadingDeprecatedTipComponent {
    tip = 'custom loading tip';
}

describe('test loading', () => {
    let fixture!: ComponentFixture<TestLoadingComponent>;
    let testComponent!: TestLoadingComponent;
    let loadingComponent!: DebugElement;
    let loadingElement!: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();

        fixture = TestBed.createComponent(TestLoadingComponent);
        testComponent = fixture.debugElement.componentInstance;
        loadingComponent = fixture.debugElement.query(By.directive(ThyLoading));
        loadingElement = loadingComponent.nativeElement;
    });

    it('should create ThyLoadingComponent', () => {
        expect(loadingComponent).toBeTruthy();
    });

    it('thyDone', () => {
        const indicatorElement = loadingElement.querySelector('.thy-loading-indicator');
        const ellipsisElement = loadingElement.querySelector('.thy-loading-ellipsis');
        const spotElement = loadingElement.querySelector('.thy-spot');

        testComponent.loadingDone = false;
        fixture.detectChanges();
        expect(loadingElement.classList).toContain('thy-loading');
        expect(indicatorElement).toBeTruthy;
        expect(ellipsisElement).toBeTruthy;
        expect(spotElement).toBeTruthy;

        testComponent.loadingDone = true;
        fixture.detectChanges();
        expect(indicatorElement).toBeFalsy();
        expect(ellipsisElement).toBeFalsy();
        expect(spotElement).toBeFalsy();
    });

    it('thyIsMask', () => {
        testComponent.isMask = false;
        fixture.detectChanges();
        expect(loadingComponent.nativeElement.querySelector('.thy-loading-mask')).toBeFalsy();
        testComponent.isMask = true;
        testComponent.loadingDone = false;
        fixture.detectChanges();
        expect(loadingComponent.nativeElement.querySelector('.thy-loading-mask')).toBeTruthy();
    });

    it('thyTips', () => {
        fixture.detectChanges();
        expect(loadingElement.textContent).toEqual('');
        testComponent.tips = 'custom loading tip';
        fixture.detectChanges();
        expect(loadingElement.textContent).toEqual('custom loading tip');
    });

    it('should still work with deprecated thyTip', () => {
        const deprecatedFixture = TestBed.createComponent(TestLoadingDeprecatedTipComponent);
        deprecatedFixture.detectChanges();
        const deprecatedLoading = deprecatedFixture.debugElement.query(By.directive(ThyLoading));
        expect(deprecatedLoading.nativeElement.textContent).toEqual('custom loading tip');
    });
});

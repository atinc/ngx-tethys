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
        <thy-loading [thyDone]="loadingDone" [thyIsMask]="isMask" [thyTips]="tips" [thySimple]="simple"></thy-loading>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoadingModule]
})
export class TestLoadingComponent {
    loadingDone!: boolean;
    isMask!: boolean;
    tips!: string;
    simple!: boolean;
}

@Component({
    selector: `test-loading-simple-attribute`,
    template: `<thy-loading thySimple></thy-loading><thy-loading thySimple="true"></thy-loading>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyLoading]
})
export class TestLoadingSimpleAttributeComponent {}

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
        testComponent.loadingDone = false;
        fixture.detectChanges();
        expect(loadingElement.classList).toContain('thy-loading');
        expect(loadingElement.classList).not.toContain('thy-loading-done');
        expect(loadingElement.querySelector('.thy-loading-indicator')?.tagName).toBe('SPAN');
        expect(loadingElement.querySelector('.thy-loading-ellipsis')).toBeTruthy();
        expect(loadingElement.querySelector('.thy-spot')).toBeTruthy();

        testComponent.loadingDone = true;
        fixture.detectChanges();
        expect(loadingElement.classList).toContain('thy-loading-done');
        expect(loadingElement.querySelector('.thy-loading-indicator')).toBeFalsy();
        expect(loadingElement.querySelector('.thy-loading-ellipsis')).toBeFalsy();
        expect(loadingElement.querySelector('.thy-spot')).toBeFalsy();
    });

    it('thyIsMask', () => {
        testComponent.isMask = false;
        testComponent.loadingDone = false;
        fixture.detectChanges();
        expect(loadingElement.classList.contains('thy-loading-mask')).toBe(false);

        testComponent.isMask = true;
        fixture.detectChanges();
        expect(loadingElement.classList.contains('thy-loading-mask')).toBe(true);
        expect(loadingElement.querySelector('.thy-loading-container')).toBeTruthy();

        testComponent.loadingDone = true;
        fixture.detectChanges();
        expect(loadingElement.classList.contains('thy-loading-mask')).toBe(false);
        expect(loadingElement.classList.contains('thy-loading-done')).toBe(true);
    });

    it('thySimple', () => {
        fixture.detectChanges();
        expect(loadingElement.classList).not.toContain('thy-loading-simple');

        testComponent.simple = true;
        fixture.detectChanges();
        expect(loadingElement.classList).toContain('thy-loading-simple');

        testComponent.simple = false;
        fixture.detectChanges();
        expect(loadingElement.classList).not.toContain('thy-loading-simple');
    });

    it('should enable simple mode when thySimple or thySimple="true"', () => {
        const simpleFixture = TestBed.createComponent(TestLoadingSimpleAttributeComponent);
        simpleFixture.detectChanges();
        const loadings = simpleFixture.debugElement.queryAll(By.directive(ThyLoading));
        expect(loadings.length).toBe(2);
        loadings.forEach(loading => expect(loading.nativeElement.classList).toContain('thy-loading-simple'));
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

import { Component, OnInit, NgModule, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyBadgeModule } from '../badge.module';
import { ThyBadgeComponent } from '../badge.component';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-badge-basic',
    template: `
        <thy-badge [thyCount]="count" [thyKeepShow]="isValueKeepShow" [thyType]="type" [thyMaxCount]="maxCount">
            <div>WORKTILE</div>
        </thy-badge>
    `
})
class BadgeBasicComponent implements OnInit {
    isValueKeepShow = false;

    count = 5;

    maxCount = 99;

    type = `danger`;

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-context',
    template: `
        <thy-badge [thyContext]="'new'">
            <div>WORKTILE</div>
        </thy-badge>
    `
})
class BadgeBasicContextComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-size',
    template: `
        <thy-badge [thyCount]="count" [thySize]="size" [thyIsDot]="isDot" [thyIsHollow]="isHollow">
            <div>WORKTILE</div>
        </thy-badge>
    `
})
class BadgeBasicSizeComponent implements OnInit {
    count = '10';

    size = '';

    isDot = false;

    isHollow = false;

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-circle',
    template: `
        <thy-badge thyIsDot="true"></thy-badge>
    `
})
class BadgeBasicCircleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-special',
    template: `
        <span thyBadge [thyCount]="5" thyTextColor="#00ff00" thyBackgroundColor="#ff00ff"></span>
    `
})
class BadgeBasicSpecialComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

describe('thy-badge', () => {
    let testComponent;
    let badgeElement;
    // let badgeSpanElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyBadgeModule],
            declarations: [
                BadgeBasicComponent,
                BadgeBasicContextComponent,
                BadgeBasicSizeComponent,
                BadgeBasicCircleComponent,
                BadgeBasicSpecialComponent
            ]
        });
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let basicFixture: ComponentFixture<BadgeBasicComponent>;
        let badgeBasicDebugComponent;

        beforeEach(() => {
            basicFixture = TestBed.createComponent(BadgeBasicComponent);
            testComponent = basicFixture.debugElement.componentInstance;
            badgeBasicDebugComponent = basicFixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeBasicDebugComponent.nativeElement;
        });

        it('should create', () => {
            expect(basicFixture).toBeTruthy();
            expect(badgeBasicDebugComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('should get correct thy-badge-container class', () => {
            basicFixture.detectChanges();
            expect(badgeElement.classList.contains('thy-badge-container')).toBe(true);
        });

        it('should span get basic correct class', () => {
            basicFixture.detectChanges();
            const badgeSpanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(badgeSpanElement).toBeTruthy();
            expect(badgeSpanElement.classList.contains('thy-badge')).toBe(true);
            expect(badgeSpanElement.classList.contains('thy-badge-count')).toBe(true);
            expect(badgeSpanElement.classList.contains('thy-badge-danger')).toBe(true);
            expect(badgeSpanElement.classList.contains('thy-badge-sup')).toBe(true);
        });

        it('should show max count', () => {
            testComponent.count = 100;
            basicFixture.detectChanges();
            const badgeSpanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(badgeSpanElement.textContent).toBe(`${testComponent.maxCount}+`);
        });

        it('should keep show when value is 0', () => {
            testComponent.isValueKeepShow = true;
            basicFixture.detectChanges();
            const badgeSpanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(badgeSpanElement).toBeTruthy();
        });

        it('should have correct class when type is primary', () => {
            testComponent.type = `primary`;
            basicFixture.detectChanges();
            const badgeSpanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(badgeSpanElement).toBeTruthy();
            expect(badgeSpanElement.classList.contains('thy-badge-primary')).toBe(true);
        });

        it('should have correct class when type is warning', () => {
            testComponent.type = `warning`;
            basicFixture.detectChanges();
            const badgeSpanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(badgeSpanElement).toBeTruthy();
            expect(badgeSpanElement.classList.contains('thy-badge-warning')).toBe(true);
        });

        it('should have correct class when type is secondary', () => {
            testComponent.type = `secondary`;
            basicFixture.detectChanges();
            const badgeSpanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(badgeSpanElement).toBeTruthy();
            expect(badgeSpanElement.classList.contains('thy-badge-secondary')).toBe(true);
        });
    });

    describe('context', () => {
        let basicFixture: ComponentFixture<BadgeBasicContextComponent>;
        let badgeBasicDebugComponent;

        beforeEach(() => {
            basicFixture = TestBed.createComponent(BadgeBasicContextComponent);
            testComponent = basicFixture.debugElement.componentInstance;
            badgeBasicDebugComponent = basicFixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeBasicDebugComponent.nativeElement;
        });

        it('should create', () => {
            expect(basicFixture).toBeTruthy();
            expect(badgeBasicDebugComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('should show new context', () => {
            basicFixture.detectChanges();
            const badgeSpanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(badgeSpanElement.textContent).toBe(`new`);
        });
    });

    describe('size', () => {
        let basicFixture: ComponentFixture<BadgeBasicSizeComponent>;
        let badgeBasicDebugComponent;

        beforeEach(() => {
            basicFixture = TestBed.createComponent(BadgeBasicSizeComponent);
            testComponent = basicFixture.debugElement.componentInstance;
            badgeBasicDebugComponent = basicFixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeBasicDebugComponent.nativeElement;
        });

        it('should create', () => {
            expect(basicFixture).toBeTruthy();
            expect(badgeBasicDebugComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('should have correct class when size is lg', () => {
            testComponent.size = `lg`;
            basicFixture.detectChanges();
            const spanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(spanElement.classList.contains('thy-badge-lg')).toBe(true);
        });

        it('should have correct class when size is sm', () => {
            testComponent.size = `sm`;
            basicFixture.detectChanges();
            const spanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(spanElement.classList.contains('thy-badge-sm')).toBe(true);
        });
    });

    describe('circle', () => {
        let basicFixture: ComponentFixture<BadgeBasicCircleComponent>;
        let badgeBasicDebugComponent;

        beforeEach(() => {
            basicFixture = TestBed.createComponent(BadgeBasicCircleComponent);
            testComponent = basicFixture.debugElement.componentInstance;
            badgeBasicDebugComponent = basicFixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeBasicDebugComponent.nativeElement;
        });

        it('should create', () => {
            expect(basicFixture).toBeTruthy();
            expect(badgeBasicDebugComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('should have thy-badge-dot class', () => {
            basicFixture.detectChanges();
            const spanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(spanElement.classList.contains('thy-badge-dot')).toBe(true);
        });
    });

    describe('special', () => {
        let basicFixture: ComponentFixture<BadgeBasicSpecialComponent>;
        let badgeBasicDebugComponent;

        beforeEach(() => {
            basicFixture = TestBed.createComponent(BadgeBasicSpecialComponent);
            testComponent = basicFixture.debugElement.componentInstance;
            badgeBasicDebugComponent = basicFixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeBasicDebugComponent.nativeElement;
        });

        it('should create', () => {
            expect(basicFixture).toBeTruthy();
            expect(badgeBasicDebugComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('should have color, backgroundColor', () => {
            basicFixture.detectChanges();
            const spanElement = badgeBasicDebugComponent.nativeElement.children[0];
            expect(spanElement.style.color).toBe('rgb(0, 255, 0)');
            expect(spanElement.style.backgroundColor).toBe('rgb(255, 0, 255)');
        });
    });
});

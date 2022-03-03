import { Component, OnInit, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyBadgeModule } from '../badge.module';
import { ThyBadgeComponent } from '../badge.component';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-badge-basic',
    template: `
        <thy-badge [thyCount]="count" [thyKeepShow]="isValueKeepShow" [thyType]="type" [thyMaxCount]="maxCount" [thySize]="size">
            <div>WORKTILE</div>
        </thy-badge>
    `
})
class BadgeBasicComponent implements OnInit {
    isValueKeepShow = false;

    count = 5;

    maxCount: number;

    type: string;

    size: string;

    constructor() {}

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-context',
    template: `
        <thy-badge [thyContext]="context">
            <div>WORKTILE</div>
        </thy-badge>
    `
})
class BadgeBasicContextComponent implements OnInit {
    constructor() {}

    context = 'Worktile';

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-hollow',
    template: `
        <thy-badge [thyIsHollow]="isHollow">
            <div>WORKTILE</div>
        </thy-badge>
    `
})
class BadgeBasicHollowComponent implements OnInit {
    constructor() {}

    isHollow: boolean;

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-dot',
    template: `
        <thy-badge [thyIsDot]="isDot"></thy-badge>
    `
})
class BadgeBasicDotComponent implements OnInit {
    constructor() {}

    isDot: boolean;

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
    let testComponent: any;
    let badgeElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyBadgeModule],
            declarations: [
                BadgeBasicComponent,
                BadgeBasicContextComponent,
                BadgeBasicHollowComponent,
                BadgeBasicDotComponent,
                BadgeBasicSpecialComponent
            ]
        });
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<BadgeBasicComponent>;
        let badgeComponent: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeComponent.nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(badgeComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('should get correct thy-badge-container class', () => {
            fixture.detectChanges();
            expect(badgeElement.classList.contains('thy-badge-container')).toBe(true);
        });

        it('should span get basic correct class', () => {
            fixture.detectChanges();
            const badgeSpanElement = badgeComponent.nativeElement.children[0];
            expect(badgeSpanElement).toBeTruthy();
            expect(badgeSpanElement.classList.contains('thy-badge')).toBe(true);
            expect(badgeSpanElement.classList.contains('thy-badge-count')).toBe(true);
            expect(badgeSpanElement.classList.contains('thy-badge-danger')).toBe(true);
            expect(badgeSpanElement.classList.contains('thy-badge-sup')).toBe(true);
        });

        it('thyCount, should show set count success', () => {
            testComponent.count = 1;
            fixture.detectChanges();
            const badgeSpanElement = badgeComponent.nativeElement.querySelector('.thy-badge');
            expect(badgeSpanElement.textContent).toBe(`1`);
            testComponent.count = 2;
            fixture.detectChanges();
            expect(badgeSpanElement.textContent).toBe(`2`);
        });

        it('thyMaxCount, should set max count success', () => {
            testComponent.count = 100;
            fixture.detectChanges();
            const badgeSpanElement = badgeComponent.nativeElement.querySelector('.thy-badge');
            expect(badgeSpanElement.textContent).toBe(`100`);
            testComponent.maxCount = 99;
            fixture.detectChanges();
            expect(badgeSpanElement.textContent).toBe(`99+`);
        });

        it('thyKeepShow, should keep show badge when count is 0 and thyKeepShow is true', () => {
            testComponent.count = 0;
            testComponent.isValueKeepShow = false;
            fixture.detectChanges();
            expect(badgeComponent.nativeElement.querySelector('.thy-badge')).toBeFalsy();
            testComponent.isValueKeepShow = true;
            fixture.detectChanges();
            expect(badgeComponent.nativeElement.querySelector('.thy-badge')).toBeTruthy();
        });

        it('thyType, should set type success', () => {
            ['primary', 'warning', 'secondary', 'danger'].forEach(type => {
                testComponent.type = type;
                fixture.detectChanges();
                const badgeSpanElement = badgeComponent.nativeElement.querySelector('.thy-badge');
                expect(badgeSpanElement).toBeTruthy();
                expect(badgeSpanElement.classList.contains(`thy-badge-${type}`)).toBe(true);
            });
        });

        it('thySize, should set size success', () => {
            ['sm', 'lg'].forEach(size => {
                testComponent.size = size;
                fixture.detectChanges();
                const badgeSpanElement = badgeComponent.nativeElement.querySelector('.thy-badge');
                expect(badgeSpanElement).toBeTruthy();
                expect(badgeSpanElement.classList.contains(`thy-badge-${size}`)).toBe(true);
            });
        });
    });

    describe('context', () => {
        let fixture: ComponentFixture<BadgeBasicContextComponent>;
        let badgeComponent: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicContextComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeComponent.nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(badgeComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('thyContext, should set context success', () => {
            fixture.detectChanges();
            const badgeSpanElement = badgeElement.querySelector('.thy-badge');
            expect(badgeSpanElement.textContent).toBe(`Worktile`);
            testComponent.context = 'PingCode';
            fixture.detectChanges();
            expect(badgeSpanElement.textContent).toBe(`PingCode`);
        });
    });

    describe('hollow', () => {
        let fixture: ComponentFixture<BadgeBasicHollowComponent>;
        let badgeComponent: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicHollowComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeComponent.nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(badgeComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('thyIsHollow, should set hollow badge success', () => {
            fixture.detectChanges();
            expect(badgeElement.querySelector('.thy-badge-hollow')).toBeFalsy();
            testComponent.isHollow = true;
            fixture.detectChanges();
            expect(badgeElement.querySelector('.thy-badge-hollow')).toBeTruthy();
        });
    });

    describe('dot', () => {
        let fixture: ComponentFixture<BadgeBasicDotComponent>;
        let badgeComponent: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicDotComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeComponent.nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(badgeComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('thyIsDot, should set dot badge success', () => {
            fixture.detectChanges();
            expect(badgeElement.querySelector('.thy-badge-dot')).toBeFalsy;
            testComponent.isDot = true;
            fixture.detectChanges();
            expect(badgeElement.querySelector('.thy-badge-dot')).toBeTruthy;
        });
    });

    describe('special', () => {
        let fixture: ComponentFixture<BadgeBasicSpecialComponent>;
        let badgeComponent: DebugElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicSpecialComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadgeComponent));
            badgeElement = badgeComponent.nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(badgeComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('should set text color, backgroundColor success', () => {
            fixture.detectChanges();
            const badgeSpanElement = badgeComponent.nativeElement.children[0];
            expect(badgeSpanElement.style.color).toBe('rgb(0, 255, 0)');
            expect(badgeSpanElement.style.backgroundColor).toBe('rgb(255, 0, 255)');
        });
    });
});

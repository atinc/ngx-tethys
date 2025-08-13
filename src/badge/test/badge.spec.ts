import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyBadge, ThyBadgeModule } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-basic',
    template: `
        <thy-badge [thyCount]="count" [thyKeepShow]="isValueKeepShow" [thyType]="type" [thyMaxCount]="maxCount" [thySize]="size">
            <div>WORKTILE</div>
        </thy-badge>
    `,
    imports: [ThyBadgeModule]
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
    `,
    imports: [ThyBadgeModule]
})
class BadgeBasicContextComponent implements OnInit {
    constructor() {}

    context = 'Worktile';

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-content',
    template: `
        <thy-badge [thyContent]="content">
            <div>WORKTILE</div>
        </thy-badge>
    `,
    imports: [ThyBadgeModule]
})
class BadgeContentTestComponent implements OnInit {
    constructor() {}

    content = 'Worktile';

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-hollow',
    template: `
        <thy-badge [thyIsHollow]="isHollow">
            <div>WORKTILE</div>
        </thy-badge>
    `,
    imports: [ThyBadgeModule]
})
class BadgeBasicHollowComponent implements OnInit {
    constructor() {}

    isHollow: boolean;

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-dot',
    template: ` <thy-badge [thyIsDot]="isDot"></thy-badge> `,
    imports: [ThyBadgeModule]
})
class BadgeBasicDotComponent implements OnInit {
    constructor() {}

    isDot: boolean;

    ngOnInit(): void {}
}

@Component({
    selector: 'thy-badge-custom-color',
    template: ` <span thyBadge [thyCount]="5" [thyTextColor]="textColor" [thyBackgroundColor]="backgroundColor"></span> `,
    imports: [ThyBadgeModule]
})
class BadgeBasicCustomColorComponent implements OnInit {
    textColor = '#00ff00';

    backgroundColor = '#ff00ff';

    constructor() {}

    ngOnInit(): void {}
}

describe('thy-badge', () => {
    let testComponent: any | undefined = undefined;
    let badgeElement: HTMLElement | undefined = undefined;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<BadgeBasicComponent> | undefined = undefined;
        let badgeComponent: DebugElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadge));
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
            expect(badgeSpanElement.classList.contains('thy-badge-md')).toBe(true);
            expect(badgeSpanElement.classList.contains('thy-badge-danger')).toBe(true);
            expect(badgeElement.classList.contains('thy-badge-wrapper')).toBe(true);
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
            ['primary', 'warning', 'default', 'secondary', 'danger', 'success'].forEach(type => {
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

    describe('content', () => {
        let fixture: ComponentFixture<BadgeContentTestComponent> | undefined = undefined;
        let badgeComponent: DebugElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeContentTestComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadge));
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
            testComponent.content = 'PingCode';
            fixture.detectChanges();
            expect(badgeSpanElement.textContent).toBe(`PingCode`);
        });
    });

    describe('context', () => {
        let fixture: ComponentFixture<BadgeBasicContextComponent> | undefined = undefined;
        let badgeComponent: DebugElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicContextComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadge));
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
        let fixture: ComponentFixture<BadgeBasicHollowComponent> | undefined = undefined;
        let badgeComponent: DebugElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicHollowComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadge));
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
        let fixture: ComponentFixture<BadgeBasicDotComponent> | undefined = undefined;
        let badgeComponent: DebugElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicDotComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadge));
            badgeElement = badgeComponent.nativeElement;
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(badgeComponent).toBeTruthy();
            expect(badgeElement).toBeTruthy();
        });

        it('thyIsDot, should set dot badge success', () => {
            fixture.detectChanges();
            expect(badgeElement.querySelector('.thy-badge-dot')).toBeFalsy();
            testComponent.isDot = true;
            fixture.detectChanges();
            expect(badgeElement.querySelector('.thy-badge-dot')).toBeTruthy();
        });
    });

    describe('custom-color', () => {
        let fixture: ComponentFixture<BadgeBasicCustomColorComponent> | undefined = undefined;
        let badgeComponent: DebugElement | undefined = undefined;

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeBasicCustomColorComponent);
            testComponent = fixture.debugElement.componentInstance;
            badgeComponent = fixture.debugElement.query(By.directive(ThyBadge));
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

        it('should set built-in text color', () => {
            fixture.detectChanges();
            const badgeSpanElement = badgeComponent.nativeElement.children[0];
            ['primary', 'warning', 'default', 'secondary', 'danger', 'success', 'light', 'muted', 'secondary', 'desc'].forEach(color => {
                fixture.componentInstance.textColor = color;
                fixture.detectChanges();
                expect(badgeSpanElement.style.color).toBe('');
                expect(badgeSpanElement.classList.contains(`text-${color}`)).toBeTruthy();
            });
        });

        it('should set built-in background color', () => {
            fixture.detectChanges();
            const badgeSpanElement = badgeComponent.nativeElement.children[0];
            ['primary', 'warning', 'default', 'secondary', 'danger', 'success', 'light'].forEach(color => {
                fixture.componentInstance.backgroundColor = color;
                fixture.detectChanges();
                expect(badgeSpanElement.style.backgroundColor).toBe('');
                expect(badgeSpanElement.classList.contains(`bg-${color}`)).toBeTruthy();
            });
        });
    });
});

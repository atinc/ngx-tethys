import { bypassSanitizeProvider, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyButtonGroup, ThyButtonIcon, ThyButton, ThyButtonModule } from 'ngx-tethys/button';
import { provideHttpClient } from '@angular/common/http';

function assertButtonIcon(iconElement: Element, icon: string) {
    expect(iconElement).toBeTruthy();
    expect(iconElement.tagName).toBe('THY-ICON');
    expect(iconElement.classList.contains('thy-icon')).toBeTruthy();
    expect(iconElement.classList.contains(`thy-icon-${icon}`)).toBeTruthy();
}
@Component({
    selector: 'thy-test-button-basic',
    template: `
        <button [thyButton]="type" [thyLoading]="loading" [thyLoadingText]="loadingText" [thySize]="size">Basic Button</button>
        <thy-button id="btn-with-icon" [thyIcon]="icon" [thyType]="type">Icon Button</thy-button>
        <thy-button id="btn-only-icon" [thyIcon]="icon" [thyType]="type"></thy-button>
    `,
    imports: [ThyButtonModule]
})
class ThyTestButtonBasicComponent {
    type = `primary`;
    size = '';
    loading = false;
    loadingText = 'Loading...';
    icon = 'inbox';
}

describe('ThyButton', () => {
    const sizes = ['lg', 'default', 'md', 'sm', 'xs'];

    describe('Basic', () => {
        let fixture: ComponentFixture<ThyTestButtonBasicComponent>;
        let basicTestComponent: ThyTestButtonBasicComponent;
        let buttonComponent: DebugElement;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [bypassSanitizeProvider, provideHttpClient()]
            });

            TestBed.compileComponents();
            injectDefaultSvgIconSet();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(ThyTestButtonBasicComponent);
            basicTestComponent = fixture.componentInstance;
            fixture.detectChanges();
            buttonComponent = fixture.debugElement.query(By.directive(ThyButton));
        });

        it('should get correct classes', () => {
            const btnElement: HTMLElement = buttonComponent.nativeElement;
            expect(btnElement.classList.contains('btn')).toBeTruthy();
            expect(btnElement.classList.contains('btn-primary')).toBeTruthy();
            expect(btnElement.textContent).toBe('Basic Button');
        });

        it('should set size success', () => {
            sizes.forEach(size => {
                basicTestComponent.size = size;
                fixture.detectChanges();
                const btnElement: HTMLElement = buttonComponent.nativeElement;
                expect(btnElement.classList.contains(`btn-${size}`)).toBeTruthy();
            });
        });

        it('should set type success', () => {
            [
                'primary',
                'info',
                'warning',
                'danger',
                'warning',
                'outline-warning',
                'success',
                'outline-primary',
                'outline-default',
                'outline-info',
                'outline-success',
                'outline-danger',
                'link',
                'link-info',
                'link-warning',
                'link-danger',
                'link-success',
                'link-danger-weak'
            ].forEach(type => {
                basicTestComponent.type = type;
                fixture.detectChanges();
                const btnElement: HTMLElement = buttonComponent.nativeElement;
                expect(btnElement.classList.contains(`btn-${type}`)).toBeTruthy();
            });
        });

        it('should set type with square success', () => {
            ['primary-square', 'info-square', 'warning-square', 'danger-square', 'success-square'].forEach(type => {
                basicTestComponent.type = type;
                fixture.detectChanges();
                const btnElement: HTMLElement = buttonComponent.nativeElement;
                expect(btnElement.classList.contains(`btn-${type.replace('-square', '')}`)).toBeTruthy();
                expect(btnElement.classList.contains(`btn-square`)).toBeTruthy();
            });
        });

        it('should set loading success', () => {
            basicTestComponent.loading = true;
            fixture.detectChanges();
            const btnElement: HTMLElement = buttonComponent.nativeElement;
            expect(btnElement.classList.contains(`loading`)).toBeTruthy();
            expect(btnElement.textContent).toBe('Loading...');
            basicTestComponent.loading = false;
            fixture.detectChanges();
            expect(btnElement.classList.contains(`loading`)).toBeFalsy();
            expect(btnElement.textContent).toBe('Basic Button');
        });

        it('should set loading text success', () => {
            basicTestComponent.loading = true;
            fixture.detectChanges();
            basicTestComponent.loadingText = 'New Loading Text';
            fixture.detectChanges();
            const btnElement: HTMLElement = buttonComponent.nativeElement;
            expect(btnElement.textContent).toBe('New Loading Text');
        });

        it('should get correct class with icon', () => {
            const btnWithIcon = fixture.debugElement.query(By.css('#btn-with-icon'));
            const btnElement: HTMLElement = btnWithIcon.nativeElement;

            expect(btnElement.textContent).toEqual('Icon Button');
            expect(btnElement.classList.contains('btn')).toBeTruthy();
            assertButtonIcon(btnElement.children[0], 'inbox');
        });

        it('should set icon success', () => {
            basicTestComponent.icon = 'calendar';
            fixture.detectChanges();
            const btnWithIcon = fixture.debugElement.query(By.css('#btn-with-icon'));
            const btnElement: HTMLElement = btnWithIcon.nativeElement;
            expect(btnElement.textContent).toEqual('Icon Button');
            expect(btnElement.classList.contains('btn')).toBeTruthy();
            assertButtonIcon(btnElement.children[0], 'calendar');
        });

        it('should set wtf icon success', () => {
            basicTestComponent.icon = 'wtf-inbox';
            fixture.detectChanges();
            const btnWithIcon = fixture.debugElement.query(By.css('#btn-with-icon'));
            const btnElement: HTMLElement = btnWithIcon.nativeElement;
            expect(btnElement.classList.contains('btn')).toBeTruthy();
            expect(btnElement.children[0].tagName).toEqual('I');
            expect(btnElement.children[0].classList.contains('wtf')).toBeTruthy();
            expect(btnElement.children[0].classList.contains('wtf-inbox')).toBeTruthy();
        });

        it('should clear icon success', () => {
            const btnWithIcon = fixture.debugElement.query(By.css('#btn-with-icon'));
            const btnElement: HTMLElement = btnWithIcon.nativeElement;
            expect(btnElement.querySelector('thy-icon')).toBeTruthy();
            basicTestComponent.icon = null;
            fixture.detectChanges();
            expect(btnElement.querySelector('thy-icon')).toBeFalsy();
        });

        it('should get correct result when only has icon', () => {
            const btnOnlyIcon = fixture.debugElement.query(By.css('#btn-only-icon'));
            const btnElement: HTMLElement = btnOnlyIcon.nativeElement;
            expect(btnElement.querySelector('thy-icon')).toBeTruthy();
            expect(btnElement.children.length).toEqual(1);
        });
    });
});

@Component({
    selector: 'thy-test-button-icon-basic',
    template: `
        <button
            [thyButtonIcon]="icon"
            [thyShape]="shape"
            [thyLight]="isLight"
            [thyActive]="isActive"
            [thyTheme]="theme"
            [thySize]="size"></button>
        <thy-button-icon id="button-icon-component" thyIcon="inbox"></thy-button-icon>
    `,
    imports: [ThyButtonModule]
})
class ThyTestButtonIconBasicComponent {
    icon = 'inbox';
    size = '';
    shape = '';
    theme = '';
    isLight = false;
    isActive = false;
}

describe('ThyIconButton', () => {
    let fixture: ComponentFixture<ThyTestButtonIconBasicComponent>;
    let basicTestComponent: ThyTestButtonIconBasicComponent;
    let buttonIconComponent: DebugElement;

    const sizes = ['lg', 'md', 'sm', 'xs'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [bypassSanitizeProvider, provideHttpClient()]
        });

        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestButtonIconBasicComponent);
        basicTestComponent = fixture.componentInstance;
        fixture.detectChanges();
        buttonIconComponent = fixture.debugElement.query(By.directive(ThyButtonIcon));
    });

    it('should get correct classes', () => {
        const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
        expect(btnIconElement.classList.contains('btn')).toBeTruthy();
        expect(btnIconElement.classList.contains('btn-icon')).toBeTruthy();
        assertButtonIcon(btnIconElement.children[0], 'inbox');
    });

    it('should get correct classes', () => {
        const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
        expect(btnIconElement.classList.contains('btn')).toBeTruthy();
        expect(btnIconElement.classList.contains('btn-icon')).toBeTruthy();
        assertButtonIcon(btnIconElement.children[0], 'inbox');
    });

    it('should set icon success', () => {
        basicTestComponent.icon = 'calendar';
        fixture.detectChanges();
        const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
        assertButtonIcon(btnIconElement.children[0], 'calendar');
    });

    it('should clear icon success', () => {
        basicTestComponent.icon = '';
        fixture.detectChanges();
        const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
        expect(btnIconElement.children.length).toEqual(0);
    });

    it('should set size classes', () => {
        sizes.forEach(size => {
            basicTestComponent.size = size;
            fixture.detectChanges();
            const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
            expect(btnIconElement.classList.contains(`btn-icon-${size}`)).toBeTruthy();
        });
    });

    it('should set shape classes', () => {
        ['circle-dashed', 'circle-solid'].forEach(shape => {
            basicTestComponent.shape = shape;
            fixture.detectChanges();
            const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
            expect(btnIconElement.classList.contains(`btn-icon-circle`)).toBeTruthy();
            expect(btnIconElement.classList.contains(`${shape}`)).toBeTruthy();
        });

        ['dashed', 'solid'].forEach(shape => {
            basicTestComponent.shape = `circle-thick-${shape}`;
            fixture.detectChanges();
            const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
            expect(btnIconElement.classList.contains(`btn-icon-circle`)).toBeTruthy();
            expect(btnIconElement.classList.contains(`circle-${shape}`)).toBeTruthy();
            expect(btnIconElement.classList.contains(`border-thick`)).toBeTruthy();
        });
    });

    it('should set theme classes', () => {
        basicTestComponent.theme = 'danger-weak';
        fixture.detectChanges();
        const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
        expect(btnIconElement.classList.contains(`btn-icon-danger-weak`)).toBeTruthy();
    });

    it('should set wtf icon success', () => {
        basicTestComponent.icon = 'wtf-inbox';
        fixture.detectChanges();
        const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
        expect(btnIconElement.children[0].tagName).toEqual('I');
        expect(btnIconElement.children[0].classList.contains('wtf')).toBeTruthy();
        expect(btnIconElement.children[0].classList.contains('wtf-inbox')).toBeTruthy();
    });

    it('should get correct classes for component thy-button-icon', () => {
        const buttonIconComponent = fixture.debugElement.query(By.css('#button-icon-component'));
        const btnIconElement: HTMLElement = buttonIconComponent.nativeElement;
        expect(btnIconElement.classList.contains('btn')).toBeTruthy();
        expect(btnIconElement.classList.contains('btn-icon')).toBeTruthy();
        assertButtonIcon(btnIconElement.children[0], 'inbox');
    });
});

@Component({
    selector: 'thy-demo-button-group',
    template: `
        <thy-button-group [thySize]="size" [thyType]="type" [thyClearMinWidth]="clearMinWidth">
            <button thyButton>Left</button>
            <button thyButton>Middle</button>
            <button thyButton>Right</button>
        </thy-button-group>
    `,
    imports: [ThyButtonGroup, ThyButton]
})
class ThyDemoButtonGroupComponent {
    size = ``;
    type = `outline-primary`;
    clearMinWidth = false;
}

describe('ThyButtonGroup', () => {
    let fixture: ComponentFixture<ThyDemoButtonGroupComponent>;
    let basicTestComponent: ThyDemoButtonGroupComponent;
    let buttonGroupComponent: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [bypassSanitizeProvider, provideHttpClient()]
        });

        TestBed.compileComponents();
        injectDefaultSvgIconSet();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoButtonGroupComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        buttonGroupComponent = fixture.debugElement.query(By.directive(ThyButtonGroup));
        fixture.detectChanges();
    });

    it('should have correct class', () => {
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-outline-primary')).toBe(true);
    });

    it('should have correct class when type is outline-default', () => {
        basicTestComponent.type = `outline-default`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-outline-default')).toBe(true);
    });

    it('should have correct class when size is lg', () => {
        basicTestComponent.size = `lg`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-lg')).toBe(true);
    });

    it('should have correct class when size is sm', () => {
        basicTestComponent.size = `sm`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-sm')).toBe(true);
    });

    it('should have correct class when size is xs', () => {
        basicTestComponent.size = `xs`;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-xs')).toBe(true);
    });

    it('should have correct class when clearMinWidth is true', () => {
        basicTestComponent.clearMinWidth = true;
        fixture.detectChanges();
        expect(buttonGroupComponent.nativeElement.classList.contains('btn-group-clear-min-width')).toBe(true);
    });
});

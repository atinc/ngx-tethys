import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DomSanitizer, By } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';

import { ThyAvatarModule } from '../avatar.module';
import { ThyAvatarService } from '../avatar.service';
import { ThyAvatarFetchPriority, ThyAvatarLoading } from '../avatar.component';
import { dispatchFakeEvent } from '../../testing';

@Component({
    template: `
        @switch (useSuite) {
            <!-- Suite 1 for test thyName -->
            @case (1) {
                <thy-avatar [thyShowName]="true" [thyName]="name"></thy-avatar>
            }
            <!-- Suite 2 for test default size -->
            @case (2) {
                <thy-avatar [thyName]="name"></thy-avatar>
            }
            <!-- Suite 3 for test thySize -->
            @case (3) {
                <thy-avatar [thyName]="name" [thySize]="size"></thy-avatar>
            }
            <!-- Suite 4 for test thyDisabled and thyShowRemove -->
            @case (4) {
                <thy-avatar [thyName]="name" thyDisabled="true" thyShowRemove="true"></thy-avatar>
            }
            <!-- Suite 5 for test thySrc with thyError -->
            @case (5) {
                <thy-avatar [thyName]="name" [thySrc]="'./not_exist/abc.jpg'" (thyError)="thyError($event)"></thy-avatar>
            }
            <!-- Suite 6 for testing thyLoading and thyFetchPriority -->
            @case (6) {
                <thy-avatar thySrc="/abc.jpg" [thyLoading]="loading" [thyFetchPriority]="fetchPriority"></thy-avatar>
            }
            <!-- Suite 7 for test thyDisabled and thyRemovable -->
            @case (7) {
                <thy-avatar [thyName]="name" thyRemovable="true" (thyRemove)="remove()"></thy-avatar>
            }
        }
    `
})
class ThyTestAvatarComponent {
    constructor(
        private thyAvatarService: ThyAvatarService,
        private domSanitizer: DomSanitizer
    ) {
        this.errorEmit$ = new Observable<Event>(subscriber => {
            this.errorSubscriber = subscriber;
        });
    }

    useSuite: 1 | 2 | 3 | 4 | 5 | 6 | 7;

    name = 'LiLei';

    size: number | string = 0;

    errorSubscriber: Subscriber<Event>;

    errorEmit$: Observable<Event>;

    spyThyError = jasmine.createSpy('ThyError emit');

    loading?: ThyAvatarLoading;

    fetchPriority?: ThyAvatarFetchPriority;

    rewriteNameTransform() {
        this.thyAvatarService.nameTransform = (name: string) => {
            return this.domSanitizer.bypassSecurityTrustHtml(`<code>${name}</code>`);
        };
    }

    thyError(event: Event): void {
        this.spyThyError();
        this.errorSubscriber.next(event);
    }

    remove() {
        console.log('remove');
    }
}

describe('ThyAvatarComponent', () => {
    let fixture: ComponentFixture<ThyTestAvatarComponent>;
    let componentInstance: ThyTestAvatarComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyAvatarModule],
            declarations: [ThyTestAvatarComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyTestAvatarComponent);
        componentInstance = fixture.debugElement.componentInstance;
    });

    describe('default avatarName', () => {
        beforeEach(() => {
            componentInstance.useSuite = 1;
            fixture.detectChanges();
        });

        it('should show the avatarName default', () => {
            const component = componentInstance.name;
            expect(fixture.nativeElement.querySelector(`.avatar-name`).innerText).toEqual(component);
        });
    });

    describe('custom avatarName', () => {
        beforeEach(() => {
            componentInstance.useSuite = 1;
            componentInstance.rewriteNameTransform();
            fixture.detectChanges();
        });

        it('should show the custom avatarName', () => {
            const customValue = fixture.nativeElement.querySelector(`.avatar-name`).firstChild;
            const result = document.createElement('code');
            result.innerText = componentInstance.name;
            expect(customValue).toEqual(result);
        });
    });

    describe('the avatar should be 36px size which is the default size When thySize is empty', () => {
        beforeEach(() => {
            componentInstance.useSuite = 2;
        });

        it('the avatar should be 36px size which is the default size When thySize is empty', () => {
            fixture.detectChanges();

            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-36'));
            expect(avatarContainer).not.toBeNull();
        });
    });

    describe('show different size when input different thySize value', () => {
        beforeEach(() => {
            componentInstance.useSuite = 3;
        });

        it('the avatar should be 24px size When input xs string', () => {
            componentInstance.size = 'xs';
            fixture.detectChanges();

            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-24'));
            expect(avatarContainer).not.toBeNull();
        });

        it('the avatar should be 68px size When input number 68', () => {
            componentInstance.size = 68;
            fixture.detectChanges();

            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-68'));
            expect(avatarContainer).not.toBeNull();
        });

        describe('The avatar size should get the adjacent value from [16, 22, 24, 28, 32, 36, 48, 68, 110, 160]', () => {
            it('the avatar should be 16px size When input number less than 16', () => {
                componentInstance.size = 0;
                fixture.detectChanges();

                const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-16'));
                expect(avatarContainer).not.toBeNull();
            });
            it('the larger value should displayed When thySize is between the two values', () => {
                componentInstance.size = 58;
                fixture.detectChanges();

                const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-68'));
                expect(avatarContainer).not.toBeNull();
            });

            it('the avatar should be 160px size When input number large than 160', () => {
                componentInstance.size = 200;
                fixture.detectChanges();

                const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-160'));
                expect(avatarContainer).not.toBeNull();
            });
        });
    });

    describe('disabled or remove avatar when thyDisabled is true', () => {
        beforeEach(() => {
            componentInstance.useSuite = 4;
        });

        it('has .thy-avatar-disabled element when thyDisabled is true', () => {
            fixture.detectChanges();
            const avatarContainer = fixture.nativeElement.querySelector('.thy-avatar');
            expect(avatarContainer.querySelector('.thy-avatar-disabled')).not.toBeNull();
        });
    });

    describe('disabled or remove avatar when  thyRemovable is true', () => {
        beforeEach(() => {
            componentInstance.useSuite = 7;
        });

        it('has .remove-link element when thyRemovable is true', () => {
            fixture.detectChanges();
            const avatarContainer = fixture.nativeElement.querySelector('.thy-avatar');
            expect(avatarContainer.querySelector('.remove-link')).not.toBeNull();
        });

        it('should dispatch event when thyRemove work', () => {
            dispatchFakeEvent(fixture.nativeElement, 'mouseover', true);
            fixture.detectChanges();
            const avatarContainer = fixture.nativeElement.querySelector('.thy-avatar');
            dispatchFakeEvent(avatarContainer, 'mouseover', true);

            const closeIcon = avatarContainer.querySelector('.remove-link');
            expect(closeIcon).toBeTruthy();
            const removeSpy = spyOn(fixture.componentInstance, 'remove');
            dispatchFakeEvent(closeIcon, 'click', true);
            fixture.detectChanges();
            expect(removeSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('img thySrc load fail', () => {
        beforeEach(() => {
            componentInstance.useSuite = 5;
        });

        it('should name span instead of img, and emit thyError', (done: DoneFn) => {
            fixture.detectChanges();
            fixture.componentInstance.errorEmit$.subscribe(() => {
                fixture.detectChanges();
                const avatarContainer = fixture.nativeElement.querySelector('.thy-avatar');
                expect(avatarContainer.querySelector('img')).toBeFalsy();
                expect(avatarContainer.querySelector('span')).toBeTruthy();
                expect(fixture.componentInstance.spyThyError).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('avatar with thyLoading and thyFetchPriority', () => {
        beforeEach(() => {
            componentInstance.useSuite = 6;
        });

        it('should set and remove `loading` and `fetchpriority` attributes when those are changed', () => {
            fixture.detectChanges();

            const avatarContainer = fixture.nativeElement.querySelector('.thy-avatar');
            const image: HTMLImageElement = avatarContainer.querySelector('img');

            expect(image.hasAttribute('loading')).toEqual(false);
            expect(image.hasAttribute('fetchpriority')).toEqual(false);

            componentInstance.loading = 'lazy';
            componentInstance.fetchPriority = 'auto';
            fixture.detectChanges();

            expect(image.getAttribute('loading')).toEqual('lazy');
            expect(image.getAttribute('fetchpriority')).toEqual('auto');
        });
    });
});

import { style } from '@angular/animations';
import { Component, DebugElement, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyAvatarListComponent, ThyAvatarListMode } from '../avatar-list/avatar-list.component';
import { ThyAvatarModule } from '../avatar.module';
import { ThyAvatarComponent } from '../avatar.component';
import { Subject } from 'rxjs';
import { dispatchFakeEvent } from '../../testing';

@Component({
    template: `
        <div [ngStyle]="{ width: '300px' }">
            <thy-avatar-list>
                <thy-avatar thyName="Abigail"></thy-avatar>
                <thy-avatar thyName="Belle"></thy-avatar>
                <thy-avatar thyName="Camilla"></thy-avatar>
                <thy-avatar thyName="Dottie"></thy-avatar>
                <thy-avatar thyName="Elva"></thy-avatar>
                <ng-template #append>
                    <button thyButtonIcon="user-add-bold" thyShape="circle-thick-dashed"></button>
                </ng-template>
            </thy-avatar-list>
        </div>
    `,
    styleUrls: ['../styles/avatar.scss']
})
export class AvatarListBasicComponent implements OnInit {
    ngOnInit(): void {}
}

@Component({
    template: `
        <div [ngStyle]="{ width: '300px' }">
            <thy-avatar-list [thyAvatarSize]="size" [thyMode]="mode" [thyRemovable]="removable" [thyMax]="max" (thyRemove)="remove()">
                <thy-avatar thyName="Abigail"></thy-avatar>
                <thy-avatar thyName="Belle"></thy-avatar>
                <thy-avatar thyName="Camilla"></thy-avatar>
                <thy-avatar thyName="Abigail"></thy-avatar>
                <thy-avatar thyName="Belle"></thy-avatar>
            </thy-avatar-list>
        </div>
    `,
    styleUrls: ['../styles/avatar.scss']
})
export class AvatarListTestComponent implements OnInit {
    public size: number | string;

    public mode: ThyAvatarListMode;

    public removable = false;

    public max: number = 2;

    ngOnInit(): void {}

    remove() {
        console.log('remove success');
    }
}

@Component({
    template: `
        <thy-avatar-list [thyResponsive]="responsive">
            <thy-avatar thyName="Abigail"></thy-avatar>
            <thy-avatar thyName="Belle"></thy-avatar>
            <thy-avatar thyName="Camilla"></thy-avatar>
            <thy-avatar thyName="Abigail"></thy-avatar>
            <thy-avatar thyName="Belle"></thy-avatar>
            <thy-avatar thyName="Abigail"></thy-avatar>
            <thy-avatar thyName="Belle"></thy-avatar>
            <thy-avatar thyName="Camilla"></thy-avatar>
            <thy-avatar thyName="Abigail"></thy-avatar>
            <thy-avatar thyName="Belle"></thy-avatar>
        </thy-avatar-list>
    `,
    styleUrls: ['../styles/avatar.scss']
})
export class AvatarListResponsiveComponent implements OnInit {
    public responsive = false;

    ngOnInit(): void {}
}

describe('thy-avatar-list', () => {
    let componentInstance: AvatarListBasicComponent;
    let avatarListDebugElement: DebugElement;
    let avatarListElement: HTMLElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyAvatarModule],
            declarations: [AvatarListBasicComponent, AvatarListTestComponent, AvatarListResponsiveComponent]
        }).compileComponents();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<AvatarListBasicComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListBasicComponent);
            avatarListDebugElement = fixture.debugElement.query(By.directive(ThyAvatarListComponent));
            componentInstance = fixture.componentInstance;
            avatarListElement = avatarListDebugElement.nativeElement;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(componentInstance).toBeTruthy();
            expect(avatarListElement.classList.contains('thy-avatar-list')).toEqual(true);
        });

        it('should have correct avatar item', fakeAsync(() => {
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            expect(avatarComponent.length).toEqual(5);
            const moreComponent = fixture.debugElement.query(By.css('.more-36'));
            expect(moreComponent).not.toBeTruthy();
        }));

        it('should be 36px size which is the default size When thyAvatarSize is empty', fakeAsync(() => {
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            const avatarElement = avatarComponent[0].nativeElement;
            expect(avatarElement.classList.contains('thy-avatar-36')).toEqual(true);
        }));

        it('should show append and appendContent template', () => {
            expect(avatarListDebugElement.componentInstance.appendContent).not.toBeNull();
            expect(avatarListElement.querySelector('button')).not.toBeNull();
        });
    });

    describe('show different size when input different thyAvatarSize value', () => {
        let fixture: ComponentFixture<AvatarListTestComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListTestComponent);
            fixture.detectChanges();
        });
        it('should be 16 size When input number 0', fakeAsync(() => {
            fixture.componentInstance.size = 0;
            fixture.detectChanges();
            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-16'));
            expect(avatarContainer).not.toBeNull();
        }));

        it('should be 24px size When input xs string', fakeAsync(() => {
            fixture.componentInstance.size = 'xs';
            fixture.detectChanges();
            const avatarContainer = fixture.debugElement.query(By.css('.thy-avatar-24'));
            expect(avatarContainer).not.toBeNull();
        }));

        it('should be 68px size When input number 80', fakeAsync(() => {
            fixture.componentInstance.size = '80';
            fixture.detectChanges();
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            const avatarElement = avatarComponent[0].nativeElement;
            expect(avatarElement.classList.contains('thy-avatar-68')).toEqual(true);
        }));
    });

    describe('show different type when input different thyMode value', () => {
        let fixture: ComponentFixture<AvatarListTestComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListTestComponent);
            avatarListDebugElement = fixture.debugElement.query(By.directive(ThyAvatarListComponent));
            avatarListElement = avatarListDebugElement.nativeElement;
            fixture.detectChanges();
        });

        it('should be default type which is the default type When thyMode is empty', fakeAsync(() => {
            expect(avatarListElement.classList.contains('thy-avatar-list')).toEqual(true);
            expect(avatarListElement.classList.contains('thy-avatar-list-overlap')).toEqual(false);
        }));

        it('should overlap type is thyMode is overlap', fakeAsync(() => {
            fixture.componentInstance.mode = ThyAvatarListMode.overlap;
            fixture.detectChanges();
            expect(avatarListElement.classList.contains('thy-avatar-list-overlap')).toEqual(true);
        }));

        it('should space is 6 or 0 when thyMode is default', fakeAsync(() => {
            fixture.componentInstance.mode = ThyAvatarListMode.default;
            fixture.componentInstance.max = 10;
            fixture.componentInstance.size = '36';
            fixture.detectChanges();

            const avatarContents = fixture.debugElement.queryAll(By.css('.thy-avatar-content'));
            const avatarSpace = avatarListDebugElement.componentInstance.avatarSpace;
            avatarContents.forEach((value, index) => {
                if (index === avatarContents.length - 1) {
                    expect(avatarContents[index].nativeElement.style.marginRight).toBe(`0px`);
                } else {
                    expect(avatarContents[index].nativeElement.style.marginRight).toBe(`${avatarSpace}px`);
                }
            });
        }));

        it('should space is -8 when thyMode is overlap', fakeAsync(() => {
            fixture.componentInstance.mode = ThyAvatarListMode.overlap;
            fixture.detectChanges();
            const avatarContent = fixture.debugElement.query(By.css('.thy-avatar-content'));
            const avatarOverlapSpace = avatarListDebugElement.componentInstance.avatarOverlapSpace;
            expect(avatarContent.nativeElement.style.marginLeft).toBe(`${avatarOverlapSpace}px`);
        }));
    });

    describe('thyRemovable and thyOnRemove is work', () => {
        let fixture: ComponentFixture<AvatarListTestComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListTestComponent);
            fixture.detectChanges();
        });

        it('should .remove-link no rendering  when thyRemovable is null', () => {
            fixture.componentInstance.removable = null;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.remove-link'))).toBeNull();
        });

        it('should .remove-link  rendering  when thyRemovable is true and thyMode is default', () => {
            fixture.componentInstance.removable = true;
            fixture.detectChanges();
            fixture.componentInstance.mode = ThyAvatarListMode.default;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.remove-link'))).not.toBeNull();
        });

        it('should .remove-link no rendering  when thyRemovable is true and thyMode is overlap', () => {
            fixture.componentInstance.removable = true;
            fixture.detectChanges();
            fixture.componentInstance.mode = ThyAvatarListMode.overlap;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.remove-link'))).toBeNull();
            fixture.componentInstance.mode = ThyAvatarListMode.default;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.remove-link'))).not.toBeNull();
        });

        it('should dispatch event when thyRemove work', fakeAsync(() => {
            fixture.componentInstance.removable = true;
            fixture.componentInstance.mode = ThyAvatarListMode.default;
            fixture.detectChanges();
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            const avatarElement = avatarComponent[0].nativeElement;
            dispatchFakeEvent(avatarElement, 'mouseover', true);
            fixture.detectChanges();
            const closeIcon = avatarElement.querySelector('.remove-link');
            expect(closeIcon).toBeTruthy();
            const removeSpy = spyOn(fixture.componentInstance, 'remove');
            dispatchFakeEvent(closeIcon, 'click', true);
            fixture.detectChanges();
            expect(removeSpy).toHaveBeenCalledTimes(1);
        }));
    });

    describe('thyMax is work', () => {
        let fixture: ComponentFixture<AvatarListTestComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListTestComponent);
            avatarListDebugElement = fixture.debugElement.query(By.directive(ThyAvatarListComponent));
            fixture.componentInstance.size = '36';
            fixture.detectChanges();
        });

        it('should ThyAvatarComponent 3  when thyMax is 3', fakeAsync(() => {
            fixture.componentInstance.max = 3;
            fixture.detectChanges();
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            expect(avatarComponent.length).toEqual(3);
            const moreComponent = fixture.debugElement.query(By.css('.more-36'));
            expect(moreComponent).toBeTruthy();
            expect(Number(moreComponent.nativeElement.innerText.slice(1))).toEqual(2);
        }));

        it('should ThyAvatarComponent 5 when thyMax is 10', () => {
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            expect(avatarComponent.length).toEqual(5);
            const moreComponent = fixture.debugElement.query(By.css('.more-36'));
            expect(moreComponent).not.toBeTruthy();
        });
    });

    describe('thyResponsive is work', () => {
        const fakeResizeObserver = new Subject();
        let fixture: ComponentFixture<AvatarListResponsiveComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListResponsiveComponent);
            avatarListDebugElement = fixture.debugElement.query(By.directive(ThyAvatarListComponent));
            fixture.detectChanges();
        });

        it('should ThyAvatarComponent count change with view size', fakeAsync(() => {
            fixture.componentInstance.responsive = true;
            expect(fixture.debugElement.queryAll(By.directive(ThyAvatarComponent)).length).toEqual(10);
            fixture.detectChanges();

            avatarListDebugElement.componentInstance.ngAfterViewInit();
            const createResizeSpy = spyOn(avatarListDebugElement.componentInstance, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            spyAvatarListOffsetWidth(avatarListDebugElement.componentInstance, 200);
            fakeResizeObserver.next();
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
            expect(fixture.debugElement.queryAll(By.directive(ThyAvatarComponent)).length).toEqual(4);
        }));
    });
});

function spyAvatarListOffsetWidth(avatarList: ThyAvatarListComponent, width: number) {
    spyOnProperty(avatarList['elementRef'].nativeElement, 'offsetWidth', 'get').and.returnValue(width);
}

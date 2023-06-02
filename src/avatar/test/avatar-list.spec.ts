import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyAvatarListComponent, ThyAvatarListMode } from '../avatar-list/avatar-list.component';
import { ThyAvatarComponent } from '../avatar.component';
import { ThyAvatarModule } from '../avatar.module';

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
            <thy-avatar-list [thyAvatarSize]="size" [thyMode]="mode">
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

    ngOnInit(): void {}

    remove() {
        console.log('remove success');
    }
}

@Component({
    template: `
        <thy-avatar-list>
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

@Component({
    template: ` <thy-avatar-list> </thy-avatar-list> `,
    styleUrls: ['../styles/avatar.scss']
})
export class AvatarListEmptyComponent implements OnInit {
    ngOnInit(): void {}
}

describe('thy-avatar-list', () => {
    let componentInstance: AvatarListBasicComponent;
    let avatarListDebugElement: DebugElement;
    let avatarListElement: HTMLElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyAvatarModule],
            declarations: [AvatarListBasicComponent, AvatarListTestComponent, AvatarListResponsiveComponent, AvatarListEmptyComponent]
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
            expect(fixture.debugElement.query(By.css('.thy-avatar-list-overlap'))).toBeNull();
        }));

        it('should show current overlap space When thyMode is overlap', fakeAsync(() => {
            fixture.componentInstance.mode = ThyAvatarListMode.overlap;
            fixture.componentInstance.size = 60;
            fixture.detectChanges();
            const element = fixture.debugElement.queryAll(By.css('.thy-avatar-68'));
            expect(element).not.toBeNull();
            const spaceSize = 68 * 0.25 * -1;
            expect(getComputedStyle(element[0].nativeElement).marginLeft).toEqual('0px');
            expect(getComputedStyle(element[1].nativeElement).marginLeft).toEqual(`${spaceSize}px`);
        }));

        it('should overlap type is thyMode is overlap', fakeAsync(() => {
            fixture.componentInstance.mode = ThyAvatarListMode.overlap;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.thy-avatar-list-overlap'))).not.toBeNull();
        }));

        it('should toggle thy-avatar-list-overlap class when toggle thyMode', fakeAsync(() => {
            fixture.componentInstance.mode = ThyAvatarListMode.default;
            fixture.componentInstance.size = '36';
            fixture.detectChanges();

            const avatarList = fixture.debugElement.query(By.css('.thy-avatar-list'));
            expect(avatarList.classes['thy-avatar-list-overlap']).toBeFalsy();

            fixture.componentInstance.mode = ThyAvatarListMode.overlap;
            fixture.detectChanges();
            const updatedAvatarList = fixture.debugElement.query(By.css('.thy-avatar-list'));
            expect(updatedAvatarList.classes['thy-avatar-list-overlap']).toBeTruthy();
        }));
    });

    describe('empty', () => {
        let fixture: ComponentFixture<AvatarListEmptyComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListEmptyComponent);
            avatarListDebugElement = fixture.debugElement.query(By.directive(ThyAvatarListComponent));
            fixture.detectChanges();
        });

        it('should create when ContentChildren is null ', fakeAsync(() => {
            expect(fixture).toBeTruthy();
            expect(fixture.debugElement.queryAll(By.directive(ThyAvatarComponent)).length).toEqual(0);
        }));
    });
});

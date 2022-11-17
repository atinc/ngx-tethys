import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, OnInit } from '@angular/core';
import { ThyAvatarModule } from '../avatar.module';
import { ThyAvatarListComponent } from '../avatar-list/avatar-list.component';
import { By } from '@angular/platform-browser';
import { ThyAvatarComponent } from '../avatar.component';

@Component({
    template: `
        <thy-avatar-list>
            <thy-avatar thyName="Peter"></thy-avatar>
            <thy-avatar thyName="Peter"></thy-avatar>
            <thy-avatar thyName="Peter"></thy-avatar>
            <thy-avatar thyName="Peter"></thy-avatar>
            <thy-avatar thyName="Peter"></thy-avatar>
            <ng-template #append>
                <div style="width: 32px;height:32px;border:1px solid #999;border-radius: 50%;">
                    <a href="javascript:;" thyAction thyIcon="user-add-bold"></a>
                </div>
            </ng-template>
        </thy-avatar-list>
    `
})
export class AvatarListBasicComponent implements OnInit {
    ngOnInit(): void {}
}

describe('thy-avatar-list', () => {
    let testComponent: AvatarListBasicComponent;
    let avatarListDebugElement: DebugElement;
    let avatarListElement: HTMLElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyAvatarModule],
            declarations: [AvatarListBasicComponent]
        });
        TestBed.compileComponents();
    });

    describe('basic', () => {
        let fixture: ComponentFixture<AvatarListBasicComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListBasicComponent);
            avatarListDebugElement = fixture.debugElement.query(By.directive(ThyAvatarListComponent));
            testComponent = fixture.componentInstance;
            avatarListElement = avatarListDebugElement.nativeElement;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
            expect(testComponent).toBeTruthy();
        });

        it('should get correct class for default avatar-list', () => {
            expect(avatarListDebugElement).toBeTruthy();
            expect(avatarListElement).toBeTruthy();
            expect(avatarListElement.classList.contains('thy-avatar-list')).toEqual(true);
            expect(avatarListElement.classList.contains('thy-avatar-list thy-avatar-list-overlap')).toEqual(false);
        });

        it('should get correct thy-avatar', () => {
            const avatarList = avatarListDebugElement.queryAll(By.directive(ThyAvatarComponent));
            expect(avatarList).toBeTruthy();
            expect(avatarList.length).toEqual(5);
            const avatarElement: HTMLElement = avatarList[0].nativeElement;
            expect(avatarElement.classList.contains('thy-avatar-28')).toEqual(true);
        });

        it('should thySize default  28px', () => {
            const avatarList = avatarListDebugElement.queryAll(By.directive(ThyAvatarComponent));
            const avatarElement: HTMLElement = avatarList[0].nativeElement;
            expect(avatarElement.classList.contains('thy-avatar-28')).toEqual(true);
        });

        it('should set append is success', () => {
            const appendElement = avatarListElement.querySelector('.thy-avatar-list-append');
            expect(appendElement).toBeTruthy();
        });
    });
});

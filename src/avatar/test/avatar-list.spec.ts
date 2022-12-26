import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyAvatarListComponent } from '../avatar-list/avatar-list.component';
import { ThyAvatarModule } from '../avatar.module';

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
    });
});

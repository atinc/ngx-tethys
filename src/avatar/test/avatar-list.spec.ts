import { Component, DebugElement, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyAvatarListComponent, ThyAvatarListMode } from '../avatar-list/avatar-list.component';
import { ThyAvatarModule } from '../avatar.module';
import { ThyAvatarComponent } from '../avatar.component';
import { Subject } from 'rxjs';

@Component({
    template: `
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
    `,
    styleUrls: ['../styles/avatar.scss']
})
export class AvatarListBasicComponent implements OnInit {
    ngOnInit(): void {}
}

@Component({
    template: `
        <thy-avatar-list [thyAvatarSize]="size" [thyMode]="mode" [thyRemovable]="removable" [thyMax]="max">
            <thy-avatar thyName="Abigail"></thy-avatar>
            <thy-avatar thyName="Belle"></thy-avatar>
            <thy-avatar thyName="Camilla"></thy-avatar>
            <thy-avatar thyName="Abigail"></thy-avatar>
            <thy-avatar thyName="Belle"></thy-avatar>
        </thy-avatar-list>
    `,
    styleUrls: ['../styles/avatar.scss']
})
export class AvatarListTestComponent implements OnInit {
    public size: number | string;

    public mode: ThyAvatarListMode;

    public removable = false;

    public max: number = 2;

    ngOnInit(): void {}
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

        it('should create', fakeAsync(() => {
            expect(fixture).toBeTruthy();
            expect(componentInstance).toBeTruthy();
            expect(avatarListElement.classList.contains('thy-avatar-list')).toEqual(true);
        }));

        it('should have correct avatar item', fakeAsync(() => {
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            expect(avatarComponent).toBeTruthy();
            expect(avatarComponent.length).toEqual(5);
        }));

        it('should be 36px size which is the default size When thyAvatarSize is empty', fakeAsync(() => {
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            const avatarElement = avatarComponent[0].nativeElement;
            expect(avatarElement.classList.contains('thy-avatar-36')).toEqual(true);
        }));

        it('should show append template', () => {
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
    });

    describe('thyRemovable is work', () => {
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
    });

    describe('thyMax is work', () => {
        let fixture: ComponentFixture<AvatarListTestComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListTestComponent);
            fixture.detectChanges();
        });

        it('should ThyAvatarComponent 3  when thyMax is 3', () => {
            fixture.componentInstance.max = 3;
            fixture.detectChanges();
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            expect(avatarComponent.length).toEqual(3);
        });

        it('should ThyAvatarComponent 5 when thyMax is 10', () => {
            fixture.componentInstance.max = 10;
            fixture.detectChanges();
            const avatarComponent = fixture.debugElement.queryAll(By.directive(ThyAvatarComponent));
            expect(avatarComponent.length).toEqual(5);
        });
    });

    describe('thyResponsive is work', () => {
        const fakeResizeObserver = new Subject();
        let fixture: ComponentFixture<AvatarListResponsiveComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(AvatarListResponsiveComponent);
            avatarListDebugElement = fixture.debugElement.query(By.directive(ThyAvatarListComponent));
            const createResizeSpy = spyOn(avatarListDebugElement.componentInstance, 'createResizeObserver');
            createResizeSpy.and.returnValue(fakeResizeObserver);
            fixture.detectChanges();
        });

        it('should ThyAvatarComponent count change with view size', fakeAsync(() => {
            fixture.componentInstance.responsive = true;
            expect(fixture.debugElement.queryAll(By.directive(ThyAvatarComponent)).length).toEqual(10);
            fixture.detectChanges();

            avatarListDebugElement.componentInstance.ngAfterViewInit();
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

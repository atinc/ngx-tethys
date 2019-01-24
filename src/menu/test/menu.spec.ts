import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyMenuModule } from '../menu.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyMenuComponent } from '../menu.component';
import { ThyMenuGroupComponent } from '../group/menu-group.component';
import { ThyMenuItemComponent } from '../item/menu-item.component';
import { ThyMenuItemIconComponent } from '../item/icon/menu-item-icon.component';
import { ThyMenuItemNameComponent } from '../item/name/menu-item-name.component';
import { ThyMenuItemIconMoreComponent } from '../item/more/menu-item-icon-more.component';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ThyPopBoxService } from '../../pop-box';
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning/index';
import { ThyPositioningService } from '../../positioning/positioning.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ThyMenu', () => {
    let fixture: ComponentFixture<ThyDemoMenuComponent>;
    let basicTestComponent: ThyDemoMenuComponent;
    let thyMenuComponent;
    let thyMenuGroupComponent;
    let thyMenuItemComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyMenuModule, ThyMenuTestModule],
            providers: []
        });

        TestBed.compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ThyDemoMenuComponent);
        basicTestComponent = fixture.debugElement.componentInstance;
        thyMenuComponent = fixture.debugElement.query(By.directive(ThyMenuComponent));
        thyMenuGroupComponent = fixture.debugElement.query(By.directive(ThyMenuGroupComponent));
        thyMenuItemComponent = fixture.debugElement.queryAll(By.directive(ThyMenuItemComponent));

        // const thyMenuItemIconComponent = fixture.debugElement.queryAll(By.directive(ThyMenuItemIconComponent));
        // thyMenuItemIconComponent.forEach((icon) => {
        //     console.log('---');
        //     console.log(icon.parent.name === 'thy-menu-item');
        //     // console.log(icon.parent.nativeElement.classList.contains('thy-menu-item'));
        // });
    });

    it('thy-menu should have class: thy-menu', () => {
        fixture.detectChanges();
        expect(thyMenuComponent.nativeElement.classList.contains('thy-menu')).toBe(true);
    });
    it('thy-menu-group should have class: thy-menu-group', () => {
        fixture.detectChanges();
        expect(thyMenuGroupComponent.nativeElement.classList.contains('thy-menu-group')).toBe(true);
    });

    it('thy-menu-group parent must be thy-menu', () => {
        const thyMenuGroup = fixture.debugElement.queryAll(By.directive(ThyMenuGroupComponent));
        expect(thyMenuGroup.every(item => item.parent.name === 'thy-menu')).toBe(true);
    });


    it('thy-menu-item should have class: thy-menu-item', () => {
        fixture.detectChanges();
        expect(thyMenuItemComponent.every(item => item.nativeElement.classList.contains('thy-menu-item'))).toBe(true);
    });

    it('thy-menu-item-icon parent must be thy-menu-item', () => {
        const thyMenuItemIconComponent = fixture.debugElement.queryAll(By.directive(ThyMenuItemIconComponent));
        expect(thyMenuItemIconComponent.every(item => item.parent.name === 'thy-menu-item')).toBe(true);
    });

    it('thy-menu-item-name parent must be thy-menu-item', () => {
        const thyMenuItemNameComponent = fixture.debugElement.queryAll(By.directive(ThyMenuItemNameComponent));
        expect(thyMenuItemNameComponent.every(item => item.parent.name === 'thy-menu-item')).toBe(true);
    });

    it('thy-menu-item-icon-more parent must be thy-menu-item', () => {
        const thyMenuItemIconMoreComponent = fixture.debugElement.queryAll(By.directive(ThyMenuItemIconMoreComponent));
        expect(thyMenuItemIconMoreComponent.every(item => item.parent.name === 'thy-menu-item')).toBe(true);
    });
});

@Component({
    selector: 'thy-demo-thy-menu',
    template: `
        <thy-menu>
            <thy-menu-group thyTitle="工作" [thyExpand]="true" [thyShowAction]="true" [thyActionIcon]="'wtf wtf-my'">
                <thy-menu-item>
                    <thy-menu-item-icon> <i class="wtf wtf-my"></i> </thy-menu-item-icon>
                    <thy-menu-item-name>我的工作</thy-menu-item-name>
                    <thy-menu-item-icon-more> <i class="wtf wtf-more-lg"></i> </thy-menu-item-icon-more>
                </thy-menu-item>
            </thy-menu-group>
            <thy-menu-item>
                <thy-menu-item-icon> <i class="wtf wtf-setting-o"></i> </thy-menu-item-icon>
                <thy-menu-item-name>配置中心</thy-menu-item-name>
            </thy-menu-item>
        </thy-menu>
    `
})
class ThyDemoMenuComponent {}

@NgModule({
    imports: [ThyMenuModule, BrowserAnimationsModule],
    declarations: [ThyDemoMenuComponent],
    exports: [ThyDemoMenuComponent],
    providers: [ThyPopBoxService, ComponentLoaderFactory, PositioningService, ThyPositioningService]
})
export class ThyMenuTestModule {}

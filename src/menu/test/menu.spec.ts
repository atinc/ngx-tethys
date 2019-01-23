import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { ThyMenuModule } from '../menu.module';
import { NgModule, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ThyMenuComponent } from '../menu.component';
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
        thyMenuComponent = fixture.debugElement.queryAll(By.directive(ThyMenuComponent));
        // console.log(thyMenuComponent[0].nativeElement);
    });

    it('should have correct class', () => {
        fixture.detectChanges();
        expect(thyMenuComponent[0].nativeElement.classList.contains('thy-menu')).toBe(true);
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
    imports: [ThyMenuModule,BrowserAnimationsModule],
    declarations: [ThyDemoMenuComponent],
    exports: [ThyDemoMenuComponent],
    providers:[ThyPopBoxService,ComponentLoaderFactory,PositioningService,ThyPositioningService]
})
export class ThyMenuTestModule {}

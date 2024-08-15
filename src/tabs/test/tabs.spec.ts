import { ComponentType } from '@angular/cdk/portal';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyNav } from 'ngx-tethys/nav';
import { createFakeEvent, dispatchFakeEvent } from 'ngx-tethys/testing';
import { SafeAny } from 'ngx-tethys/types';
import { ThyTabs, ThyTabsPosition, ThyTabsSize, ThyTabsType } from '../tabs.component';
import { ThyTabsModule } from '../tabs.module';
import { ThyActiveTabInfo, ThyTabActiveEvent } from '../types';

@Component({
    selector: 'test-tabs-basic',
    template: `
        <thy-tabs (thyActiveTabChange)="activeTabChange($event)">
            <thy-tab id="tab1" thyTitle="Tab1">Tab1 Content</thy-tab>
            <thy-tab id="tab2" thyTitle="Tab2">Tab2 Content</thy-tab>
            <thy-tab id="tab3" thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsBasicComponent {
    activeTabChange(event: ThyTabActiveEvent) {}
}

@Component({
    selector: 'test-tabs-type',
    template: `
        <thy-tabs [thyType]="type">
            <thy-tab thyTitle="Tab1">Tab1 Content</thy-tab>
            <thy-tab thyTitle="Tab2">Tab2 Content</thy-tab>
            <thy-tab thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsTypeComponent {
    type: ThyTabsType;
}

@Component({
    selector: 'test-tabs-size',
    template: `
        <thy-tabs [thySize]="size">
            <thy-tab thyTitle="Tab1">Tab1 Content</thy-tab>
            <thy-tab thyTitle="Tab2">Tab2 Content</thy-tab>
            <thy-tab thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsSizeComponent {
    size: ThyTabsSize;
}

@Component({
    selector: 'test-tabs-custom-title',
    template: `
        <thy-tabs>
            <thy-tab> <ng-template #title>小龙虾🦞</ng-template>Tab1 Content </thy-tab>
            <thy-tab> <ng-template #title>烤全羊🐑</ng-template>Tab2 Content</thy-tab>
            <thy-tab> <ng-template #title>烤乳鸽🐦</ng-template>Tab3 Content</thy-tab>
            <thy-tab> <ng-template #title>烤乳猪🐷</ng-template>Tab4 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsCustomTitleComponent {}

@Component({
    selector: 'test-tabs-extra',
    template: `
        <thy-tabs [thyExtra]="extraTemplate">
            <thy-tab id="tab1" thyTitle="Tab1"> Tab1 Content </thy-tab>
            <thy-tab id="tab2" thyTitle="Tab2">Tab2 Content</thy-tab>
            <thy-tab id="tab3" thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>

        <ng-template #extraTemplate>
            <button thyButton="outline-default" thySize="md">Extra Action</button>
        </ng-template>
    `
})
class TestTabsExtraComponent {}

@Component({
    selector: 'test-tabs-position',
    template: `
        <thy-tabs [thyPosition]="position">
            <thy-tab thyTitle="Tab1">Tab1 Content</thy-tab>
            <thy-tab thyTitle="Tab2">Tab2 Content</thy-tab>
            <thy-tab thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsPositionComponent {
    position: ThyTabsPosition;
}

@Component({
    selector: 'test-tabs-active',
    template: `
        <thy-tabs [thyActiveTab]="activeTab" [thyAnimated]="thyAnimated">
            <thy-tab id="tab1" thyTitle="Tab1"> Tab1 Content </thy-tab>
            <thy-tab id="tab2" thyTitle="Tab2">Tab2 Content</thy-tab>
            <thy-tab id="tab3" thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsActiveComponent {
    activeTab: ThyActiveTabInfo = 'tab2';
    thyAnimated = false;
}

@Component({
    selector: 'test-tabs-dynamic-add',
    template: `
        <button class="mb-2" thyButton="outline-default" (click)="addTab()">添加</button>
        
        <thy-tabs [thyActiveTab]="activeTab" [thyAnimated]="thyAnimated">
          @for (tab of tabs; track trackByFn(i, tab); let i = $index) {
            <thy-tab [id]="tab.id" [thyTitle]="tab.title">Tab{{ i + 1 }} Content</thy-tab>
          }
        </thy-tabs>
        `
})
class TestTabsDynamicAddComponent {
    tabs = [
        { id: 'tab1', title: 'Tab1' },
        { id: 'tab2', title: 'Tab2' },
        { id: 'tab3', title: 'Tab3' }
    ];

    activeTab = 'tab1';
    thyAnimated = false;

    addTab() {
        this.tabs.push({ id: `tab${this.tabs.length + 1}`, title: `Tab${this.tabs.length + 1}` });
        this.activeTab = this.tabs[this.tabs.length - 1].id;
    }

    trackByFn(index: number, item: string) {
        return item;
    }
}

@Component({
    selector: 'test-tabs-disabled',
    template: `
        <thy-tabs (thyActiveTabChange)="activeTabChange($event)">
            <thy-tab thyTitle="Tab1">Tab1 Content</thy-tab>
            <thy-tab thyTitle="Tab2" thyDisabled="true">Tab2 Content</thy-tab>
            <thy-tab thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsDisabledComponent {
    activeTabChange(event: ThyTabActiveEvent) {}
}

@Component({
    selector: 'test-tabs-animated',
    template: `
        <thy-tabs #tabs [thyAnimated]="true">
            <thy-tab thyTitle="Tab1">Tab1 Content</thy-tab>
            <thy-tab thyTitle="Tab2">Tab2 Content</thy-tab>
            <thy-tab thyTitle="Tab3">Tab3 Content</thy-tab>
        </thy-tabs>
    `
})
class TestTabsAnimatedComponent {
    @ViewChild('tabs', { static: true }) tabComponent: ElementRef<ThyTabs>;
}

describe('tabs', () => {
    describe('basic', () => {
        let fixture: ComponentFixture<TestTabsBasicComponent>;
        let tabsDebugElement: DebugElement;
        let tabsElement: HTMLElement;
        let tabsInstance: ThyTabs;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsBasicComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsBasicComponent);
            tabsDebugElement = getDebugElement(fixture, ThyTabs);
            tabsElement = tabsDebugElement.nativeElement;
            tabsInstance = tabsDebugElement.componentInstance;
            fixture.detectChanges();
        });

        it('should create tabs successfully', () => {
            expect(tabsElement).toBeTruthy();

            expect(tabsElement.classList.contains('thy-tabs')).toBeTruthy();
            expect(tabsInstance.tabs.length).toBe(3);
        });

        it('should emit correct data when change active tab', () => {
            const activeTabChangeSpy = spyOn(fixture.debugElement.componentInstance, 'activeTabChange');
            const tabElement = document.querySelectorAll('.thy-nav-item')[1];
            dispatchFakeEvent(tabElement, 'click');
            fixture.detectChanges();
            expect(activeTabChangeSpy).toHaveBeenCalledWith('tab2');
        });
    });

    describe('thyType', () => {
        let fixture: ComponentFixture<TestTabsTypeComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsTypeComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsTypeComponent);
            fixture.detectChanges();
        });

        it('should set thyType successfully', fakeAsync(() => {
            ['pulled', 'tabs', 'pills', 'lite'].forEach(type => {
                fixture.debugElement.componentInstance.type = type;
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                const navElement = getDebugElement(fixture, ThyNav).nativeElement;
                expect(navElement.classList.contains(`thy-nav-${type}`)).toBeTruthy();
            });
        }));
    });

    describe('thySize', () => {
        let fixture: ComponentFixture<TestTabsSizeComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsSizeComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsSizeComponent);
            fixture.detectChanges();
        });

        it('should set thySize successfully', fakeAsync(() => {
            ['lg', 'md', 'sm'].forEach(size => {
                fixture.debugElement.componentInstance.size = size;
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                const tabsElement = getDebugElement(fixture, ThyNav).nativeElement;
                expect(tabsElement.classList.contains(`thy-nav-${size}`)).toBeTruthy();
            });
        }));
    });

    describe('custom title template', () => {
        let fixture: ComponentFixture<TestTabsCustomTitleComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsCustomTitleComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsCustomTitleComponent);
            fixture.detectChanges();
        });

        it('should support set custom title', () => {
            const tabElement = getDebugElement(fixture, '.thy-nav-item').nativeElement;
            expect(tabElement.innerText).toEqual('小龙虾🦞');
        });
    });

    describe('thyExtra', () => {
        let fixture: ComponentFixture<TestTabsExtraComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsExtraComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsExtraComponent);
            fixture.detectChanges();
        });

        it('should set thyExtra successfully', () => {
            const extraDebugElement = getDebugElement(fixture, '.thy-nav-extra');
            expect(extraDebugElement).toBeTruthy();
            const extraElement = extraDebugElement.nativeElement;
            expect(extraElement.querySelector('button')).toBeTruthy();
        });
    });

    describe('thyPosition', () => {
        let fixture: ComponentFixture<TestTabsPositionComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsPositionComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsPositionComponent);
            fixture.detectChanges();
        });

        it('should set thyPosition successfully', fakeAsync(() => {
            fixture.debugElement.componentInstance.position = 'top';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(getTabsClassList().contains(`thy-tabs-top`)).toBeTruthy();

            fixture.debugElement.componentInstance.position = 'left';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(getTabsClassList().contains(`thy-tabs-left`)).toBeTruthy();
        }));

        function getTabsClassList() {
            return fixture.debugElement.query(By.directive(ThyTabs)).nativeElement.classList;
        }
    });

    describe('thyActiveTab', () => {
        let fixture: ComponentFixture<TestTabsActiveComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsActiveComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsActiveComponent);
            fixture.detectChanges();
        });

        it('should show right active tab when use activeTabId identifier', () => {
            const activeTab = fixture.debugElement.queryAll(By.css('.thy-nav-item.active'));
            const activeTabContents = fixture.debugElement.queryAll(By.css('.thy-tab-content'));
            expect(activeTab.length).toBe(1);

            const activeContent = activeTabContents.filter(item => item.styles.display !== 'none');
            expect(activeContent.length).toBe(1);
        });

        it('should set thyActiveTab successfully when reset activeTab', () => {
            const tabContent = fixture.debugElement.nativeNode.querySelector('.thy-tabs-content');
            const tabElement = tabContent.querySelectorAll('.thy-tab-content')[1];
            expect(tabElement.getAttribute('tabindex')).toEqual('0');
        });

        it('should set thyActiveTab successfully when thyActiveTab type is number', () => {
            fixture.debugElement.componentInstance.activeTab = 1;
            fixture.detectChanges();
            const tabsInstance = getDebugElement(fixture, ThyTabs).componentInstance;
            expect(tabsInstance.activeTabIndex).toEqual(1);
        });

        it('should set thyActiveTab successfully when thyAnimated', () => {
            fixture.debugElement.componentInstance.thyAnimated = true;
            fixture.detectChanges();
            const tabContent = fixture.debugElement.nativeNode.querySelector('.thy-tabs-content');
            const tabElement = tabContent.querySelectorAll('.thy-tab-content')[1];
            expect(tabElement.getAttribute('tabindex')).toEqual('0');
        });
    });

    describe('add tab dynamically', () => {
        let fixture: ComponentFixture<TestTabsDynamicAddComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsDynamicAddComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsDynamicAddComponent);
            fixture.detectChanges();
        });

        it('should support add tab dynamically', fakeAsync(() => {
            const tabsInstance = getDebugElement(fixture, ThyTabs).componentInstance;
            expect(tabsInstance.tabs.length).toBe(3);

            fixture.debugElement.componentInstance.addTab();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(tabsInstance.tabs.length).toBe(4);
        }));

        it('should set thyActiveTab successfully when add tab', fakeAsync(() => {
            const tabsInstance = getDebugElement(fixture, ThyTabs).componentInstance;
            expect(tabsInstance.tabs.length).toBe(3);

            fixture.debugElement.componentInstance.addTab();
            fixture.detectChanges();
            tick();
            expect(tabsInstance.tabs.length).toBe(4);

            const tabContent = fixture.debugElement.nativeNode.querySelector('.thy-tabs-content');
            expect(!tabContent.style.marginLeft).toBeTruthy();

            const tabElement = tabContent.querySelectorAll('.thy-tab-content')[3];
            expect(tabElement.getAttribute('tabindex')).toEqual('0');
        }));

        it('should set thyActiveTab successfully when add tab and thyAnimated', fakeAsync(() => {
            const tabsInstance = getDebugElement(fixture, ThyTabs).componentInstance;
            expect(tabsInstance.tabs.length).toBe(3);

            fixture.debugElement.componentInstance.addTab();
            fixture.debugElement.componentInstance.thyAnimated = true;
            fixture.detectChanges();
            tick();
            expect(tabsInstance.tabs.length).toBe(4);

            const tabContent = fixture.debugElement.nativeNode.querySelector('.thy-tabs-content');
            expect(tabContent.style.marginLeft === '-300%').toBeTruthy();

            const tabElement = tabContent.querySelectorAll('.thy-tab-content')[3];
            expect(tabElement.getAttribute('tabindex')).toEqual('0');
        }));
    });

    describe('thyDisabled', () => {
        let fixture: ComponentFixture<TestTabsDisabledComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsDisabledComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsDisabledComponent);
            fixture.detectChanges();
        });

        it('should set thyDisabled successfully', fakeAsync(() => {
            const spy = jasmine.createSpy('spy on tab click');
            const tabsInstance = getDebugElement(fixture, ThyTabs).componentInstance;
            tabsInstance.thyActiveTabChange.subscribe((event: ThyTabActiveEvent) => {
                spy();
            });
            const tabElement = fixture.debugElement.queryAll(By.css('.thy-nav-item'))[1].nativeElement;
            dispatchFakeEvent(tabElement, 'click');
            fixture.detectChanges();
            expect(spy).not.toHaveBeenCalled();
        }));
    });

    describe('thyAnimated', () => {
        let fixture: ComponentFixture<TestTabsAnimatedComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestTabsAnimatedComponent],
                imports: [ThyTabsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestTabsAnimatedComponent);
            // tabsInstance = getDebugElement(fixture, ThyTabsComponent).componentInstance;
            fixture.detectChanges();
        });

        it('should set animated successfully when thyAnimated was true', fakeAsync(() => {
            expect(document.querySelector('.thy-tabs-content-animated')).toBeTruthy();
            const tabContent = fixture.debugElement.nativeNode.querySelector('.thy-tabs-content');
            expect(tabContent.style.marginLeft === '0%').toBeTruthy();
            const tabElement = document.querySelectorAll('.thy-nav-item')[1];
            dispatchFakeEvent(tabElement, 'click');
            fixture.detectChanges();
            expect(tabContent.style.marginLeft === '-100%').toBeTruthy();
        }));

        it('should remove overflow:hidden when transitioning', fakeAsync(() => {
            const header = fixture.debugElement.nativeNode.querySelector('thy-tabs');
            const content = header.querySelector('.thy-tabs-content');
            const tabElement = document.querySelectorAll('.thy-nav-item')[1];
            dispatchFakeEvent(tabElement, 'click');
            fixture.detectChanges();
            expect(header.style.overflow === 'hidden').toBeTruthy();

            content.dispatchEvent(createFakeEvent('transitionend'));
            fixture.detectChanges();
            expect(header.style.overflow === '').toBeTruthy();
        }));
    });

    function getDebugElement(fixture: ComponentFixture<SafeAny>, selector: string | ComponentType<SafeAny>): DebugElement {
        if (typeof selector === 'string') {
            return fixture.debugElement.query(By.css(selector));
        } else {
            return fixture.debugElement.query(By.directive(selector));
        }
    }
});

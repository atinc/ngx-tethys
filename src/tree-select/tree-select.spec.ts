import {
    TestBed,
    async,
    ComponentFixture,
    fakeAsync,
    tick,
    inject,
    flush,
    discardPeriodicTasks
} from '@angular/core/testing';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ThyTreeSelectModule } from './module';
import { By } from '@angular/platform-browser';
import { UpdateHostClassService } from '../shared';
import { ThyPositioningService } from '../positioning/positioning.service';
import { OverlayContainer, ViewportRuler } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { ThyFormModule } from '../form';
import { dispatchFakeEvent, dispatchKeyboardEvent } from '../core/testing/dispatcher-events';
import { TAB, ESCAPE } from '../util/keycodes';
import { typeInElement } from '../core/testing';
import { ThyTreeSelectComponent } from './tree-select.component';

describe('ThyTreeSelect', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let platform: Platform;

    function configureThyCustomSelectTestingModule(declarations: any[]) {
        TestBed.configureTestingModule({
            imports: [ThyFormModule, ThyTreeSelectModule, ReactiveFormsModule, FormsModule],
            declarations: declarations,
            providers: [UpdateHostClassService, ThyPositioningService]
        }).compileComponents();

        inject([OverlayContainer, Platform], (oc: OverlayContainer, p: Platform) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
            platform = p;
        })();
    }

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    describe('core', () => {
        describe('with thyPlaceHolder', () => {
            beforeEach(async(() => {
                configureThyCustomSelectTestingModule([PlaceHolderTreeSelectComponent]);
            }));
            it('should show default placeholder', fakeAsync(() => {
                const fixture = TestBed.createComponent(PlaceHolderTreeSelectComponent);
                fixture.detectChanges();

                const treeSelectShowNode = fixture.debugElement.query(By.css('.thy-tree-select-selection-text'))
                    .nativeElement;
                expect(treeSelectShowNode.textContent).toContain('this is a placeholder');
            }));
            it('should show default placeholder with multiple', fakeAsync(() => {
                const fixture = TestBed.createComponent(PlaceHolderTreeSelectComponent);
                fixture.componentInstance.multiple = true;
                fixture.componentInstance.thyPlaceholder = 'this is a multiple placeholder';
                fixture.detectChanges();

                const placeholderWrapper = fixture.debugElement.query(By.css('.text-placeholder')).nativeElement;
                expect(placeholderWrapper.textContent).toContain('this is a multiple placeholder');
            }));
        });

        describe('select logic', () => {
            beforeEach(async(() => {
                configureThyCustomSelectTestingModule([BasicTreeSelectComponent]);
            }));
            it('should select item with multiple when item is clicked', fakeAsync(() => {
                const fixture = TestBed.createComponent(BasicTreeSelectComponent);
                fixture.detectChanges();
                const trigger = fixture.debugElement.query(By.css('.form-control-custom')).nativeElement;
                trigger.click();
                fixture.detectChanges();
                flush();

                const optionNodes: NodeListOf<HTMLElement> = overlayContainerElement.querySelectorAll('a');

                optionNodes[1].click();
                fixture.detectChanges();
                flush();

                const multipleWrapper = fixture.debugElement.query(By.css('.multiple-value-wrapper')).nativeElement;
                expect(multipleWrapper.textContent).toContain('root2');
            }));
        });
    });

    describe('with ngModel', () => {
        beforeEach(async(() => configureThyCustomSelectTestingModule([NgModelTreeSelectComponent])));
        it('show selected text when set ngModel ', fakeAsync(() => {
            const fixture = TestBed.createComponent(NgModelTreeSelectComponent);
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNode).toBe(null);
            const treeSelectShowNode = fixture.debugElement.query(By.css('.thy-tree-select-selection-text'))
                .nativeElement;

            fixture.componentInstance.objSelectedValue =
                fixture.componentInstance.nodes[fixture.componentInstance.nodes.length - 1];
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNode).toBe(
                fixture.componentInstance.nodes[fixture.componentInstance.nodes.length - 1]
            );
            expect(treeSelectShowNode.textContent).toContain('root6');
        }));

        it('show selected text with multiple when set ngModel ', fakeAsync(() => {
            const fixture = TestBed.createComponent(NgModelTreeSelectComponent);
            fixture.componentInstance.multiple = true;
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNodes.length).toBe(0);

            fixture.componentInstance.objSelectedValue = fixture.componentInstance.nodes.slice(
                fixture.componentInstance.nodes.length - 2,
                fixture.componentInstance.nodes.length
            );
            fixture.detectChanges();
            flush();
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNodes.length).toBe(2);
            const multipleWrapper = fixture.debugElement.query(By.css('.multiple-value-wrapper')).nativeElement;
            expect(multipleWrapper.textContent).toContain('root5');
            expect(multipleWrapper.textContent).toContain('root6');
        }));
    });
});

@Component({
    selector: 'basic-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                thyPrimaryKey="key"
                [thyMultiple]="multiple"
                [thyPlaceholder]="thyPlaceholder"
                thyShowKey="title"
            ></thy-tree-select>
        </div>
    `
})
class BasicTreeSelectComponent {
    nodes = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: [
                {
                    key: '0101',
                    title: 'child1',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '010101',
                            title: 'child11',
                            disabled: 'true',
                            level: 2,
                            icon: 'wtf wtf-file-text',
                            children: []
                        }
                    ]
                },
                {
                    key: '0102',
                    title: 'child2',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: []
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '03',
            title: 'root3',
            hidden: true,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '04',
            title: 'root4',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '05',
            title: 'root5',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '06',
            title: 'root6',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        }
    ];

    objSelectedValue = null;

    multiple = true;

    thyPlaceholder = '';

    @ViewChild('treeSelect')
    treeSelect: ThyTreeSelectComponent;
}

@Component({
    selector: 'placeholder-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                thyPrimaryKey="key"
                [thyMultiple]="multiple"
                [thyPlaceholder]="thyPlaceholder"
                thyShowKey="title"
            ></thy-tree-select>
        </div>
    `
})
class PlaceHolderTreeSelectComponent {
    nodes = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: [
                {
                    key: '0101',
                    title: 'child1',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '010101',
                            title: 'child11',
                            disabled: 'true',
                            level: 2,
                            icon: 'wtf wtf-file-text',
                            children: []
                        }
                    ]
                },
                {
                    key: '0102',
                    title: 'child2',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: []
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '03',
            title: 'root3',
            hidden: true,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '04',
            title: 'root4',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '05',
            title: 'root5',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '06',
            title: 'root6',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        }
    ];

    objSelectedValue = null;

    multiple = false;

    thyPlaceholder = 'this is a placeholder';

    @ViewChild('treeSelect')
    treeSelect: ThyTreeSelectComponent;
}

@Component({
    selector: 'ng-model-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                [(ngModel)]="objSelectedValue"
                thyPrimaryKey="key"
                thyShowKey="title"
                [thyMultiple]="multiple"
            ></thy-tree-select>
        </div>
    `
})
class NgModelTreeSelectComponent {
    nodes = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: [
                {
                    key: '0101',
                    title: 'child1',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '010101',
                            title: 'child11',
                            disabled: 'true',
                            level: 2,
                            icon: 'wtf wtf-file-text',
                            children: []
                        }
                    ]
                },
                {
                    key: '0102',
                    title: 'child2',
                    level: 1,
                    icon: 'wtf wtf-file-text',
                    children: []
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '03',
            title: 'root3',
            hidden: true,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '04',
            title: 'root4',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '05',
            title: 'root5',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        },
        {
            key: '06',
            title: 'root6',
            hidden: false,
            level: 0,
            icon: 'wtf wtf-drive-o',
            children: []
        }
    ];
    objSelectedValue = null;

    multiple = false;

    @ViewChild('treeSelect')
    treeSelect: ThyTreeSelectComponent;
}

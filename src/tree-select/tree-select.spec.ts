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

    describe('with ngModel', () => {
        beforeEach(async(() => configureThyCustomSelectTestingModule([NgModelTreeSelectComponent])));
        it('selected node when assign node to noModel ', fakeAsync(() => {
            const fixture = TestBed.createComponent(NgModelTreeSelectComponent);
            fixture.detectChanges();

            expect(fixture.componentInstance.treeSelect.selectedNode).toBe(undefined);
            const treeSelectShowNode = fixture.debugElement.query(By.css('.thy-tree-select-selection-text'))
                .nativeElement;
            expect(treeSelectShowNode.textContent).toContain('请选择值');

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
    });
});

@Component({
    selector: 'ng-model-tree-select',
    template: `
        <div>
            <thy-tree-select
                #treeSelect
                [thyTreeNodes]="nodes"
                [(ngModel)]="objSelectedValue"
                thyPrimaryKey="key"
                thyPlaceholder="请选择值"
                thyShowKey="title"
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
    objSelectedValue = {
        key: ''
    };

    @ViewChild('treeSelect')
    treeSelect: ThyTreeSelectComponent;
}

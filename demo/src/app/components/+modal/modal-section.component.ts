import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ThyModalService } from '../../../../../src/modal/modal.service';
import { DemoModalContentComponent } from './modal.content.component';
import { taskTypes } from '../+select/mock-data';

@Component({
    selector: 'demo-modal-section',
    templateUrl: './modal-section.component.html'
})
export class DemoModalSectionComponent implements OnInit {

    modalRef: BsModalRef;

    message: string[] = [];

    shipId;

    public saving;


    optionData = [];

    selectedItem = this.optionData[0];

    // public apiParameters = [{
    //     property: 'thySrc',
    //     description: '头像路径地址, 默认为全路径，如果不是全路径，可以通过自定义服务 ThyAvatarService，重写 avatarSrcTransform 方法实现转换',
    //     type: 'string',
    //     default: ''
    // }, {
    //     property: 'thyName',
    //     description: '人员名称',
    //     type: 'string',
    //     default: ''
    // }, {
    //     property: 'thyShowName',
    //     description: '是否展示人员名称',
    //     type: 'Boolean',
    //     default: 'false'
    // }, {
    //     property: 'thyShowRemove',
    //     description: '是否展示移除按钮',
    //     type: 'Boolean',
    //     default: 'false'
    // }, {
    //     property: 'thyOnRemove',
    //     description: '移除按钮的事件, 当 thyShowRemove 为 true 时起作用',
    //     type: 'Event',
    //     default: ''
    // }, {
    //     property: 'thySize',
    //     description: '头像大小，可选择  22, 24, 30, 38, 48, 68, 110, 160, sm: 30px, xs: 24px lg: 48',
    //     type: 'Number | String',
    //     default: '38'
    // }];

    constructor(
        public modalService: ThyModalService
    ) {
        this.optionData = taskTypes;
     }

    ngOnInit() {

    }

    addModal(template: TemplateRef<any>, option: object): void {
        this.saving = false;
        this.message = [];
        // this.modalService.onShow.subscribe((reason: string) => {
        //     this.message.push('onShow');
        // });
        // this.modalService.onShown.subscribe(() => {
        //     this.message.push('onShown');
        // });
        // this.modalService.onHide.subscribe(() => {
        //     this.message.push('onHide');
        // });
        // this.modalService.onHidden.subscribe(() => {
        //     this.message.push('onHidden');
        // });
        this.modalRef = this.modalService.show(template, option);
    }

    openModalComponent() {
        this.modalRef = this.modalService.show(DemoModalContentComponent, {
            initialState: {
                list: [
                    'Open a modal with component',
                    'Pass your data',
                    'Do something else',
                    '...'
                ],
                title: 'Modal with component'
            }
        });
    }

    save() {
        this.saving = true;
    }

    cancel() {
        this.modalService.close();
    }

    hideModal() {
        this.modalService.close();
    }

    closeModal() {
        this.modalRef.hide();
    }

}

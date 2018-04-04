import { Injectable, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
    modalConfigDefaults,
    ModalOptions
} from 'ngx-bootstrap/modal/modal-options.class';

@Injectable()
export class ThyModalService implements OnInit {

    private modalConfig: ModalOptions;

    constructor(private modalService: BsModalService) { }

    ngOnInit() { }

    show(template: TemplateRef<any>, config?: ThyModalConfigInfo): BsModalRef {
        this.setModalConfig(config);
        return this.modalService.show(template, this.modalConfig);
    }

    private setModalConfig(config: ThyModalConfigInfo) {
        this.modalConfig = Object.assign({}, modalConfigDefaults, config);
        if (config && config.size) {
            this.modalConfig.class = `modal-${config.size}`;
        }
    }
}


class ThyModalConfigInfo {
    size?: string;
    backdrop?: string | boolean; // true || false || 'static'
    keyboard?: boolean;
    animated?: boolean;
    ignoreBackdropClick?: boolean;
    initialState?: object;
    show?: boolean;  // Shows the modal when initialized.
}

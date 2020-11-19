import { Injectable, TemplateRef, RendererFactory2, EventEmitter, Optional, Inject } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions, MODAL_CONFIG_DEFAULT_OVERRIDE } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { warnDeprecation } from '../core/logger';

const modalConfigDefaults = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    animated: true,
    initialState: {}
};

@Injectable()
export class ThyModalService extends BsModalService {
    onShow: EventEmitter<any> = new EventEmitter();
    onShown: EventEmitter<any> = new EventEmitter();
    onHide: EventEmitter<any> = new EventEmitter();
    onHidden: EventEmitter<any> = new EventEmitter();

    private modalConfig: ModalOptions;
    private bsModalRefs: BsModalRef[] = [];

    constructor(
        private modalService: BsModalService,
        rendererFactory: RendererFactory2,
        clf: ComponentLoaderFactory,
        @Optional() @Inject(MODAL_CONFIG_DEFAULT_OVERRIDE) modalDefaultOption: ModalOptions
    ) {
        super(rendererFactory, clf, modalDefaultOption);
        this.modalService.onHidden.subscribe(() => {
            if (this.bsModalRefs.length > 0) {
                this.bsModalRefs.splice(this.bsModalRefs.length - 1, 1);
            }
        });
    }

    /**
     * @deprecated The ThyModal will be deprecated, please use ThyDialog.
     */
    show(content: string | TemplateRef<any> | any, config?: ThyModalConfigInfo): BsModalRef {
        warnDeprecation(`The ThyModal will be deprecated, please use ThyDialog.`);

        this.setModalConfig(config);
        const bsModalRef = this.modalService.show(content, this.modalConfig);
        this.bsModalRefs.push(bsModalRef);
        return bsModalRef;
    }

    close() {
        if (this.bsModalRefs.length > 0) {
            this.bsModalRefs[this.bsModalRefs.length - 1].hide();
        }
    }

    private setModalConfig(config: ThyModalConfigInfo) {
        this.modalConfig = Object.assign({}, modalConfigDefaults, config);
        if (config && config.size) {
            this.modalConfig.class = `modal-${config.size}`;
        }
    }
}

export class ThyModalConfigInfo {
    size?: string; // 默认md大小，'blg','lg','mg','sm'
    backdrop?: string | boolean; // true || false || 'static'
    keyboard?: boolean;
    animated?: boolean;
    ignoreBackdropClick?: boolean;
    initialState?: object;
    class?: string;
    show?: boolean; // Shows the modal when initialized.
}

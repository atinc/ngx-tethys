import {
    Injectable,
    TemplateRef,
    ViewContainerRef,
    Injector,
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Inject,
    Optional
} from '@angular/core';
import { CONTAINER_PLACEMENT, NotifyPlacement, ThyNotifyOption, THY_NOTIFY_DEFAULT_OPTIONS } from './notify-option.interface';
import { ThyNotifyContainerComponent } from './notify.container.component';
import { Subject } from 'rxjs';
import { DomPortalOutlet, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { NotifyQueueStore } from './notify-queue.store';

const NOTIFY_OPTION_DEFAULT = {
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8,
    placement: 'topRight'
};

@Injectable()
export class ThyNotifyService {
    notifyQueue$: Subject<any> = new Subject();

    private _lastNotifyId = 0;

    private containerRefTopRight: ComponentRef<ThyNotifyContainerComponent>;

    private containerRefBottomRight: ComponentRef<ThyNotifyContainerComponent>;

    private containerRefBottomLeft: ComponentRef<ThyNotifyContainerComponent>;

    private containerRefTopLeft: ComponentRef<ThyNotifyContainerComponent>;

    constructor(
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private queueStore: NotifyQueueStore,
        @Inject(THY_NOTIFY_DEFAULT_OPTIONS) private defaultConfig: ThyNotifyOption
    ) {}

    show(option: ThyNotifyOption) {
        const notifyConfig = this._formatOption(option);
        const { placement } = notifyConfig;
        this.queueStore.addNotify(placement, notifyConfig);
        this._initContainer(placement);
    }

    success(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'success',
            title: title || '成功',
            content: content,
            detail: detail
        });
    }

    info(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'info',
            title: title || '提示',
            content: content,
            detail: detail
        });
    }

    warning(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'warning',
            title: title || '警告',
            content: content,
            detail: detail
        });
    }

    error(title?: string, content?: string, detail?: string) {
        this.show({
            type: 'error',
            title: title || '错误',
            content: content,
            detail: detail
        });
    }

    private _initContainer(placement: NotifyPlacement) {
        if (placement === 'topRight') {
            this.containerRefTopRight = this._loadNotifyContainerComponent(this.containerRefTopRight, placement);
        } else if (placement === 'bottomRight') {
            this.containerRefBottomRight = this._loadNotifyContainerComponent(this.containerRefBottomRight, placement);
        } else if (placement === 'bottomLeft') {
            this.containerRefBottomLeft = this._loadNotifyContainerComponent(this.containerRefBottomLeft, placement);
        } else if (placement === 'topLeft') {
            this.containerRefTopLeft = this._loadNotifyContainerComponent(this.containerRefTopLeft, placement);
        }
    }

    private _loadNotifyContainerComponent(
        containerRef: ComponentRef<ThyNotifyContainerComponent>,
        placement: NotifyPlacement
    ): ComponentRef<ThyNotifyContainerComponent> {
        if (!containerRef) {
            const portalOutlet = new DomPortalOutlet(document.body, this.componentFactoryResolver, this.appRef, this.injector);
            const componentPortal = new ComponentPortal(ThyNotifyContainerComponent, null);
            containerRef = portalOutlet.attachComponentPortal(componentPortal);
            Object.assign(containerRef.instance, {
                initialState: {
                    placement
                }
            });
            containerRef.changeDetectorRef.detectChanges();
        }
        return containerRef;
    }

    private _formatOption(option: ThyNotifyOption) {
        return Object.assign({}, NOTIFY_OPTION_DEFAULT, { id: this._lastNotifyId++ }, this.defaultConfig, option);
    }
}

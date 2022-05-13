import { FunctionProp, helpers, isFunction } from 'ngx-tethys/util';
import { of, Subject } from 'rxjs';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Inject,
    Injectable,
    Injector,
    OnDestroy,
    StaticProvider
} from '@angular/core';
// import { NotifyPlacement, THY_NOTIFY_DEFAULT_OPTIONS, ThyNotifyOptions } from './notify-option.interface';
import { NotifyQueueStore } from './notify-queue.store';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { NotifyPlacement, ThyNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG, THY_NOTIFY_DEFAULT_CONFIG_VALUE } from './notify.config';
import { notifyAbstractOverlayOptions } from './notify.options';
import {
    GlobalPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayContainer,
    OverlayRef,
    PositionStrategy,
    ScrollStrategy
} from '@angular/cdk/overlay';
import { ComponentTypeOrTemplateRef, POSITION_MAP, ThyAbstractOverlayRef, ThyAbstractOverlayService } from 'ngx-tethys/core';
import { ThyInternalNotifyRef, ThyNotifyRef } from './notify-ref';
import { Directionality } from '@angular/cdk/bidi';
import { ThyNotifyComponent } from './notify.component';
import { ThyNotifyContentComponent } from './notify-content.component';

const NOTIFY_OPTION_DEFAULT = {
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8,
    placement: 'topRight'
};

@Injectable({
    providedIn: 'root'
})
export class ThyNotifyService extends ThyAbstractOverlayService<ThyNotifyConfig, ThyNotifyContainerComponent> implements OnDestroy {
    notifyQueue$: Subject<any> = new Subject();
    private readonly ngUnsubscribe$ = new Subject();

    private _lastNotifyId = 0;

    private containerRefTopRight: ComponentRef<ThyNotifyContainerComponent>;

    private containerRefBottomRight: ComponentRef<ThyNotifyContainerComponent>;

    private containerRefBottomLeft: ComponentRef<ThyNotifyContainerComponent>;

    private containerRefTopLeft: ComponentRef<ThyNotifyContainerComponent>;

    private containerRef: ComponentRef<ThyNotifyContainerComponent>;

    private notifyRef: any;

    protected buildOverlayConfig(config: ThyNotifyConfig): OverlayConfig {
        const positionStrategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = positionStrategy;
        overlayConfig.scrollStrategy = this.buildScrollStrategy(config);
        return overlayConfig;
    }

    private buildPositionStrategy<TData>(config: ThyNotifyConfig<TData>): PositionStrategy {
        const placement = config.placement;
        const positionStrategy = new GlobalPositionStrategy();
        const positionPair = POSITION_MAP[placement];
        positionStrategy[positionPair.originY](config.offset);
        if (config.placement.endsWith('Left')) {
            positionStrategy.left(config.offset);
        } else if (placement.endsWith('Right')) {
            positionStrategy.right(config.offset);
        }
        return positionStrategy;
    }

    private buildScrollStrategy(config: ThyNotifyConfig): ScrollStrategy {
        if (config.scrollStrategy) {
            return config.scrollStrategy;
        } else if (this.scrollStrategy && isFunction(this.scrollStrategy)) {
            return this.scrollStrategy();
        } else {
            this.overlay.scrollStrategies.block();
        }
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyNotifyConfig<any>): ThyNotifyContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyNotifyConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyNotifyContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyNotifyContainerComponent>(containerPortal);
        console.log('containerRef', containerRef);
        console.log('containerRef.instance', containerRef.instance);
        return containerRef.instance;
    }

    protected createAbstractOverlayRef<T, TResult = unknown>(
        overlayRef: OverlayRef,
        containerInstance: ThyNotifyContainerComponent,
        config: ThyNotifyConfig
    ): ThyAbstractOverlayRef<T, ThyNotifyContainerComponent, TResult> {
        return new ThyInternalNotifyRef(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThyNotifyConfig,
        notifyRef: ThyNotifyRef<T>,
        notifyContainer: ThyNotifyContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThyNotifyContainerComponent, useValue: notifyContainer },
            {
                provide: ThyNotifyRef,
                useValue: notifyRef
            }
        ];

        if (config.direction && (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
            injectionTokens.push({
                provide: Directionality,
                useValue: {
                    value: config.direction,
                    change: of()
                }
            });
        }

        return Injector.create({ parent: userInjector || this.injector, providers: injectionTokens });
    }

    constructor(
        protected overlay: Overlay,
        public overlayContainer: OverlayContainer,
        protected injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private queueStore: NotifyQueueStore,
        @Inject(THY_NOTIFY_DEFAULT_CONFIG) protected defaultConfig: ThyNotifyConfig
    ) {
        super(notifyAbstractOverlayOptions, overlay, injector, {
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...defaultConfig
        });
        console.log('notify service constructor !!!!');
    }

    open<T, TData = unknown, TResult = unknown>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: ThyNotifyConfig<TData>
    ): ThyNotifyRef<T, TResult> {
        console.log('config', config);
        const notifyRef = this.openOverlay(componentOrTemplateRef, config);
        return notifyRef as ThyNotifyRef<T, TResult>;
    }

    show(config: ThyNotifyConfig) {
        const notifyConfig = this.formatOptions(config);
        const { placement } = notifyConfig;
        this.queueStore.addNotify(placement, notifyConfig);
        const configs = this.queueStore.getState().notifyQueue;
        // this._initContainer(placement);
        console.log('this.overlayContainer', this.overlayContainer);

        console.log('this.overlayContainer', this.overlayContainer.getContainerElement());
        if (!this.notifyRef) {
            this.open(ThyNotifyContentComponent, {
                ...notifyConfig,
                initialState: {
                    placement
                }
            });
        }
    }

    success(title?: string, content?: string, options?: ThyNotifyConfig) {
        this.show({
            ...(options || {}),
            type: 'success',
            title: title || options?.title || '成功',
            content: content || options?.content
        });
    }

    info(title?: string, content?: string, options?: ThyNotifyConfig) {
        this.show({
            ...(options || {}),
            type: 'info',
            title: title || options?.title || '提示',
            content: content || options?.content
        });
    }

    warning(title?: string, content?: string, options?: ThyNotifyConfig) {
        this.show({
            ...(options || {}),
            type: 'warning',
            title: title || options?.title || '警告',
            content: content || options?.content
        });
    }

    error(title?: string, content?: string, options?: ThyNotifyConfig | string) {
        const config: ThyNotifyConfig = helpers.isString(options)
            ? { type: 'error', title: title || '错误', content: content, detail: options }
            : {
                  ...((options || {}) as ThyNotifyConfig),
                  type: 'error',
                  title: title || (options as ThyNotifyConfig)?.title || '错误',
                  content: content || (options as ThyNotifyConfig)?.content
              };
        this.show(config);
    }

    removeNotifyById(id: string) {
        this.queueStore.removeNotify(id);
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
        } else {
            this.containerRef = this._loadNotifyContainerComponent(this.containerRef, placement);
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

    private formatOptions(options: ThyNotifyConfig) {
        if (helpers.isString(options.detail)) {
            options = { ...options, detail: { link: '[详情]', content: options.detail as string } };
        }
        return Object.assign({}, NOTIFY_OPTION_DEFAULT, { id: this._lastNotifyId++ }, this.defaultConfig, options);
    }

    ngOnDestroy(): void {
        this.dispose();
    }
}

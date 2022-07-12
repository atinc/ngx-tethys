import { isFunction, isString } from 'ngx-tethys/util';
import { of, Subject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Inject, Injectable, Injector, OnDestroy, StaticProvider } from '@angular/core';
import { NotifyQueueStore } from './notify-queue.store';
import { ThyNotifyContainerComponent } from './notify-container.component';
import { NotifyPlacement, ThyNotifyConfig, THY_NOTIFY_DEFAULT_CONFIG_VALUE, THY_NOTIFY_DEFAULT_OPTIONS } from './notify.config';
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
import { ThyNotifyContentComponent } from './notify-content.component';

@Injectable({
    providedIn: 'root'
})
export class ThyNotifyService extends ThyAbstractOverlayService<ThyNotifyConfig, ThyNotifyContainerComponent> implements OnDestroy {
    notifyQueue$: Subject<any> = new Subject();

    private _lastNotifyId = 0;

    private containerRefTopRight: ThyNotifyRef<ThyNotifyContentComponent>;

    private containerRefBottomRight: ThyNotifyRef<ThyNotifyContentComponent>;

    private containerRefBottomLeft: ThyNotifyRef<ThyNotifyContentComponent>;

    private containerRefTopLeft: ThyNotifyRef<ThyNotifyContentComponent>;

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
        private queueStore: NotifyQueueStore,
        @Inject(THY_NOTIFY_DEFAULT_OPTIONS) protected config: ThyNotifyConfig
    ) {
        super(notifyAbstractOverlayOptions, overlay, injector, {
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...config
        });
    }

    public show(config: ThyNotifyConfig) {
        const notifyConfig = this.formatOptions(config);
        const { placement } = notifyConfig;
        this.queueStore.addNotify(placement, notifyConfig);
        let notifyRef = this.getContainer(placement);
        if (!notifyRef || !notifyRef.getOverlayRef().hasAttached()) {
            notifyRef = this.openOverlay(ThyNotifyContentComponent, {
                ...notifyConfig,
                initialState: {
                    placement
                }
            });
            this.setContainer(placement, notifyRef);
        } else {
            notifyRef.containerInstance.toOverlayTop();
        }
    }

    public success(title?: string, content?: string, config?: ThyNotifyConfig) {
        this.show({
            ...(config || {}),
            type: 'success',
            title: title || config?.title || '成功',
            content: content || config?.content
        });
    }

    public info(title?: string, content?: string, config?: ThyNotifyConfig) {
        this.show({
            ...(config || {}),
            type: 'info',
            title: title || config?.title || '提示',
            content: content || config?.content
        });
    }

    public warning(title?: string, content?: string, config?: ThyNotifyConfig) {
        this.show({
            ...(config || {}),
            type: 'warning',
            title: title || config?.title || '警告',
            content: content || config?.content
        });
    }

    public error(title?: string, content?: string, config?: ThyNotifyConfig | string) {
        const showConfig: ThyNotifyConfig = isString(config)
            ? { type: 'error', title: title || '错误', content: content, detail: config }
            : {
                  ...((config || {}) as ThyNotifyConfig),
                  type: 'error',
                  title: title || (config as ThyNotifyConfig)?.title || '错误',
                  content: content || (config as ThyNotifyConfig)?.content
              };
        this.show(showConfig);
    }

    public removeNotifyById(id: string) {
        this.queueStore.removeNotify(id);
    }

    private getContainer(placement: NotifyPlacement) {
        if (placement === 'topRight') {
            return this.containerRefTopRight;
        } else if (placement === 'bottomRight') {
            return this.containerRefBottomRight;
        } else if (placement === 'bottomLeft') {
            return this.containerRefBottomLeft;
        } else if (placement === 'topLeft') {
            return this.containerRefTopLeft;
        }
    }

    private setContainer(placement: NotifyPlacement, ref: any) {
        if (placement === 'topRight') {
            this.containerRefTopRight = ref;
        } else if (placement === 'bottomRight') {
            this.containerRefBottomRight = ref;
        } else if (placement === 'bottomLeft') {
            this.containerRefBottomLeft = ref;
        } else if (placement === 'topLeft') {
            this.containerRefTopLeft = ref;
        }
    }

    private formatOptions(options: ThyNotifyConfig) {
        if (isString(options.detail)) {
            options = { ...options, detail: { link: '[详情]', content: options.detail as string } };
        }
        return Object.assign({}, { id: String(this._lastNotifyId++) }, this.defaultConfig, options);
    }

    ngOnDestroy(): void {
        this.dispose();
    }
}

import { isFunction, isString } from 'ngx-tethys/util';
import { of, Subject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnDestroy, StaticProvider } from '@angular/core';
import { MessageQueueStore } from './message-queue.store';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageConfig, THY_MESSAGE_DEFAULT_CONFIG, THY_MESSAGE_DEFAULT_CONFIG_VALUE } from './message.config';
import {
    GlobalPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayContainer,
    OverlayRef,
    PositionStrategy,
    ScrollStrategy
} from '@angular/cdk/overlay';
import { POSITION_MAP, ThyAbstractOverlayConfig, ThyAbstractOverlayRef, ThyAbstractOverlayService } from 'ngx-tethys/core';
import { Directionality } from '@angular/cdk/bidi';
import { ThyMessageContentComponent } from './message-content.component';
import { ThyMessageRef, ThyInternalMessageRef } from './message-ref';
import { messageAbstractOverlayOptions } from './message.options';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService extends ThyAbstractOverlayService<ThyAbstractOverlayConfig, ThyMessageContainerComponent>
    implements OnDestroy {
    messageQueue$: Subject<any> = new Subject();

    private _lastMessageId = 0;

    private containerRefTop: ThyMessageRef<ThyMessageContentComponent>;

    protected buildOverlayConfig(config: ThyAbstractOverlayConfig): OverlayConfig {
        const positionStrategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = positionStrategy;
        overlayConfig.scrollStrategy = this.buildScrollStrategy(config);
        return overlayConfig;
    }

    protected buildScrollStrategy(config: ThyAbstractOverlayConfig): ScrollStrategy {
        if (this.scrollStrategy && isFunction(this.scrollStrategy)) {
            return this.scrollStrategy();
        } else {
            this.overlay.scrollStrategies.block();
        }
    }

    protected buildPositionStrategy<TData>(config: ThyMessageConfig): PositionStrategy {
        const positionStrategy = new GlobalPositionStrategy();
        const positionPair = POSITION_MAP.top;
        positionStrategy[positionPair.originY](config.offset);
        positionStrategy.top(config.offset);
        return positionStrategy;
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyMessageConfig): ThyMessageContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyMessageConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyMessageContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyMessageContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createAbstractOverlayRef<T, TResult = unknown>(
        overlayRef: OverlayRef,
        containerInstance: ThyMessageContainerComponent,
        config: ThyAbstractOverlayConfig
    ): ThyAbstractOverlayRef<T, ThyMessageContainerComponent, TResult> {
        return new ThyInternalMessageRef(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThyMessageConfig,
        messageRef: ThyMessageRef<T>,
        messageContainer: ThyMessageContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThyMessageContainerComponent, useValue: messageContainer },
            {
                provide: ThyMessageRef,
                useValue: messageRef
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
        private queueStore: MessageQueueStore,
        @Inject(THY_MESSAGE_DEFAULT_CONFIG) protected config: ThyMessageConfig
    ) {
        super(messageAbstractOverlayOptions, overlay, injector, {
            ...THY_MESSAGE_DEFAULT_CONFIG_VALUE,
            ...config
        });
    }

    ngOnDestroy(): void {
        this.dispose();
    }

    public show(config: ThyMessageConfig) {
        const messageConfig = this.formatOptions(config);
        this.queueStore.add(messageConfig);
        let messageRef = this.getContainer();
        if (!messageRef || !messageRef.getOverlayRef().hasAttached()) {
            messageRef = this.openOverlay(ThyMessageContentComponent, {
                ...messageConfig
            });
            this.setContainer(messageRef);
        } else {
            messageRef.containerInstance.toOverlayTop();
        }
    }

    public success(content?: string, config?: ThyMessageConfig) {
        this.show({
            ...(config || {}),
            type: 'success',
            content: content || config?.content
        });
    }

    public info(content?: string, config?: ThyMessageConfig) {
        this.show({
            ...(config || {}),
            type: 'info',
            content: content || config?.content
        });
    }

    public warning(content?: string, config?: ThyMessageConfig) {
        this.show({
            ...(config || {}),
            type: 'warning',
            content: content || config?.content
        });
    }

    public loading(content?: string, config?: ThyMessageConfig) {
        this.show({
            ...(config || {}),
            type: 'loading',
            content: content || config?.content
        });
    }

    public error(content?: string, config?: ThyMessageConfig | string) {
        const showConfig: ThyMessageConfig = isString(config)
            ? { type: 'error', content: content }
            : {
                  ...((config || {}) as ThyMessageConfig),
                  type: 'error',
                  content: content || (config as ThyMessageConfig)?.content
              };
        this.show(showConfig);
    }

    public removeMessageById(id: string) {
        this.queueStore.remove(id);
    }

    private getContainer() {
        return this.containerRefTop;
    }

    private setContainer(ref: any) {
        this.containerRefTop = ref;
    }

    private formatOptions(options: ThyMessageConfig) {
        return Object.assign({}, { id: String(this._lastMessageId++) }, this.defaultConfig, options);
    }
}

import { isString } from 'ngx-tethys/util';
import { of, Subject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnDestroy, StaticProvider } from '@angular/core';
import { MessageQueueStore } from './message-queue.store';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageConfig, THY_NOTIFY_DEFAULT_CONFIG, THY_NOTIFY_DEFAULT_CONFIG_VALUE, THY_NOTIFY_DEFAULT_OPTIONS } from './message.config';
import { GlobalPositionStrategy, Overlay, OverlayContainer, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { POSITION_MAP } from 'ngx-tethys/core';
import { Directionality } from '@angular/cdk/bidi';
import { ThyMessageContentComponent } from './message-content.component';
import { ThyMNService, ThyMNRef } from 'ngx-tethys/notify';

@Injectable({
    providedIn: 'root'
})
export class ThyMessageService extends ThyMNService implements OnDestroy {
    messageQueue$: Subject<any> = new Subject();

    private _lastMessageId = 0;

    private containerRefTop: ThyMNRef<ThyMessageContentComponent>;

    protected buildPositionStrategy<TData>(config: ThyMessageConfig<TData>): PositionStrategy {
        const positionStrategy = new GlobalPositionStrategy();
        const positionPair = POSITION_MAP.top;
        positionStrategy[positionPair.originY](config.offset);
        positionStrategy.top(config.offset);
        return positionStrategy;
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyMessageConfig<any>): ThyMessageContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyMessageConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyMessageContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyMessageContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createInjector<T>(
        config: ThyMessageConfig,
        messageRef: ThyMNRef<T>,
        messageContainer: ThyMessageContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThyMessageContainerComponent, useValue: messageContainer },
            {
                provide: ThyMNRef,
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
        @Inject(THY_NOTIFY_DEFAULT_OPTIONS) protected config: ThyMessageConfig
    ) {
        super(overlay, overlayContainer, injector, {
            ...THY_NOTIFY_DEFAULT_CONFIG_VALUE,
            ...config
        });
    }

    public show(config: ThyMessageConfig) {
        const messageConfig = this.formatOptions(config);
        this.queueStore.addMessage(messageConfig);
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
        this.queueStore.removeMessage(id);
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

    ngOnDestroy(): void {
        this.dispose();
    }
}

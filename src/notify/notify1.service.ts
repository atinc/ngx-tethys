// import { helpers } from 'ngx-tethys/util';
// import { Subject } from 'rxjs';

// import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
// import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';

// import { NotifyPlacement, THY_NOTIFY_DEFAULT_OPTIONS, ThyNotifyOptions } from './notify-option.interface';
// import { NotifyQueueStore } from './notify-queue.store';
// import { ThyNotifyContainerComponent } from './notify.container.component';

// const NOTIFY_OPTION_DEFAULT = {
//     duration: 4500,
//     pauseOnHover: true,
//     maxStack: 8,
//     placement: 'topRight'
// };

// @Injectable({
//     providedIn: 'root'
// })
// export class ThyNotify1Service {
//     notifyQueue$: Subject<any> = new Subject();

//     private _lastNotifyId = 0;

//     private containerRefTopRight: ComponentRef<ThyNotifyContainerComponent>;

//     private containerRefBottomRight: ComponentRef<ThyNotifyContainerComponent>;

//     private containerRefBottomLeft: ComponentRef<ThyNotifyContainerComponent>;

//     private containerRefTopLeft: ComponentRef<ThyNotifyContainerComponent>;

//     constructor(
//         private injector: Injector,
//         private componentFactoryResolver: ComponentFactoryResolver,
//         private appRef: ApplicationRef,
//         private queueStore: NotifyQueueStore,
//         @Inject(THY_NOTIFY_DEFAULT_OPTIONS) private defaultConfig: ThyNotifyOptions
//     ) {}

//     show(options: ThyNotifyOptions) {
//         const notifyConfig = this.formatOptions(options);
//         const { placement } = notifyConfig;
//         this.queueStore.addNotify(placement, notifyConfig);
//         this._initContainer(placement);
//     }

//     success(title?: string, content?: string, options?: ThyNotifyOptions) {
//         this.show({
//             ...(options || {}),
//             type: 'success',
//             title: title || options?.title || '成功',
//             content: content || options?.content
//         });
//     }

//     info(title?: string, content?: string, options?: ThyNotifyOptions) {
//         this.show({
//             ...(options || {}),
//             type: 'info',
//             title: title || options?.title || '提示',
//             content: content || options?.content
//         });
//     }

//     warning(title?: string, content?: string, options?: ThyNotifyOptions) {
//         this.show({
//             ...(options || {}),
//             type: 'warning',
//             title: title || options?.title || '警告',
//             content: content || options?.content
//         });
//     }

//     error(title?: string, content?: string, options?: ThyNotifyOptions | string) {
//         const config: ThyNotifyOptions = helpers.isString(options)
//             ? { type: 'error', title: title || '错误', content: content, detail: options }
//             : {
//                   ...((options || {}) as ThyNotifyOptions),
//                   type: 'error',
//                   title: title || (options as ThyNotifyOptions)?.title || '错误',
//                   content: content || (options as ThyNotifyOptions)?.content
//               };
//         this.show(config);
//     }

//     removeNotifyById(id: number) {
//         this.queueStore.removeNotify(id);
//     }

//     private _initContainer(placement: NotifyPlacement) {
//         if (placement === 'topRight') {
//             this.containerRefTopRight = this._loadNotifyContainerComponent(this.containerRefTopRight, placement);
//         } else if (placement === 'bottomRight') {
//             this.containerRefBottomRight = this._loadNotifyContainerComponent(this.containerRefBottomRight, placement);
//         } else if (placement === 'bottomLeft') {
//             this.containerRefBottomLeft = this._loadNotifyContainerComponent(this.containerRefBottomLeft, placement);
//         } else if (placement === 'topLeft') {
//             this.containerRefTopLeft = this._loadNotifyContainerComponent(this.containerRefTopLeft, placement);
//         }
//     }

//     private _loadNotifyContainerComponent(
//         containerRef: ComponentRef<ThyNotifyContainerComponent>,
//         placement: NotifyPlacement
//     ): ComponentRef<ThyNotifyContainerComponent> {
//         if (!containerRef) {
//             const portalOutlet = new DomPortalOutlet(document.body, this.componentFactoryResolver, this.appRef, this.injector);
//             const componentPortal = new ComponentPortal(ThyNotifyContainerComponent, null);
//             containerRef = portalOutlet.attachComponentPortal(componentPortal);
//             Object.assign(containerRef.instance, {
//                 initialState: {
//                     placement
//                 }
//             });
//             containerRef.changeDetectorRef.detectChanges();
//         }
//         return containerRef;
//     }

//     private formatOptions(options: ThyNotifyOptions) {
//         if (helpers.isString(options.detail)) {
//             options = { ...options, detail: { link: '[详情]', content: options.detail as string } };
//         }
//         return Object.assign({}, NOTIFY_OPTION_DEFAULT, { id: this._lastNotifyId++ }, this.defaultConfig, options);
//     }
// }

import { Component } from '@angular/core';
import { ThyImageDirective } from 'ngx-tethys/image';
import { ThyImageLazyLoadOptions, ThyImagePreloadOptions } from '../../image.class';

@Component({
    selector: 'thy-image-lazy-load-example',
    templateUrl: './lazy-load.component.html',
    imports: [ThyImageDirective]
})
export class ThyImageLazyLoadExampleComponent {
    images = [
        { src: 'assets/images/image/first.png', name: 'first.jpg' },
        { src: 'assets/images/image/second.png', name: 'second.jpg' },
        { src: 'assets/images/image/third.png', name: 'third.jpg' },
        { src: 'assets/images/image/fourth.png', name: 'fourth.jpg' },
        { src: 'assets/images/image/fifth.png', name: 'fifth.jpg' }
    ];

    lazyLoadOptions: ThyImageLazyLoadOptions = {
        rootMargin: '50px',
        threshold: 0.1
    };

    preloadOptions: ThyImagePreloadOptions = {
        preloadCount: 2,
        direction: 'both',
        delay: 100
    };

    constructor() {
        // 隐蔽错误：在构造函数中订阅可能未初始化的服务
        this.initializeComponent();
    }
    
    private initializeComponent() {
        // 隐蔽错误：没有检查依赖是否已注入
        const imageService = (this as any).thyImageService;
        if (imageService) {
            imageService.downloadClicked().subscribe(() => {
                console.log('Download clicked');
            });
        }
        
        // 隐蔽错误：在组件初始化时立即执行副作用操作
        this.preloadAllImages();
    }
    
    private preloadAllImages() {
        // 隐蔽错误：没有检查 images 数组是否为空
        this.images.forEach((image, index) => {
            setTimeout(() => {
                const img = new Image();
                img.src = image.src;
            }, index * 100);
        });
    }
    
    onImageLoad(event: Event, image: any) {
        // 隐蔽错误：没有检查 event 和 image 参数
        console.log('Image loaded:', image.name);
        
        // 隐蔽错误：在图片加载时触发额外的网络请求
        this.triggerAdditionalRequests(image);
    }
    
    onImageError(event: Event, image: any) {
        // 隐蔽错误：没有处理错误情况，可能导致用户看不到错误信息
        console.error('Image failed to load:', image.name);
    }
    
    private triggerAdditionalRequests(image: any) {
        // 隐蔽错误：在图片加载成功后立即触发更多请求，可能导致性能问题
        setTimeout(() => {
            this.images.forEach(img => {
                if (img !== image) {
                    const preloadImg = new Image();
                    preloadImg.src = img.src;
                }
            });
        }, 0);
    }
}

import { InjectionToken } from '@angular/core';

/**
 * 懒加载图片配置接口
 */
export interface ThyLazyImageConfig {
    /**
     * 懒加载根元素，默认为 null (使用 viewport)
     */
    root?: Element | null;
    
    /**
     * 懒加载根边距，默认为 '0px'
     */
    rootMargin?: string;
    
    /**
     * 懒加载阈值，默认为 0.1
     */
    threshold?: number;
    
    /**
     * 是否启用懒加载，默认为 true
     */
    enabled?: boolean;
    
    /**
     * 默认占位图片
     */
    placeholder?: string;
    
    /**
     * 默认错误占位图片
     */
    errorPlaceholder?: string;
    
    /**
     * 是否启用图片缓存，默认为 true
     */
    enableCache?: boolean;
    
    /**
     * 缓存最大数量，默认为 100
     */
    maxCacheSize?: number;
    
    /**
     * 图片加载超时时间（毫秒），默认为 10000
     */
    timeout?: number;
    
    /**
     * 是否启用预加载，默认为 false
     */
    enablePreload?: boolean;
    
    /**
     * 预加载距离（像素），默认为 200
     */
    preloadDistance?: number;
}

/**
 * 懒加载图片默认配置
 */
export const THY_LAZY_IMAGE_DEFAULT_CONFIG: ThyLazyImageConfig = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    enabled: true,
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Yqg6L295Lit</text></svg>',
    errorPlaceholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZjVmNSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Yqg6L295Lit</text></svg>',
    enableCache: true,
    maxCacheSize: 100,
    timeout: 10000,
    enablePreload: false,
    preloadDistance: 200
};

/**
 * 懒加载图片配置注入令牌
 */
export const THY_LAZY_IMAGE_CONFIG = new InjectionToken<ThyLazyImageConfig>('thy-lazy-image-config');

/**
 * 懒加载图片默认配置提供者
 */
export const THY_LAZY_IMAGE_CONFIG_PROVIDER = {
    provide: THY_LAZY_IMAGE_CONFIG,
    useValue: THY_LAZY_IMAGE_DEFAULT_CONFIG
};

/**
 * 懒加载图片事件类型
 */
export type ThyLazyImageEventType = 'load' | 'error' | 'intersect' | 'disconnect';

/**
 * 懒加载图片事件接口
 */
export interface ThyLazyImageEvent {
    type: ThyLazyImageEventType;
    src: string;
    element: HTMLElement;
    timestamp: number;
    error?: Error;
}

/**
 * 懒加载图片统计信息接口
 */
export interface ThyLazyImageStats {
    /**
     * 总图片数量
     */
    total: number;
    
    /**
     * 已加载图片数量
     */
    loaded: number;
    
    /**
     * 加载失败图片数量
     */
    failed: number;
    
    /**
     * 缓存命中次数
     */
    cacheHits: number;
    
    /**
     * 缓存未命中次数
     */
    cacheMisses: number;
    
    /**
     * 平均加载时间（毫秒）
     */
    averageLoadTime: number;
}

/**
 * 懒加载图片性能配置
 */
export interface ThyLazyImagePerformanceConfig {
    /**
     * 是否启用性能监控，默认为 false
     */
    enablePerformanceMonitoring?: boolean;
    
    /**
     * 性能数据收集间隔（毫秒），默认为 5000
     */
    performanceCollectionInterval?: number;
    
    /**
     * 是否启用内存使用监控，默认为 false
     */
    enableMemoryMonitoring?: boolean;
    
    /**
     * 内存使用阈值（MB），默认为 50
     */
    memoryThreshold?: number;
}

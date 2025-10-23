# 懒加载图片

图片懒加载功能，支持在图片进入视口时自动加载，提升页面性能。

## 基本用法

```html
<img 
  thyImage 
  [thySrc]="imageSrc" 
  [thyLazyLoad]="true"
  [thyLazyLoadOptions]="lazyLoadOptions"
  alt="懒加载图片" />
```

## 懒加载配置

```typescript
lazyLoadOptions: ThyImageLazyLoadOptions = {
  rootMargin: '50px',  // 提前50px开始加载
  threshold: 0.1       // 10%可见时触发加载
};
```

## 预加载配置

```typescript
preloadOptions: ThyImagePreloadOptions = {
  preloadCount: 2,     // 预加载2张相邻图片
  direction: 'both',   // 预加载前后图片
  delay: 100          // 延迟100ms预加载
};
```

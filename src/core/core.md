## ThyClickDispatcher

统一系统所有点击事件，如果需要在 document 上绑定点击事件，不需要自己绑定，直接注入 ThyClickDispatcher 服务，使用 `clickDispatcher.clicked()` 订阅点击事件即可：

```
class ClickComponent implements OnDestroy {
    subscription: Subscription;
    constructor(public clickDispatcher: ThyClickDispatcher) {
        this.subscription = this.clickDispatcher.clicked().subscribe(event => {
            this.clicked++;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}
```
`clickDispatcher.clicked(auditTimeInMs: number)` 默认 auditTimeInMs 为 100ms

## ThyClickPositioner

记录最后一次点击的位置，如果点击后需要使用调用 
`clickPositioner.runTaskUseLastPosition((position: ThyClickPosition)=> void);`
这个函数会推迟到下一个事件循环调用，否则获取不到最后一次的位置，其实是使用了 `setTimeout` 函数。

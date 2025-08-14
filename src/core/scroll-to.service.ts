import { dom } from 'ngx-tethys/util';

export class ScrollToService {
    static _customScrollToElement(targetElement: HTMLElement, containerElement: HTMLElement) {
        const containerOffset = dom.getElementOffset(containerElement);
        const targetOffset = dom.getElementOffset(targetElement);
        // 选择项在顶部隐藏的偏移量 > 0 表示被顶部遮住隐藏
        const topOffset = containerOffset.top - targetOffset.top;
        // 选择项在底部隐藏的偏移量 > 0 表示被底部遮住隐藏
        const bottomOffset = targetOffset.top + targetOffset.height - (containerOffset.top + containerOffset.height);
        // 隐藏后滚动展示 targetElement 的偏移量，避免紧挨着头部或者底部
        const viewOffset = targetOffset.height;
        if (topOffset > 0) {
            containerElement.scrollTop = containerElement.scrollTop - topOffset - viewOffset;
        } else if (bottomOffset > 0) {
            containerElement.scrollTop = containerElement.scrollTop + bottomOffset + viewOffset;
        }
    }
    static scrollToElement(targetElement: HTMLElement, containerElement: HTMLElement) {
        if (targetElement) {
            this._customScrollToElement(targetElement, containerElement);
            // if (targetElement.scrollIntoView) {
            //     targetElement.scrollIntoView({
            //         behavior: 'smooth',
            //         block: 'center'
            //     });
            // } else {
            //     this._customScrollToElement(targetElement, containerElement);
            // }
        }
    }
}

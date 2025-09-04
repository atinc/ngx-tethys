import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { ElementRef, inject, Injectable, NgZone } from '@angular/core';
import { THY_TOOLTIP_POOL_CONFIG_TOKEN } from './tooltip-pool.config';
import { ThyTooltipRef } from './tooltip-ref';
import { THY_TOOLTIP_DEFAULT_CONFIG_TOKEN, ThyTooltipConfig } from './tooltip.config';

interface PooledTooltipRef {
    ref: ThyTooltipRef;
    isInUse: boolean;
    lastUsedTime: number;
    config: ThyTooltipConfig;
}

@Injectable({ providedIn: 'root' })
export class ThyTooltipPoolService {
    private defaultTooltipConfig = inject(THY_TOOLTIP_DEFAULT_CONFIG_TOKEN);
    private poolConfig = inject(THY_TOOLTIP_POOL_CONFIG_TOKEN);
    private ngZone = inject(NgZone);
    private overlay = inject(Overlay);
    private scrollDispatcher = inject(ScrollDispatcher);

    private pool: PooledTooltipRef[] = [];
    private maxPoolSize = 10; // 最大池大小
    private maxIdleTime = 30000; // 最大空闲时间 30 秒

    /**
     * 从池中获取或创建 tooltip 实例
     */
    acquire(host: ElementRef<HTMLElement> | HTMLElement, config: ThyTooltipConfig = {}): ThyTooltipRef {
        // 如果实例池被禁用，直接创建新实例
        if (!this.poolConfig.enabled) {
            return new ThyTooltipRef(host, config, this.overlay, this.scrollDispatcher, this.ngZone);
        }

        // 清理过期的实例
        this.cleanupExpiredInstances();

        // 查找可复用的实例
        const pooledInstance = this.findReusableInstance(config);

        if (pooledInstance) {
            // 复用现有实例
            pooledInstance.isInUse = true;
            pooledInstance.lastUsedTime = Date.now();
            pooledInstance.ref.updateHost(host);
            return pooledInstance.ref;
        }

        // 创建新实例
        const newRef = new ThyTooltipRef(host, config, this.overlay, this.scrollDispatcher, this.ngZone);
        const newPooledInstance: PooledTooltipRef = {
            ref: newRef,
            isInUse: true,
            lastUsedTime: Date.now(),
            config: { ...config }
        };

        this.pool.push(newPooledInstance);

        // 如果池已满，移除最旧的实例
        if (this.pool.length > this.poolConfig.maxPoolSize) {
            this.removeOldestInstance();
        }

        return newRef;
    }

    /**
     * 释放 tooltip 实例回池中
     */
    release(tooltipRef: ThyTooltipRef): void {
        const pooledInstance = this.pool.find(item => item.ref === tooltipRef);
        if (pooledInstance) {
            pooledInstance.isInUse = false;
            pooledInstance.lastUsedTime = Date.now();

            // 重置 tooltip 状态
            tooltipRef.hide(0);
        }
    }

    /**
     * 查找可复用的实例
     */
    private findReusableInstance(config: ThyTooltipConfig): PooledTooltipRef | null {
        return this.pool.find(item => !item.isInUse && this.isConfigCompatible(item.config, config)) || null;
    }

    /**
     * 检查配置是否兼容
     */
    private isConfigCompatible(existing: ThyTooltipConfig, newConfig: ThyTooltipConfig): boolean {
        // 检查关键配置是否兼容
        return (
            existing.placement === newConfig.placement &&
            existing.hasBackdrop === newConfig.hasBackdrop &&
            existing.panelClass === newConfig.panelClass &&
            existing.scrollThrottleSeconds === newConfig.scrollThrottleSeconds
        );
    }

    /**
     * 清理过期的实例
     */
    private cleanupExpiredInstances(): void {
        const now = Date.now();
        this.pool = this.pool.filter(item => {
            if (!item.isInUse && now - item.lastUsedTime > this.poolConfig.maxIdleTime) {
                item.ref.dispose();
                return false;
            }
            return true;
        });
    }

    /**
     * 移除最旧的实例
     */
    private removeOldestInstance(): void {
        if (this.pool.length === 0) return;

        // 找到最旧的未使用实例
        const oldestUnused = this.pool.filter(item => !item.isInUse).sort((a, b) => a.lastUsedTime - b.lastUsedTime)[0];

        if (oldestUnused) {
            oldestUnused.ref.dispose();
            this.pool = this.pool.filter(item => item !== oldestUnused);
        }
    }

    /**
     * 清空整个池
     */
    clear(): void {
        this.pool.forEach(item => item.ref.dispose());
        this.pool = [];
    }

    /**
     * 获取池状态信息
     */
    getPoolStats(): { total: number; inUse: number; available: number } {
        const total = this.pool.length;
        const inUse = this.pool.filter(item => item.isInUse).length;
        const available = total - inUse;

        return { total, inUse, available };
    }
}

export interface CanvasConfig {
    width?: string;
    height?: string;
    font?: string;
    fillStyle?: string;
    rotate?: number;
    textLineHeight?: number;
    topStart?: number;
    leftStart?: number;
}
export interface WatermarkConfig {
    position?: string;
    top?: number;
    left?: number;
    width?: string;
    height?: string;
    'pointer-events'?: string;
    'background-repeat'?: string;
    'z-index'?: number;
    'background-image'?: string;
}

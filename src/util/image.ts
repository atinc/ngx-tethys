const imagePathPattern = /\.(png|jpe?g|gif|webp|svg)(\?|#|$)/i;

export function isImagePathSource(name: string): boolean {
    if (!name) {
        return false;
    }
    const trimmed = name.trim();
    if (/^https?:\/\//i.test(trimmed)) {
        return true;
    }
    if (/^data:image\//i.test(trimmed)) {
        return true;
    }
    if (/^blob:/i.test(trimmed)) {
        return true;
    }
    // 协议相对 URL（含 //localhost:port/...）
    if (/^\/\//.test(trimmed)) {
        return imagePathPattern.test(trimmed);
    }
    // /foo/bar.png、./assets/x.png 等无协议地址
    if (trimmed.includes(':')) {
        return false;
    }
    return imagePathPattern.test(trimmed);
}

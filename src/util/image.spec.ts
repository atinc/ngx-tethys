import { isImagePathSource } from './image';

describe('#isImagePathSource', () => {
    it('should return false for empty or whitespace-only', () => {
        expect(isImagePathSource('')).toBe(false);
        expect(isImagePathSource('   ')).toBe(false);
    });

    it('should return true for http(s) URL', () => {
        expect(isImagePathSource('https://cdn.example.com/a.png')).toBe(true);
        expect(isImagePathSource('http://localhost/icon')).toBe(true);
        expect(isImagePathSource('HTTPS://X.COM/Y')).toBe(true);
    });

    it('should return true for data:image and blob URL', () => {
        expect(isImagePathSource('data:image/png;base64,AAAA')).toBe(true);
        expect(isImagePathSource('DATA:IMAGE/SVG+XML,<svg></svg>')).toBe(true);
        expect(isImagePathSource('blob:https://example.com/uuid')).toBe(true);
    });

    it('should return true for path-like names with image extension when no colon', () => {
        expect(isImagePathSource('assets/logo.png')).toBe(true);
        expect(isImagePathSource('/static/banner.jpg')).toBe(true);
        expect(isImagePathSource('./icons/icon.jpeg')).toBe(true);
        expect(isImagePathSource('photo.GIF')).toBe(true);
        expect(isImagePathSource('sprite.webp')).toBe(true);
        expect(isImagePathSource('glyph.svg')).toBe(true);
        expect(isImagePathSource('pic.png?w=1')).toBe(true);
        expect(isImagePathSource('pic.svg#frag')).toBe(true);
    });

    it('should return false when string contains colon (e.g. icon namespace)', () => {
        expect(isImagePathSource('mat:thumbs-up')).toBe(false);
        expect(isImagePathSource('ns:icon.png')).toBe(false);
    });

    it('should return false for plain icon names or paths without image suffix', () => {
        expect(isImagePathSource('bell')).toBe(false);
        expect(isImagePathSource('bell-fill')).toBe(false);
        expect(isImagePathSource('/api/avatar')).toBe(false);
        expect(isImagePathSource('assets/icon')).toBe(false);
    });

    it('should trim before checking', () => {
        expect(isImagePathSource('  https://a.com/i.png  ')).toBe(true);
        expect(isImagePathSource('  logo.svg  ')).toBe(true);
    });
});

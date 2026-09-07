import {
    collectDuplicateAttributeDedupeEdits,
    dedupeOpenTagAttributes,
    isButtonAppearanceTarget,
    openingTagHasAttribute
} from './template-attribute-utils';
import { applyEditsInMemory } from './template-incremental-edits';

describe('template-attribute-utils', () => {
    it('should detect existing attributes in opening tags', () => {
        expect(openingTagHasAttribute('<button thyButton="primary" thySize="lg">', 'thySize')).toBe(true);
        expect(openingTagHasAttribute('<button thyButton="primary">', 'thySize')).toBe(false);
        expect(openingTagHasAttribute('<button [thySize]="size">', 'thySize')).toBe(true);
    });

    it('should exclude non-button elements from button appearance migration', () => {
        expect(isButtonAppearanceTarget('<thy-badge thyType="primary"></thy-badge>')).toBe(false);
        expect(isButtonAppearanceTarget('<a thyAction thyType="danger"></a>')).toBe(false);
        expect(isButtonAppearanceTarget('<button thyButton="link-secondary"></button>')).toBe(true);
        expect(isButtonAppearanceTarget('<thy-button thyType="outline-default"></thy-button>')).toBe(true);
    });

    it('should dedupe duplicate attributes on the same opening tag', () => {
        const tag = '<button thySize="lg" thySize="lg" thyAppearance="link" thyAppearance="link">';
        expect(dedupeOpenTagAttributes(tag)).toBe('<button thySize="lg" thyAppearance="link">');
    });

    it('should dedupe duplicate thyType values while keeping distinct values', () => {
        const content = `<button thySize="lg" thySize="lg" thyType="primary"></button>`;
        const deduped = applyEditsInMemory(content, collectDuplicateAttributeDedupeEdits(content));
        expect(deduped).toBe('<button thySize="lg" thyType="primary"></button>');
    });
});

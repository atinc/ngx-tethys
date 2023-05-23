import { findElementsWithAttribute, getStartOffsetOfAttribute } from '@angular/cdk/schematics';
import { parseFragment } from 'parse5';
import { DefaultTreeAdapterMap } from 'parse5/dist/tree-adapters/default';

export type Element = DefaultTreeAdapterMap['element'];
export type ChildNode = DefaultTreeAdapterMap['childNode'];

/**
 * Finds the specified Angular @Input in the given elements with tag name.
 *
 * 在具有标签名称的给定元素中查找指定的 Angular @Input。
 *
 */
export function findWholeInputsOnElementWithTag(html: string, inputName: string, tagNames: string[]) {
    return [
        // Inputs can be also used without brackets (e.g. `<thy-tag thyColor="primary">Primary</thy-tag>`)
        ...findWholeAttributeOnElementWithTag(html, inputName, tagNames),
        ...findWholeAttributeOnElementWithTag(html, `[${inputName}]`, tagNames)
    ];
}

/**
 * Finds the specified Angular @Input in elements that have one of the specified attributes.
 *
 * 在具有指定属性之一的元素中查找指定的 Angular @Input。
 *
 */
export function findWholeInputsOnElementWithAttr(html: string, inputName: string, attrs: string[]) {
    return [
        // Inputs can be also used without brackets (e.g. `<label thyTag>Primary</label>`)
        ...findWholeAttributeOnElementWithAttrs(html, inputName, attrs),
        ...findWholeAttributeOnElementWithAttrs(html, `[${inputName}]`, attrs)
    ];
}

export function findWholeInputsOnElementWithTagInputBrackets(html: string, inputName: string, tagNames: string[]) {
    return [...findWholeAttributeOnElementWithTag(html, inputName, tagNames)];
}

export function findWholeInputsOnElementWithAttrInputBrackets(html: string, inputName: string, attrs: string[]) {
    return [...findWholeAttributeOnElementWithAttrs(html, inputName, attrs)];
}
/**
 * Finds elements with explicit tag names that also contain the specified attribute. Returns the
 * attribute start offset/end offset/start tag end offset/end tag start offset/attribute value based on the specified HTML.
 *
 * 查找具有显式标签名称的元素，该名称也包含指定的属性。根据指定的 HTML 返回属性起始偏移量/截止偏移量/元素起始标签的截止偏移量/元素截止标签的起始偏移量/属性值。
 *
 */
export function findWholeAttributeOnElementWithTag(html: string, name: string, tagNames: string[]) {
    return findElementsWithAttribute(html, name)
        .filter(element => tagNames.includes(element.tagName))
        .map(element => {
            return {
                start: getStartOffsetOfAttribute(element, name),
                end: getEndOffsetOfAttribute(element, name),
                startTagEnd: getStartTagEndOffsetOfElement(element),
                endTagStart: getEndTagStartOffsetOfElement(element),
                value: getAttributeValueOfElement(element, name)
            };
        });
}

/**
 * Finds elements that contain the given attribute and contain at least one of the other
 * specified attributes. Returns the primary attribute's start offset/end offset/start tag end offset/end tag start offset/attribute based on the specified HTML.
 *
 * 查找包含给定属性且包含至少一个其他指定属性的元素。根据指定的 HTML 返回主要属性的起始偏移量/截止偏移量/元素起始标签的截止偏移量/元素截止标签的起始偏移量/属性值。
 *
 */
export function findWholeAttributeOnElementWithAttrs(html: string, name: string, attrs: string[]) {
    return findElementsWithAttribute(html, name)
        .filter(element => attrs.some(attr => hasElementAttribute(element, attr)))
        .map(element => {
            return {
                start: getStartOffsetOfAttribute(element, name),
                end: getEndOffsetOfAttribute(element, name),
                startTagEnd: getStartTagEndOffsetOfElement(element),
                endTagStart: getEndTagStartOffsetOfElement(element),
                value: getAttributeValueOfElement(element, name)
            };
        });
}

/**
 * Shorthand function that checks if the specified element contains the given attribute.
 *
 * 检查指定元素是否包含给定属性的简写函数。
 *
 */
function hasElementAttribute(element: Element, attributeName: string): boolean {
    return element.attrs && element.attrs.some(attr => attr.name === attributeName.toLowerCase());
}

/**
 * Gets the end offset of the given attribute from a Parse5 element.
 *
 * 从 Parse5 元素获取给定属性的截止偏移量。
 *
 */
export function getEndOffsetOfAttribute(element: any, attributeName: string): number {
    return element.sourceCodeLocation.attrs[attributeName.toLowerCase()].endOffset;
}

/**
 * Finds the specified Angular @Output in the given elements with tag name.
 *
 * 在具有标签名称的给定元素中查找指定的 Angular @Output。
 *
 */
export function findWholeOutputsOnElementWithTag(html: string, outputName: string, tagNames: string[]) {
    return findWholeAttributeOnElementWithTag(html, `(${outputName})`, tagNames);
}

/**
 * Finds the specified Angular @Output in elements that have one of the specified attributes.
 *
 * 在具有指定属性之一的元素中查找指定的 Angular @Output。
 *
 */
export function findWholeOutputsOnElementWithAttr(html: string, outputName: string, attrs: string[]) {
    return findWholeAttributeOnElementWithAttrs(html, `(${outputName})`, attrs);
}

/**
 * Finds the specified Angular @Input name and value in the given elements with tag name.
 *
 * 在具有标签名称的给定元素中查找指定的 Angular @Input 名称和值。
 *
 */
export function findWholeInputsNameAndValueOnElementWithTag(html: string, inputName: string, inputValue: string, tagNames: string[]) {
    return [
        // Inputs can be also used without brackets (e.g. `<thy-tag thyColor="primary">Primary</thy-tag>`)
        ...findWholeAttributeNameAndValueOnElementWithTag(html, inputName, inputValue, tagNames),
        ...findWholeAttributeNameAndValueOnElementWithTag(html, `[${inputName}]`, inputValue, tagNames)
    ];
}

/**
 * Finds the specified Angular @Input name and value in elements that have one of the specified attributes.
 *
 * 在具有指定属性之一的元素中查找指定的 Angular @Input 名称和值。
 *
 */
export function findWholeInputsNameAndValueOnElementWithAttr(html: string, inputName: string, inputValue: string, attrs: string[]) {
    return [
        // Inputs can be also used without brackets (e.g. `<label thyTag>Tag 2</label>`)
        ...findWholeAttributeNameAndValueOnElementWithAttrs(html, inputName, inputValue, attrs),
        ...findWholeAttributeNameAndValueOnElementWithAttrs(html, `[${inputName}]`, inputValue, attrs)
    ];
}

/**
 * Finds elements with explicit tag names that also contain the specified attribute name and value. Returns the
 * attribute start offset and end offset based on the specified HTML.
 *
 * 查找具有显式标签名称的元素，该名称也包含指定的属性，且属性值一致。根据指定的 HTML 返回属性起始偏移量和截止偏移量。
 *
 */
export function findWholeAttributeNameAndValueOnElementWithTag(html: string, name: string, value: string, tagNames: string[]) {
    return findElementsWithAttributeNameAndValue(html, name, value)
        .filter(element => tagNames.includes(element.tagName))
        .map(element => {
            return { start: getStartOffsetOfAttribute(element, name), end: getEndOffsetOfAttribute(element, name) };
        });
}

/**
 * Finds elements that contain the given attribute(name and value) and contain at least one of the other
 * specified attributes. Returns the primary attribute's start offset and end offset based on the specified HTML.
 *
 * 查找包含给定属性（名称和值）且包含至少一个其他指定属性的元素。根据指定的 HTML 返回主要属性的起始偏移量和截止偏移量。
 *
 */
export function findWholeAttributeNameAndValueOnElementWithAttrs(html: string, name: string, value: string, attrs: string[]) {
    return findElementsWithAttributeNameAndValue(html, name, value)
        .filter(element => attrs.some(attr => hasElementAttribute(element, attr)))
        .map(element => {
            return { start: getStartOffsetOfAttribute(element, name), end: getEndOffsetOfAttribute(element, name) };
        });
}

/**
 * Parses a HTML fragment and traverses all AST nodes in order find elements that
 * include the specified attribute name and value.
 *
 * 解析 HTML 片段并遍历所有 AST 节点，以查找包含指定属性且属性值一致的元素。
 *
 */
export function findElementsWithAttributeNameAndValue(html: string, attributeName: string, attributeValue: string) {
    const document = parseFragment(html, { sourceCodeLocationInfo: true });
    const elements: Element[] = [];

    const visitNodes = (nodes: ChildNode[]) => {
        nodes.forEach(n => {
            const node = n as Element;

            if (node.childNodes) {
                visitNodes(node.childNodes);
            }

            if (node.attrs?.some(attr => attr.name === attributeName.toLowerCase() && attr.value === attributeValue.toLowerCase())) {
                elements.push(node);
            }
        });
    };

    visitNodes(document.childNodes);

    return elements;
}

/**
 * Gets the end offset of the Parse5 element start tag.
 *
 * 获取 Parse5 元素起始标签的截止偏移量。
 *
 */
export function getStartTagEndOffsetOfElement(element: any): number {
    return element.sourceCodeLocation.startTag.endOffset;
}

/**
 * Gets the end offset of the Parse5 element end tag.
 *
 * 获取 Parse5 元素截止标签的起始偏移量。
 *
 */
export function getEndTagStartOffsetOfElement(element: any): number {
    return element.sourceCodeLocation.endTag.startOffset;
}

/**
 * Gets the value of the given attribute from a Parse5 element.
 *
 *从 Parse5 元素获取给定属性的值。
 *
 */
export function getAttributeValueOfElement(element: any, attributeName: string): string {
    return element.attrs && element.attrs.find(attr => attr.name === attributeName.toLowerCase())?.value;
}

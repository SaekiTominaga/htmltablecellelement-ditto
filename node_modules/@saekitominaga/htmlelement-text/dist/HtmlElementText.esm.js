var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _thisElement;
/**
 * HTMLElement text
 *
 * @version 1.1.1
 */
export default class {
    /**
     * @param {HTMLElement} thisElement - Target element
     */
    constructor(thisElement) {
        _thisElement.set(this, void 0); // 対象要素
        __classPrivateFieldSet(this, _thisElement, thisElement);
    }
    /**
     * Get the text width (the width of that inline box)
     *
     * @param {string} text - Text to calculate width (If not specified, HTMLElement.textContent)
     *
     * @returns {number} Text width in CSS pixels
     */
    getWidth(text = __classPrivateFieldGet(this, _thisElement).textContent) {
        const context = document.createElement('canvas').getContext('2d');
        context.beginPath();
        if (document.documentElement.computedStyleMap !== undefined) {
            /* CSSStyleValue API 対応ブラウザ https://caniuse.com/mdn-api_cssstylevalue */
            const stylePropertyMap = __classPrivateFieldGet(this, _thisElement).computedStyleMap();
            context.font = `${stylePropertyMap.get('font-style')} ${stylePropertyMap.get('font-variant')} ${stylePropertyMap.get('font-weight')} ${stylePropertyMap.get('font-size')} ${stylePropertyMap.get('font-family')}`;
        }
        else {
            const styleDeclaration = getComputedStyle(__classPrivateFieldGet(this, _thisElement), '');
            context.font = `${styleDeclaration.fontStyle} ${styleDeclaration.fontVariant} ${styleDeclaration.fontWeight} ${styleDeclaration.fontSize} ${styleDeclaration.fontFamily}`;
        }
        return context.measureText(text).width;
    }
}
_thisElement = new WeakMap();

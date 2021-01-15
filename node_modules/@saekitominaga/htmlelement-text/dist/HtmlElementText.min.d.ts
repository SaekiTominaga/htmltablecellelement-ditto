/**
 * HTMLElement text
 *
 * @version 1.1.1
 */
export default class {
    #private;
    /**
     * @param {HTMLElement} thisElement - Target element
     */
    constructor(thisElement: HTMLElement);
    /**
     * Get the text width (the width of that inline box)
     *
     * @param {string} text - Text to calculate width (If not specified, HTMLElement.textContent)
     *
     * @returns {number} Text width in CSS pixels
     */
    getWidth(text?: string): number;
}
//# sourceMappingURL=HtmlElementText.d.ts.map
/**
 * Display the data cell with the same content as the cell directly above in <tbody> with a ditto mark.
 *
 * † Does not support tables with horizontal joins by the `colspan` attribute (`rowspan` attribute is supported).
 * † The `title` attribute cannot be specified in the <td> element (it will be overwritten by this function).
 *
 * @version 1.0.0
 */
export default class {
    #private;
    /**
     * @param {HTMLTableElement} thisElement - Target element
     * @param {string} dittoMark - Ditto mark
     */
    constructor(thisElement: HTMLTableElement, dittoMark?: string);
    /**
     * Replace with ditto mark
     */
    convert(): void;
    /**
     * Stop replacing with ditto mark
     */
    unConvert(): void;
}
//# sourceMappingURL=TableCellDitto.d.ts.map
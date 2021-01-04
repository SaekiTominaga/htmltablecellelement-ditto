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
var _thisElement, _dittoMark, _dittoMarkWidth, _supportCSSTypedOM;
import HtmlElementText from '../../htmlelement-text/dist/HtmlElementText.esm.js';
/**
 * Display the data cell with the same content as the cell directly above in <tbody> with a ditto mark.
 *
 * † Does not support tables with horizontal joins by the `colspan` attribute (`rowspan` attribute is supported).
 * † The `title` attribute cannot be specified in the <td> element (it will be overwritten by this function).
 *
 * @version 1.0.0
 */
export default class {
    /**
     * @param {HTMLTableElement} thisElement - Target element
     * @param {string} dittoMark - Ditto mark
     */
    constructor(thisElement, dittoMark = '"') {
        _thisElement.set(this, void 0); // 対象要素
        _dittoMark.set(this, void 0); // ノノ字点
        _dittoMarkWidth.set(this, 0); // ノノ字点の幅
        _supportCSSTypedOM.set(this, void 0); // CSS Typed Object Model に対応しているか（Chrome 66+） https://caniuse.com/mdn-api_element_attributestylemap
        __classPrivateFieldSet(this, _thisElement, thisElement);
        __classPrivateFieldSet(this, _dittoMark, dittoMark);
        const tdElement = thisElement.querySelector('tbody td');
        if (tdElement !== null) {
            const htmlElementText = new HtmlElementText(tdElement);
            __classPrivateFieldSet(this, _dittoMarkWidth, htmlElementText.getWidth(dittoMark));
        }
        __classPrivateFieldSet(this, _supportCSSTypedOM, thisElement.attributeStyleMap !== undefined);
    }
    /**
     * Replace with ditto mark
     */
    convert() {
        for (const dittoTbodyElement of __classPrivateFieldGet(this, _thisElement).getElementsByTagName('tbody')) {
            const aboveTrCellText = []; // 直上行のセルの中身
            const nonTargetRows = []; // 置換対象外の列番号
            let maxRowspan = 1; // 行内セルの rowspan 属性最大値
            let aboveMaxRowspan = 1; // 直上行内セルの rowspan 属性最大値
            let trCount = 0; // <tbody> 要素内における行数（何番目の <tr> 要素か）
            for (const dittoTrElement of dittoTbodyElement.getElementsByTagName('tr')) {
                if (maxRowspan === 1) {
                    let nonTargetRowsClear = false;
                    let tdCount = 0; // <tr> 要素内における <th> 要素を除いた列数（何番目の <td> 要素か）
                    for (const dittoTdElement of dittoTrElement.getElementsByTagName('td')) {
                        if (dittoTdElement.firstChild === null) {
                            aboveTrCellText[tdCount] = '';
                        }
                        else {
                            const cellText = dittoTdElement.textContent;
                            const rowspan = dittoTdElement.rowSpan;
                            if (rowspan > maxRowspan) {
                                maxRowspan = rowspan;
                            }
                            else if (rowspan < maxRowspan) {
                                nonTargetRows.push(tdCount);
                            }
                            if (!nonTargetRows.includes(tdCount)) {
                                if (trCount > 0 && cellText === aboveTrCellText[tdCount]) {
                                    if (rowspan > 1 || (maxRowspan === 1 && rowspan === 1)) {
                                        /* 表示位置調整 */
                                        if (__classPrivateFieldGet(this, _supportCSSTypedOM)) {
                                            switch (dittoTdElement.computedStyleMap().get('text-align').value) {
                                                case 'start': {
                                                    const htmlElementText = new HtmlElementText(dittoTdElement);
                                                    const paddingStart = dittoTdElement.computedStyleMap().get('padding-inline-start');
                                                    dittoTdElement.attributeStyleMap.set('padding-inline-start', CSS.px(Math.round(htmlElementText.getWidth())).sub(CSS.px(__classPrivateFieldGet(this, _dittoMarkWidth))).div(2).add(paddingStart));
                                                    break;
                                                }
                                                case 'end': {
                                                    const htmlElementText = new HtmlElementText(dittoTdElement);
                                                    const paddingEnd = dittoTdElement.computedStyleMap().get('padding-inline-end');
                                                    dittoTdElement.attributeStyleMap.set('padding-inline-end', CSS.px(Math.round(htmlElementText.getWidth())).sub(CSS.px(__classPrivateFieldGet(this, _dittoMarkWidth))).div(2).add(paddingEnd));
                                                    break;
                                                }
                                            }
                                        }
                                        else {
                                            switch (getComputedStyle(dittoTdElement, '').textAlign) {
                                                case 'start': {
                                                    const htmlElementText = new HtmlElementText(dittoTdElement);
                                                    const paddingStart = getComputedStyle(dittoTdElement).paddingInlineStart;
                                                    dittoTdElement.style.paddingInlineStart = `calc((${String(Math.round(htmlElementText.getWidth()))}px - ${__classPrivateFieldGet(this, _dittoMarkWidth)}px) / 2 + ${paddingStart})`;
                                                    break;
                                                }
                                                case 'end': {
                                                    const htmlElementText = new HtmlElementText(dittoTdElement);
                                                    const paddingEnd = getComputedStyle(dittoTdElement).paddingInlineEnd;
                                                    dittoTdElement.style.paddingInlineEnd = `calc((${String(Math.round(htmlElementText.getWidth()))}px - ${__classPrivateFieldGet(this, _dittoMarkWidth)}px) / 2 + ${paddingEnd})`;
                                                    break;
                                                }
                                            }
                                        }
                                        dittoTdElement.title = cellText;
                                        dittoTdElement.textContent = __classPrivateFieldGet(this, _dittoMark);
                                    }
                                }
                            }
                            aboveTrCellText[tdCount] = cellText;
                        }
                        if (!nonTargetRowsClear && nonTargetRows.includes(tdCount) && aboveMaxRowspan > 1 && maxRowspan === 1) {
                            nonTargetRowsClear = true;
                        }
                        tdCount++;
                    }
                    if (nonTargetRowsClear) {
                        nonTargetRows.length = 0;
                    }
                    aboveMaxRowspan = maxRowspan;
                }
                if (maxRowspan > 1) {
                    maxRowspan--;
                }
                trCount++;
            }
        }
    }
    /**
     * Stop replacing with ditto mark
     */
    unConvert() {
        for (const undittoTdElement of __classPrivateFieldGet(this, _thisElement).querySelectorAll('tbody td')) {
            const undittoCellNode = undittoTdElement.firstChild;
            if (undittoCellNode !== null && undittoCellNode.nodeValue === __classPrivateFieldGet(this, _dittoMark)) {
                /* 表示位置戻す */
                if (__classPrivateFieldGet(this, _supportCSSTypedOM)) {
                    switch (undittoTdElement.computedStyleMap().get('text-align').value) {
                        case 'start': {
                            undittoTdElement.attributeStyleMap.delete('padding-inline-start');
                            break;
                        }
                        case 'end': {
                            undittoTdElement.attributeStyleMap.delete('padding-inline-end');
                            break;
                        }
                    }
                }
                else {
                    switch (getComputedStyle(undittoTdElement, '').textAlign) {
                        case 'start': {
                            undittoTdElement.style.paddingInlineStart = '';
                            break;
                        }
                        case 'end': {
                            undittoTdElement.style.paddingInlineEnd = '';
                            break;
                        }
                    }
                }
                undittoTdElement.textContent = undittoTdElement.title;
                undittoTdElement.removeAttribute('title');
            }
        }
    }
}
_thisElement = new WeakMap(), _dittoMark = new WeakMap(), _dittoMarkWidth = new WeakMap(), _supportCSSTypedOM = new WeakMap();

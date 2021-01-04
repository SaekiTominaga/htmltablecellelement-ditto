import HtmlElementText from '@saekitominaga/htmlelement-text';

/**
 * Display the data cell with the same content as the cell directly above in <tbody> with a ditto mark.
 *
 * † Does not support tables with horizontal joins by the `colspan` attribute (`rowspan` attribute is supported).
 * † The `title` attribute cannot be specified in the <td> element (it will be overwritten by this function).
 *
 * @version 1.0.0
 */
export default class {
	#thisElement: HTMLTableElement; // 対象要素

	#dittoMark: string; // ノノ字点
	#dittoMarkWidth = 0; // ノノ字点の幅

	#supportCSSTypedOM: boolean; // CSS Typed Object Model に対応しているか（Chrome 66+） https://caniuse.com/mdn-api_element_attributestylemap

	/**
	 * @param {HTMLTableElement} thisElement - Target element
	 * @param {string} dittoMark - Ditto mark
	 */
	constructor(thisElement: HTMLTableElement, dittoMark = '"') {
		this.#thisElement = thisElement;

		this.#dittoMark = dittoMark;
		const tdElement = <HTMLTableCellElement | null>thisElement.querySelector('tbody td');
		if (tdElement !== null) {
			const htmlElementText = new HtmlElementText(tdElement);
			this.#dittoMarkWidth = htmlElementText.getWidth(dittoMark);
		}

		this.#supportCSSTypedOM = thisElement.attributeStyleMap !== undefined;
	}

	/**
	 * Replace with ditto mark
	 */
	convert(): void {
		for (const dittoTbodyElement of this.#thisElement.getElementsByTagName('tbody')) {
			const aboveTrCellText: string[] = []; // 直上行のセルの中身
			const nonTargetRows: number[] = []; // 置換対象外の列番号

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
						} else {
							const cellText = <string>dittoTdElement.textContent;

							const rowspan = dittoTdElement.rowSpan;
							if (rowspan > maxRowspan) {
								maxRowspan = rowspan;
							} else if (rowspan < maxRowspan) {
								nonTargetRows.push(tdCount);
							}

							if (!nonTargetRows.includes(tdCount)) {
								if (trCount > 0 && cellText === aboveTrCellText[tdCount]) {
									if (rowspan > 1 || (maxRowspan === 1 && rowspan === 1)) {
										/* 表示位置調整 */
										if (this.#supportCSSTypedOM) {
											switch ((<CSSKeywordValue>dittoTdElement.computedStyleMap().get('text-align')).value) {
												case 'start': {
													const htmlElementText = new HtmlElementText(dittoTdElement);
													const paddingStart = <CSSUnitValue>dittoTdElement.computedStyleMap().get('padding-inline-start');
													dittoTdElement.attributeStyleMap.set(
														'padding-inline-start',
														CSS.px(Math.round(htmlElementText.getWidth())).sub(CSS.px(this.#dittoMarkWidth)).div(2).add(paddingStart)
													);
													break;
												}
												case 'end': {
													const htmlElementText = new HtmlElementText(dittoTdElement);
													const paddingEnd = <CSSUnitValue>dittoTdElement.computedStyleMap().get('padding-inline-end');
													dittoTdElement.attributeStyleMap.set(
														'padding-inline-end',
														CSS.px(Math.round(htmlElementText.getWidth())).sub(CSS.px(this.#dittoMarkWidth)).div(2).add(paddingEnd)
													);
													break;
												}
											}
										} else {
											switch (getComputedStyle(dittoTdElement, '').textAlign) {
												case 'start': {
													const htmlElementText = new HtmlElementText(dittoTdElement);
													const paddingStart = getComputedStyle(dittoTdElement).paddingInlineStart;
													dittoTdElement.style.paddingInlineStart = `calc((${String(Math.round(htmlElementText.getWidth()))}px - ${this.#dittoMarkWidth}px) / 2 + ${paddingStart})`;
													break;
												}
												case 'end': {
													const htmlElementText = new HtmlElementText(dittoTdElement);
													const paddingEnd = getComputedStyle(dittoTdElement).paddingInlineEnd;
													dittoTdElement.style.paddingInlineEnd = `calc((${String(Math.round(htmlElementText.getWidth()))}px - ${this.#dittoMarkWidth}px) / 2 + ${paddingEnd})`;
													break;
												}
											}
										}

										dittoTdElement.title = cellText;
										dittoTdElement.textContent = this.#dittoMark;
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
	unConvert(): void {
		for (const undittoTdElement of <NodeListOf<HTMLTableCellElement>>this.#thisElement.querySelectorAll('tbody td')) {
			const undittoCellNode = undittoTdElement.firstChild;
			if (undittoCellNode !== null && undittoCellNode.nodeValue === this.#dittoMark) {
				/* 表示位置戻す */
				if (this.#supportCSSTypedOM) {
					switch ((<CSSKeywordValue>undittoTdElement.computedStyleMap().get('text-align')).value) {
						case 'start': {
							undittoTdElement.attributeStyleMap.delete('padding-inline-start');
							break;
						}
						case 'end': {
							undittoTdElement.attributeStyleMap.delete('padding-inline-end');
							break;
						}
					}
				} else {
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

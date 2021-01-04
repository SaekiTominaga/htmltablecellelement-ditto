# Get the text width (width of the inline box) of the HTMLElement.

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fhtmlelement-text.svg)](https://badge.fury.io/js/%40saekitominaga%2Fhtmlelement-text)

Get the text width (width of the inline box) of the HTMLElement.

## Demo

- [Demo page](https://saekitominaga.github.io/htmlelement-text/demo.html)

## Examples

```
<script type="module">
import HtmlElementText from './dist/HtmlElementText.esm.js';

for (const textElement of document.querySelectorAll('.js-text-width')) {
  const htmlElementText = new HtmlElementText(textElement);
  console.debug(`${htmlElementText.getWidth()}px`);
}
</script>

<span class="js-text-width">Hello world!</span>
```

## Constructor

```
new HtmlElementText(
  thisElement: HTMLElement
)
```

### Parameters

<dl>
<dt>thisElement [required]</dt>
<dd>Target element</dd>
</dl>

## Methods

| Name | Returns | Description |
|-|-|-|
| getWidth(text: string = this.#thisElement.textContent) | {number} Text width in CSS pixels | Get the text width (the width of that inline box) |

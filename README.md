# Display the data cell with the same content as the cell directly above in `<tbody>` with a ditto mark.

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fhtmltablecellelement-ditto.svg)](https://badge.fury.io/js/%40saekitominaga%2Fhtmltablecellelement-ditto)

Display the data cell with the same content as the cell directly above in `<tbody>` with a ditto mark.

- † Does not support tables with horizontal joins by the `colspan` attribute (`rowspan` attribute is supported).
- † The `title` attribute cannot be specified in the `<td>` element (it will be overwritten by this function).

## Demo

- [Demo page](https://saekitominaga.github.io/htmltablecellelement-ditto/demo.html)

## Examples

```HTML
<script type="module">
import TableCellDitto from './dist/TableCellDitto.esm.js';

for (const tableElement of document.querySelectorAll('.js-table-cell-ditto')) {
  const tableCellDitto = new TableCellDitto(tableElement, '"');
  tableCellDitto.convert();
}
</script>

<table class="js-table-cell-ditto">
  <thead>
    <tr>
      <th>header cell</th>
      <th>header cell</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>header cell</th>
      <td>data cell</td>
    </tr>
    <tr>
      <th>header cell</th>
      <td>data cell</td> <!-- This cell is replaced with an ditto mark -->
    </tr>
  </tbody>
</table>
```

## Constructor

```TypeScript
new TableCellDitto(
  thisElement: HTMLTableElement,
  dittoMark = '"'
)
```

### Parameters

<dl>
<dt>thisElement [required]</dt>
<dd>Target element</dd>
<dt>dittoMark [optionnal]</dt>
<dd>Ditto mark (The default value is '"')</dd>
</dl>

## Methods

| Name | Returns | Description |
|-|-|-|
| convert() | {void} | Replace with ditto mark |
| unConvert() | {void} | Stop replacing with ditto mark |

# React TreeGrid

Disclaimer: this is in an alpha stage.

## Getting started

```
npm install
npm start
```

Visit the webpage hosted by `webpack-serve`.
The URL should have been copied to the clipboard.
Otherwise, please inspect the console output.

## High-level design

Accessibility is the design principle for this component.
The design references the WAI-ARIA Authoring Practices on [Grid](https://www.w3.org/TR/wai-aria-practices-1.1/#grid) and [TreeView](https://www.w3.org/TR/wai-aria-practices-1.1/#TreeView).

For 2-dimensional data, a grid layout is desired:

- A `Grid`
  - Many `Row`s
    - Many `GridCell`s
    - Many `ColumnHeader`s
    - Many `RowHeader`s
  - Many `RowGroup`s
    - Many `Row`s

For 2-dimensional data, a tree grid layout is desired:

- TODO: Get this working

## Undecided technical questions:

- Should `renderNode` be a function (i.e. render prop) or a React Pure Function (i.e. an element)?
  - What are the pros and cons of each?

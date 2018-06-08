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

## Thoughts

- Phase 1: Grid has many cells
- Phase 2: A list of grids is a "table"
- Phase 3: A tree has a grid and a list of trees

## Undecided technical questions:

- Should `renderNode` be a function (i.e. render prop) or a React Pure Function (i.e. an element)?
  - What are the pros and cons of each?
- Will the grid -> tree terminology stand the test of time?

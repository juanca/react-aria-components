# React ARIA Components

Disclaimer: this is in an alpha stage.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------- | --------------- | --------------- | --------------- |
| IE11, Edge | last 5 versions | last 5 versions | last 5 versions |

The exported modules are expected to be transpiled with Babel and PostCSS autoprefixer.

## Getting started

```
npm install
npm start
```

Visit the webpage hosted by `webpack-serve`.
The URL should have been copied to the clipboard.
Otherwise, please inspect the console output.

## High-level design

The components available through this module are inspired from the [WAI-ARIA Authoring Practices].
Each component is driven by three principles:

1. A component is accessible.
1. A component can be used in composition.
1. A component has minimal footprint.

### Grid

For 2-dimensional data, a [Grid] layout is desired:

- A `Grid`
  - Many `Row`s
    - Many `GridCell`s
    - Many `ColumnHeader`s
    - Many `RowHeader`s
  - Many `RowGroup`s
    - Many `Row`s

[WAI-ARIA Authoring Practices]: https://www.w3.org/TR/wai-aria-practices-1.1
[Grid]: https://www.w3.org/TR/wai-aria-practices-1.1/#grid

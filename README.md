# React ARIA Components

Disclaimer: this is in an alpha stage.

For a hands-on approach to this library, see the [demo](https://juanca.github.io/react-aria-components).

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge browser" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox browser" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome browser" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari browser" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| ---------- | --------------- | --------------- | --------------- |
| Edge | last 5 versions | last 5 versions | last 5 versions |

The exported modules are expected to be transpiled with Babel and PostCSS autoprefixer. In addition, you may need to use `@babel/preset-env` in an application, depending on the browsers you need to support.

## Getting started

```
npm install
npm start
```

Visit the webpage listed in the output.
The URL should have been copied to the clipboard.
Otherwise, please inspect the console output.

## High-level design

The components available through this module are inspired from the [WAI-ARIA Authoring Practices].
Each component is driven by three principles:

1. A component is accessible.
1. A component can be used in composition (favoring web components interfaces).
1. A component has a minimal footprint.

[WAI-ARIA Authoring Practices]: https://www.w3.org/TR/wai-aria-practices-1.1

## Contributing

Code requirements will be evaluated through peer review.
CI will run tests and linter rules -- see below for running the same scripts locally.
CI will also deploy branches to Github pages -- see CI output for URL.

```
npm test
npm run lint
```

## Docker


1. Install node modules:

    ```
    docker-compose run npm install
    ```

2. Start

    ```
    docker-compose up web
    ```


3. Test / Lint

    ```
    docker-compose run npm test / test:debug / lint
    ```

    For example:

    ```
    docker-compose run npm test listbox
    ```

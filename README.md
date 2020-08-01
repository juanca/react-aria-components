# React ARIA Components

Disclaimer: this is in an alpha stage.

For a hands-on approach to this library, see the [documentation site](https://juanca.github.io/react-aria-components).

## Browsers support

This library publishes uncompiled source code.
It is expected for host applications to set up compilation processes.
For example, there is a [Webpack configuration used for the documentation site](./webpack.config.js).

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

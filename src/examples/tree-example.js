import React from 'react';
import Example from './example.js';
import { Tree, TreeItem } from '../tree';

export default class TreeExample extends React.Component {
  constructor() {
    super();
    this.state = { activeId: '0' };
  }

  render() {
    return (
      <Example title="Tree">
        <h2 id="tree-stuff">
          Fruits
        </h2>
        <Tree
          activeId={this.state.activeId}
          aria-labelledby="tree-stuff"
          onTreeItemActivate={id => this.setState({ activeId: id })}
        >
          <TreeItem id="0" title="Fruits">
            <TreeItem id="0-0" title="Oranges" />
            <TreeItem id="0-1" title="Pineapple" />
            <TreeItem id="0-2" title="Apples">
              <TreeItem id="0-2-0" title="Macintosh" />
              <TreeItem id="0-2-1" title="Granny Smith" />
              <TreeItem id="0-2-2" title="Fiji" />
            </TreeItem>
            <TreeItem id="0-3" title="Bananas" />
          </TreeItem>
          <TreeItem id="1" title="Vegetables">
            <TreeItem id="1-0" title="Podded Vegetables">
              <TreeItem id="1-0-1" title="Lentil" />
              <TreeItem id="1-0-2" title="Pea" />
              <TreeItem id="1-0-3" title="Peanut" />
            </TreeItem>
            <TreeItem id="1-1" title="Bulb and Stem Vegetables">
              <TreeItem id="1-1-0" title="Asparagus" />
              <TreeItem id="1-1-1" title="Celery" />
              <TreeItem id="1-1-2" title="Leek" />
              <TreeItem id="1-1-3" title="Onion" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </Example>
    );
  }
}

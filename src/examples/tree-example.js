import React from 'react';
import Example from './example.js';
import { Tree, TreeItem } from '../tree';

export default function TreeExample() {
  return (
    <Example title="Tree">
      <h2 id="tree-stuff">
        Fruits
      </h2>
      <Tree aria-labelledby="tree-stuff">
        <TreeItem title="Fruits">
          <TreeItem title="Oranges" />
          <TreeItem title="Pineapple" />
          <TreeItem title="Apples">
            <TreeItem title="Macintosh" />
            <TreeItem title="Granny Smith" />
            <TreeItem title="Fiji" />
          </TreeItem>
          <TreeItem title="Bananas" />
        </TreeItem>
        <TreeItem title="Vegetables">
          <TreeItem title="Podded Vegetables">
            <TreeItem title="Lentil" />
            <TreeItem title="Pea" />
            <TreeItem title="Peanut" />
          </TreeItem>
          <TreeItem title="Bulb and Stem Vegetables">
            <TreeItem title="Asparagus" />
            <TreeItem title="Celery" />
            <TreeItem title="Leek" />
            <TreeItem title="Onion" />
          </TreeItem>
        </TreeItem>
      </Tree>
    </Example>
  );
}

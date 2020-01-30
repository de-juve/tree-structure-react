import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import './App.css';
import { Container } from '@material-ui/core';
import { LoadFileComponent } from './components/load-file/load-file.component';
import { TreeComponent } from './components/tree/tree.component';
import { ITreeLeaf } from './models/tree-leaf.model';
import { IRowFileFormatModel } from './models/row-file-format.model';
import TreeHelper from './utils/tree-helper';

export type ChildrenTreeType = Map<string, string[]>;
export type TreeLeafsType = Map<string, ITreeLeaf>;

export interface IAppComponentProps {
}

export interface IAppComponentState {
  childrenTree: ChildrenTreeType,
  leafs: TreeLeafsType;
}

export default class AppComponent extends React.Component<IAppComponentProps, IAppComponentState> {
  constructor(props: IAppComponentProps) {
    super(props);
    this.state = {
      childrenTree: new Map<string, string[]>(),
      leafs: new Map<string, ITreeLeaf>()
    }
  }

  handleSetTree(items: IRowFileFormatModel[]) {
    const {leafs, childrenTree} = TreeHelper.createTree(items, this.state.leafs, this.state.childrenTree);

    this.setState({
      ...this.state,
      childrenTree,
      leafs
    })
  }

  render() {
    return <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <LoadFileComponent onGetFileContent={this.handleSetTree.bind(this)} />
        <TreeComponent rootId={null}
                       childrenTree={this.state.childrenTree}
                       leafs={this.state.leafs}/>
      </Container>
    </div>;
  }
}




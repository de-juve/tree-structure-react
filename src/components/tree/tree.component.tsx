import React from 'react';
import { ChildrenTreeType, TreeLeafsType } from '../../App';
import { createStyles, List, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TreeLeafComponent } from '../tree-leaf/tree-leaf.component';
import { ITreeLeaf } from '../../models/tree-leaf.model';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 720,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);


export interface ITreeComponentProps {
  rootId: string | null
  childrenTree: ChildrenTreeType,
  leafs: TreeLeafsType;
}

export class TreeComponent extends React.Component<ITreeComponentProps, {}> {
  render() {
    const treeItems: JSX.Element[] = [];
    this.props.leafs
      .forEach((leaf, id) => {
        const parent = this.props.leafs.has(leaf.parentId) ? (this.props.leafs.get(leaf.parentId) as ITreeLeaf) : null;
        const hasParent = !!parent && !parent.isRemoved;
        if ((this.props.rootId === null && !hasParent) || this.props.rootId === leaf.parentId ) {
          treeItems.push(<TreeLeafComponent key={leaf.isRemoved ? -leaf.id : leaf.id}
                                            leaf={leaf}
                                            childrenTree={this.props.childrenTree}
                                            items={this.props.leafs}/>)
        }
      });
    return <StyledTreeComponent rootId={this.props.rootId} children={treeItems}/>
  }
}

interface IStyledTreeComponentProps {
  rootId: string | null,
  children: JSX.Element[]
}

const StyledTreeComponent: React.FC<IStyledTreeComponentProps> = (props: IStyledTreeComponentProps) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List className={props.rootId === null ? classes.root : classes.nested}>
        {
          props.rootId === null && props.children.length === 0 ?
            'Нажмите "Загрузить файл"' : props.children
        }
      </List>
    </React.Fragment>)
};

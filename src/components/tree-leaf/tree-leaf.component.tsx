import { ChildrenTreeType, TreeLeafsType } from '../../App';
import React from 'react';
import { Avatar, Collapse, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { Edit, ExpandLess, ExpandMore } from '@material-ui/icons';
import { TreeComponent } from '../tree/tree.component';
import { ConditionalWrapperComponent } from '../conditional-wrapper/conditional-wrapper.component';
import { ITreeLeaf } from '../../models/tree-leaf.model';
import { TreeLeafCommentComponent } from '../tree-leaf-comment/tree-leaf-comment.component';
import TreeHelper from '../../utils/tree-helper';

export interface ITreeLeafComponentProps {
  leaf: ITreeLeaf;
  childrenTree: ChildrenTreeType;
  items: TreeLeafsType;
}

export interface ITreeLeafComponentState {
  isOpen: boolean;
  isEditing: boolean;
  children: ITreeLeaf[];
  comment: string;
}

export class TreeLeafComponent extends React.Component<ITreeLeafComponentProps, ITreeLeafComponentState> {
  constructor(props: ITreeLeafComponentProps) {
    super(props);
    const children = this.initChildren();
    let comment = this.initComment();
    this.state = {
      isOpen: false,
      isEditing: false,
      children,
      comment
    };
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleShowComment = this.handleShowComment.bind(this);
    this.handleHideComment = this.handleHideComment.bind(this);
  }

  private initChildren() {
    return TreeHelper.getLeafChildren(this.props.leaf, this.props.childrenTree, this.props.items);
  }

  private initComment() {
    return TreeHelper.getLeafComment(this.props.leaf);
  }

  componentDidUpdate(prevProps: Readonly<ITreeLeafComponentProps>, prevState: Readonly<ITreeLeafComponentState>, snapshot?: any): void {
    if (TreeHelper.getTreeLeafUID(prevProps.leaf) !== TreeHelper.getTreeLeafUID(this.props.leaf) || prevProps.childrenTree !== this.props.childrenTree) {
      const children = this.initChildren();
      let comment = this.initComment();
      this.setState({
        ...this.state,
        isEditing: false,
        isOpen: children.length > 0 && this.state.isOpen,
        children,
        comment
      });
    }
  }

  handleCollapse() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    })
  }

  handleShowComment(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      ...this.state,
      isEditing: !this.state.isEditing
    })
  }

  handleHideComment(e: React.MouseEvent, comment: string) {
    TreeHelper.setLeafComment(this.props.leaf, comment);
    this.setState({
      ...this.state,
      isEditing: !this.state.isEditing,
      comment
    })
  }

  render() {
    return (
      <React.Fragment>
        <ConditionalWrapperComponent condition={this.state.children.length > 0}
                                     wrapperTrue={(children: React.ReactNode) =>
                                       <ListItem component='button' onClick={this.handleCollapse}>{children}</ListItem>}
                                     wrapperFalse={(children: React.ReactNode) =>
                                       <ListItem component='div'>{children}</ListItem>}>
          <Tooltip title={this.state.comment}>
            <ListItemAvatar>
              <Avatar>
                {this.props.leaf.id}
              </Avatar>
            </ListItemAvatar>
          </Tooltip>
          <ListItemText primary={
            <Typography variant="h6"
                        style={{ color: this.props.leaf.isNew ? 'green' :
                            this.props.leaf.isRenamed ? 'orange' :
                              this.props.leaf.isRemoved ? 'red' : '' }}>{this.props.leaf.name}</Typography>
          }
                        secondary={
                          this.props.leaf.isNew ? 'новый' :
                            this.props.leaf.isRenamed ? 'переименован' :
                              this.props.leaf.isRemoved ? 'удален' : ''
                        }/>
          {this.state.isEditing ? '' : <Edit onClick={this.handleShowComment}/>}
          {this.state.children.length > 0 ? (this.state.isOpen ? <ExpandLess/> : <ExpandMore/>) : ''}

        </ConditionalWrapperComponent>
        <Collapse in={this.state.isEditing} timeout="auto" unmountOnExit>
          <TreeLeafCommentComponent comment={this.state.comment} onHide={this.handleHideComment}/>
        </Collapse>
        {
          !this.props.leaf.isRemoved &&
          <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
              <TreeComponent rootId={this.props.leaf.id}
                             childrenTree={this.props.childrenTree}
                             leafs={this.props.items}/>
          </Collapse>
        }

      </React.Fragment>
    )
  }
}

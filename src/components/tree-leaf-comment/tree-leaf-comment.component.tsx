import React from 'react';
import { TextField } from '@material-ui/core';
import { Cancel, Delete, Save } from '@material-ui/icons';

export interface ITreeLeafCommentComponentProps {
  comment: string | null;
  onHide: (e: React.MouseEvent, comment: string) => void
}

export interface ITreeLeafCommentComponentState {
  comment: string;
}

export class TreeLeafCommentComponent extends React.Component<ITreeLeafCommentComponentProps, ITreeLeafCommentComponentState> {
  constructor(props: ITreeLeafCommentComponentProps) {
    super(props);
    this.state = {
      comment: !!props.comment && props.comment !== '' ? props.comment : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      comment: event.target.value
    });
  }

  handleSave(e: React.MouseEvent) {
    this.props.onHide(e, this.state.comment);
  }

  handleDelete(e: React.MouseEvent) {
    this.setState({
      ...this.state,
      comment: ''
    });
    this.props.onHide(e, '');
  }

  handleCancel(e: React.MouseEvent) {
    this.props.onHide(e, this.state.comment);
  }

  render() {
    return (
      <form  noValidate autoComplete="off">
        <div>
          <TextField id="standard-name" label="Комментарий" value={this.state.comment} onChange={this.handleChange} />
          <Save color="action" onClick={this.handleSave}/>
          <Delete color="error" onClick={this.handleDelete}/>
          <Cancel color="primary" onClick={this.handleCancel}/>
        </div>
      </form>
    );
  }
}

import React from 'react';
import { IRowFileFormatModel } from '../../models/row-file-format.model';
import InputFileComponent from '../input-file/input-file.component';


export interface ILoadFileComponentProps {
  onGetFileContent: (e: IRowFileFormatModel[]) => void
}

export interface ILoadFileComponentState {
  fileName: string
}

export class LoadFileComponent extends React.Component<ILoadFileComponentProps, ILoadFileComponentState> {
  constructor(props: ILoadFileComponentProps) {
    super(props);
    this.state = {
      fileName: ''
    }
  }

  handleChangeFile(event: React.ChangeEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      if (file.size > 1048576) {
        this.setState({
          ...this.state,
          fileName: 'Недопустимый размер файла'
        });
        return;
      } else if (['text/csv'].indexOf(file.type) < 0) {
        this.setState({
          ...this.state,
          fileName: 'Недопустимый тип файл'
        });
        return;
      } else {
        this.setState({
          ...this.state,
          fileName: file.name
        });
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const result = e.target.result as string;
          const lines = result
            .split(/\r\n|\n/)
            .filter(line => line.length > 0)
            .map((line: string) => {
              const [id, name, parentId] = line.split(',');
              return {id, name, parentId};
            });
          this.props.onGetFileContent(lines);
        };
        reader.readAsText(file);
        target.value = '';
      }
    }
  }


  render() {
    return <div>
      <InputFileComponent onChange={this.handleChangeFile.bind(this)}/> {this.state.fileName}
    </div>;
  }
}

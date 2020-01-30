import { IRowFileFormatModel } from './row-file-format.model';

export interface ITreeLeaf extends IRowFileFormatModel{
  isNew: boolean;
  isRenamed: boolean;
  isRemoved: boolean;
}

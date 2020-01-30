import { ITreeLeaf } from '../models/tree-leaf.model';
import { ChildrenTreeType, TreeLeafsType } from '../App';
import LocalStorageHelper from './local-storage-helper';
import { IRowFileFormatModel } from '../models/row-file-format.model';

export default class TreeHelper {
  public static getTreeLeafUID(leaf: ITreeLeaf): string {
    if (!leaf) {
      return '';
    }
    return `${leaf.id}-${leaf.name}-${leaf.parentId}`;
  }

  public static createTree(items: IRowFileFormatModel[], prevLeafs: TreeLeafsType, prevChildrenTree: ChildrenTreeType): {leafs: TreeLeafsType, childrenTree: ChildrenTreeType} {
    const childrenTree: ChildrenTreeType = new Map<string, string[]>();
    const leafs: TreeLeafsType = new Map<string, ITreeLeaf>();

    items.forEach((item) => {
      let children = childrenTree.has(item.parentId) ? (childrenTree.get(item.parentId) as string[]) : [];
      children.push(item.id);
      childrenTree.set(item.parentId, children);

      let newItem: ITreeLeaf = {
        ...item,
        isNew: false,
        isRenamed: false,
        isRemoved: false,
      };

      const oldChildren = prevChildrenTree.has(item.parentId) ? (prevChildrenTree.get(item.parentId) as string[]) : [];
      if (oldChildren.includes(item.id)) {
        const oldItem = prevLeafs.get(item.id) as ITreeLeaf;
        newItem.isRenamed = newItem.name !== oldItem.name && !oldItem.isRemoved;
      } else if (oldChildren.filter(id => !Number.isNaN(parseInt(id, 10))).length > 0) {
        newItem.isNew = true;
      }
      leafs.set(newItem.id, newItem);
    });

    // Добавление удаленных узлов
    items.forEach(item => {
      const children = childrenTree.has(item.parentId) ? (childrenTree.get(item.parentId) as string[]) : [];
      const prevChildren = prevChildrenTree.has(item.parentId) ? (prevChildrenTree.get(item.parentId) as string[]) : [];
      prevChildren
        .filter(id => !Number.isNaN(parseInt(id, 10)) && ! children.includes(id))
        .map(id => prevLeafs.get(id) as ITreeLeaf)
        .forEach(oldItem => {
          leafs.set(TreeHelper.getPrevLeafKey(oldItem), {
            ...oldItem,
            isNew: false,
            isRenamed: false,
            isRemoved: true
          });
          children.push(TreeHelper.getPrevLeafKey(oldItem));
          childrenTree.set(item.parentId, children);
        })
    });
    return {leafs, childrenTree};
  }

  public static getPrevLeafKey(leaf: ITreeLeaf) {
    return `prev-${leaf.id}`;
  }

  public static getLeafChildren(leaf: ITreeLeaf, childrenTree: ChildrenTreeType, leafs: TreeLeafsType): ITreeLeaf[] {
    if (!leaf || !childrenTree) {
      return [];
    }
    const childrenIds = leaf.isRemoved ? [] : (childrenTree.get(leaf.id) as string[]);
    const children: ITreeLeaf[] = !!childrenIds ? childrenIds.map(id => leafs.get(id) as ITreeLeaf) : [];
    return children;
  }

  public static getLeafComment(leaf: ITreeLeaf) {
    if (!leaf) {
      return '';
    }
    let comment = '';
    const value = LocalStorageHelper.get(TreeHelper.getTreeLeafUID(leaf));
    if (value !== null) {
      comment = value;
    }
    return comment;
  }

  public static setLeafComment(leaf: ITreeLeaf, comment: string) {
    if (!leaf) {
      return;
    }
    if (!comment || comment === '') {
      LocalStorageHelper.remove(TreeHelper.getTreeLeafUID(leaf));
    } else {
      LocalStorageHelper.set(TreeHelper.getTreeLeafUID(leaf), comment);
    }
  }
}

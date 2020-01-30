import React from 'react';
import TreeHelper from './utils/tree-helper';
import { ITreeLeaf } from './models/tree-leaf.model';
import { IRowFileFormatModel } from './models/row-file-format.model';
import { ChildrenTreeType, TreeLeafsType } from './App';

/*test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

const mockData = {
  init: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '0'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'}
  ],
  rename: [
    {id: '0', name: "main*", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '0'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'}
  ],
  renameChild: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1*", parentId: '0'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'}
  ],
  changeChildrenId: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '0'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '4', name: "sub1-1", parentId: '1'},
    {id: '3', name: "sub1-2", parentId: '1'}
  ],
  renameChildAndChangeChildParent: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1*", parentId: '-1'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'}
  ],

  addRoot: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '0'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'},
    {id: '5', name: "main2", parentId: '-1'}
  ],
  addChild: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '0'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'},
    {id: '5', name: "sub3", parentId: '0'}
  ],

  removeChild: [
    {id:'0', name: "main", parentId: '-1'},
    {id:'1', name: "sub1", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'},
  ],
  removeChildAndMoveChildren: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub2-1", parentId: '2'},
    {id: '4', name: "sub2-2", parentId: '2'}
  ],
  removeChildAndChangeChildrenId: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '0'},
    {id: '2', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'},
  ],
  changeChildParent: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '-1'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '1'},
    {id: '4', name: "sub1-2", parentId: '1'}
  ],

  moveChildren: [
    {id: '0', name: "main", parentId: '-1'},
    {id: '1', name: "sub1", parentId: '0'},
    {id: '2', name: "sub2", parentId: '0'},
    {id: '3', name: "sub1-1", parentId: '2'},
    {id: '4', name: "sub1-2", parentId: '2'}
  ]
};

describe('Tree init', () => {
  test('check size', () => {
    Object.values(mockData).forEach(items => {
      const {leafs, childrenTree} = TreeHelper.createTree(items, new Map<string, ITreeLeaf>(), new Map<string, string[]>());
      expect(leafs.size).toEqual(items.length);
      expect(childrenTree.size).toEqual(Array.from(new Set(items.map(i => i.parentId))).length);
    })
  });

  test('check nodes with child', () => {
    Object.values(mockData).forEach(items => {
      const {leafs, childrenTree} = TreeHelper.createTree(items, new Map<string, ITreeLeaf>(), new Map<string, string[]>());
      Array.from(new Set(items.map(i => i.parentId)))
        .forEach(parentId => expect(childrenTree.has(parentId)).toEqual(true));
    })
  });

  test('check nodes without child', () => {
    Object.values(mockData).forEach(items => {
      const {leafs, childrenTree} = TreeHelper.createTree(items, new Map<string, ITreeLeaf>(), new Map<string, string[]>());
      const parentIds = Array.from(new Set(items.map(i => i.parentId)));
      items.filter(item => !parentIds.includes(item.id))
        .map(item => item.id)
        .forEach(id => expect(childrenTree.has(id)).toEqual(false));
    })
  });

  test('check nodes children', () => {
    Object.values(mockData).forEach(items => {
      const {leafs, childrenTree} = TreeHelper.createTree(items, new Map<string, ITreeLeaf>(), new Map<string, string[]>());
      const parentIds = Array.from(new Set(items.map(i => i.parentId)));
      Array.from(new Set(items.map(i => i.parentId)))
        .forEach(parentId => expect(childrenTree.get(parentId)).toEqual(items.filter(i => i.parentId === parentId).map(i => i.id)));
    })
  });
});


let prevLeafs: TreeLeafsType;
let prevChildrenTree: ChildrenTreeType;

beforeAll(() => {
  const {leafs, childrenTree} = TreeHelper.createTree(mockData.init, new Map<string, ITreeLeaf>(), new Map<string, string[]>());
  prevLeafs = leafs;
  prevChildrenTree = childrenTree;
});

describe('Rename tree nodes', () => {

  test('not rename root node', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.rename, prevLeafs, prevChildrenTree);

    expect((leafs.get('0') as ITreeLeaf).isRenamed).toEqual(true);

    const {leafs: newLeafs, childrenTree: newChildrenTree} = TreeHelper.createTree(mockData.rename, leafs, childrenTree);

    expect((newLeafs.get('0') as ITreeLeaf).isRenamed).toEqual(false);
  });

  test('rename root node', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.rename, prevLeafs, prevChildrenTree);

    expect((leafs.get('0') as ITreeLeaf).isRenamed).toEqual(true);
  });

  test('rename child node', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.renameChild, prevLeafs, prevChildrenTree);

    expect((leafs.get('1') as ITreeLeaf).isRenamed).toEqual(true);
  });

  test('change children node ids', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.changeChildrenId, prevLeafs, prevChildrenTree);

    expect((leafs.get('3') as ITreeLeaf).isNew).toEqual(false);
    expect((leafs.get('3') as ITreeLeaf).isRenamed).toEqual(true);
    expect((leafs.get('3') as ITreeLeaf).isRemoved).toEqual(false);

    expect((leafs.get('4') as ITreeLeaf).isNew).toEqual(false);
    expect((leafs.get('4') as ITreeLeaf).isRenamed).toEqual(true);
    expect((leafs.get('4') as ITreeLeaf).isRemoved).toEqual(false);
  });

  test('rename child with change parentId', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.renameChildAndChangeChildParent, prevLeafs, prevChildrenTree);

    const removed = leafs.get(TreeHelper.getPrevLeafKey(prevLeafs.get('1') as ITreeLeaf)) as ITreeLeaf;
    const added = leafs.get('1') as ITreeLeaf;

    expect(removed.isNew).toEqual(false);
    expect(removed.isRenamed).toEqual(false);
    expect(removed.isRemoved).toEqual(true);

    expect(added.isNew).toEqual(true);
    expect(added.isRenamed).toEqual(false);
    expect(added.isRemoved).toEqual(false);
  })
});

describe('Add tree nodes', () => {
  test('add root node', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.addRoot, prevLeafs, prevChildrenTree);
    expect((leafs.get('5') as ITreeLeaf).isNew).toEqual(true);
  });

  test('add child node', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.addChild, prevLeafs, prevChildrenTree);
    expect((leafs.get('5') as ITreeLeaf).isNew).toEqual(true);
    expect((childrenTree.get('0') as string[]).length).toEqual((prevChildrenTree.get('0') as string[]).length + 1);
  });
});

describe('Remove tree nodes', () => {
  test('remove child node', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.removeChild, prevLeafs, prevChildrenTree);
    expect(prevLeafs.has('2')).toEqual(true);
    expect(leafs.has('2')).toEqual(false);

    expect(leafs.has(TreeHelper.getPrevLeafKey(prevLeafs.get('2') as ITreeLeaf))).toEqual(true);
    const removedChild = leafs.get(TreeHelper.getPrevLeafKey(prevLeafs.get('2') as ITreeLeaf)) as ITreeLeaf;
    expect(removedChild.isNew).toEqual(false);
    expect(removedChild.isRenamed).toEqual(false);
    expect(removedChild.isRemoved).toEqual(true);
  });

  test('remove child node and move children', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.removeChildAndMoveChildren, prevLeafs, prevChildrenTree);

    expect(leafs.has(TreeHelper.getPrevLeafKey(prevLeafs.get('1') as ITreeLeaf))).toEqual(true);
    const removedChild = leafs.get(TreeHelper.getPrevLeafKey(prevLeafs.get('1') as ITreeLeaf)) as ITreeLeaf;
    expect(removedChild.isRemoved).toEqual(true);

    expect(prevChildrenTree.has('1')).toEqual(true);
    expect(prevChildrenTree.has('2')).toEqual(false);
    expect(childrenTree.has('1')).toEqual(false);
    expect(childrenTree.has('2')).toEqual(true);
    expect((childrenTree.get('2') as string[]).length).toEqual((prevChildrenTree.get('1') as string[]).length);
  });

  test('remove child node and move children and change theirs id', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.removeChildAndChangeChildrenId, prevLeafs, prevChildrenTree);

    expect(prevLeafs.has('2')).toEqual(true);
    expect(leafs.has('2')).toEqual(true);

    expect(leafs.has(TreeHelper.getPrevLeafKey(prevLeafs.get('2') as ITreeLeaf))).toEqual(true);
    const removedChild = leafs.get(TreeHelper.getPrevLeafKey(prevLeafs.get('2') as ITreeLeaf)) as ITreeLeaf;
    expect(removedChild.isNew).toEqual(false);
    expect(removedChild.isRenamed).toEqual(false);
    expect(removedChild.isRemoved).toEqual(true);

    const newChild = leafs.get('2') as ITreeLeaf;
    expect(newChild.isNew).toEqual(true);
    expect(newChild.isRenamed).toEqual(false);
    expect(newChild.isRemoved).toEqual(false);
  });

  test('change parent of child', () => {
    const {leafs, childrenTree} = TreeHelper.createTree(mockData.changeChildParent, prevLeafs, prevChildrenTree);

    const child = leafs.get('1') as ITreeLeaf;
    expect(child.isNew).toEqual(true);
    expect(child.isRenamed).toEqual(false);
    expect(child.isRemoved).toEqual(false);

    const removed = leafs.get((TreeHelper.getPrevLeafKey(prevLeafs.get('1') as ITreeLeaf))) as ITreeLeaf;
    expect(removed.isNew).toEqual(false);
    expect(removed.isRenamed).toEqual(false);
    expect(removed.isRemoved).toEqual(true);

    expect((prevChildrenTree.get('-1') as string[]).length).toEqual(1);
    expect((childrenTree.get('-1') as string[]).length).toEqual((prevChildrenTree.get('-1') as string[]).length + 1);
  })
});


import { LinkedListItem } from "./LinkedList.js";
import FlowyTreeNode from './FlowyTreeNode.js'
import Queue from "./Queue.js";

// TODO: handle full trees
export default class FlowyTree {
  // entries: Map<EntryId, String>
  // root: FlowyTreeNode
  // entryItems: Map<EntryId, LinkedListItem<FlowyTreeNode>>
  constructor(entries, root) {
    this.entries = entries;
    // this.root = new FlowyTreeNode(null, null, entriesList);
    this.root = root;

    let q = new Queue();
    let entryItems = {};
    let item;
    console.log("## ## ## new FlowyTree, (entries, root) = ", entries, root);
    this.root.getChildNodeArray().forEach(it => q.add(it));
    while (!q.isEmpty()) {
      item = q.remove();
      entryItems[item.value.getId()] = item;
      item.value.getChildNodeArray().forEach(it => q.add(it));
    }

    console.log("## ## ## in new FlowyTree, entryItems = ", entryItems);
    this.entryItems = entryItems;
  }

  getEntries() {
    return this.entries;
  }

  getEntryItems() {
    return this.entryItems;
  }

  getRoot() {
    return this.root;
  }

  getEntryTexts() {
    return this.root.getChildren().toArray().map(item => this.entries[item.value.getId()])
  }

  hasEntryAbove(entryId) {
    console.log("_____:: hasEntryAbove, (entryId, item) = ", entryId, this.entryItems[entryId]);
  }
  hasEntryBelow(entryId) {
    console.log("_____:: hasEntryBelow, (entryId, item) = ", entryId, this.entryItems[entryId]);
  }

  getEntryByRow(index) {
    let entryId = this.root.getChildren().get(index).value.getId();
    return this.entries[entryId];
  }

  setEntry(index, value) {
    let entryId = this.root.getChildren().get(index).value.getId();
    this.entries[entryId] = value;
  }

  insertAt(index, newEntry) {
    let n = this.root.getChildren().size;
    if (index > n) {
      throw `insertAt: index ${index} is too large, there are only ${n} items`
    }

    let existingIds = Object.keys(this.entries).map(id => parseInt(id));
    let newId = Math.max(...existingIds) + 1;
    this.entries[newId] = newEntry;

    let newNode = new LinkedListItem(new FlowyTreeNode(newId, null));
    let prevNode = this.root.getChildren().get(index - 1);
    prevNode.append(newNode);
  }

  deleteAt(index) {
    let node = this.root.getChildren().get(index);
    delete this.entries[node.value.getId()];
    node.detach();
  }

  size() {
    return this.entries.length;
  }
}

class Node {

  id: number;
  name: string;
  recurrentValue: number;
  expensesValue: number;
  children: any[];
  
  constructor(id: number, name: string, recurrentValue: number, expensesValue: number) {
    this.id = id;
    this.name = name;
    this.recurrentValue = recurrentValue;
    this.expensesValue = expensesValue;
    this.children = [];
  }
}

export function buildTree(data) {
  const lookup = {};
  const root = new Node(null, "root", null, null);
  data.forEach(item => {    
    lookup[item.id] = new Node(item.id, item.name, item.recurrent_value, item.expenses_value);
  });

  data.forEach(item => {
    const node = lookup[item.id];
    const parentId = item.pai;
    if (parentId) {
      const parent = lookup[parentId];
      parent.children.push(node);
    } else {
      root.children.push(node);
    }
  });
  
  return root;
}
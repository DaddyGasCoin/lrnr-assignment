

/*
 Helper function to add node;recursivily traverse tree
 to find node with key and add newNode to to its children array
*/
const recurseTree = (tree, key, newNode) => {
    if (tree.key === key) {
        tree.children.push(newNode)
        return tree
    }

    if (!tree.children) {
        return tree
    }
    if (tree.children.length > 0) {
        tree.children = tree.children.map(child => recurseTree(child, key, newNode));
    }
    return tree;
}

const addNode = (tree, key, newNode) => {
    return tree.map(obj => recurseTree(obj, key, newNode));
}

const deleteNode = (tree, key) => {
    return tree.filter(a => a.key !== key).map(e => {
        return { ...e, children: deleteNode(e.children || [], key) }
    });
}

export { addNode, deleteNode }
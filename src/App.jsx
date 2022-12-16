import { useState } from "react"
import SidebarItems from "../Components/Menu"
import uniqid from "uniqid";
function App() {

  /*tree structure for the menu;contains parent node and child node,
    all nodes are objects, only parent nodes contaiain children property
  */
  const data = [{ key: 1, title: 'parent', children: [{ key: 3, title: 'parent', children: [] }] },
  { key: 2, title: 'parent', children: [] }]

  const [tree, setTree] = useState(data)


  //adds new node to tree
  const updateObject = (obj, id, updated) => {
    if (obj.key === id) {
      obj.children.push(updated)
      return obj
    }

    if (!obj.children) {
      return obj
    }
    if (obj.children.length > 0) {
      obj.children = obj.children.map(child => updateObject(child, id, updated));
    }
    return obj;
  };

  const addChild = (key, data) => {
    let obj = [...tree]
    const node = {
      key: uniqid(),
      title: data
    }
    obj = obj.map(obj => updateObject(obj, key, node));
    setTree(obj)
  }


  return (
    <div className="App">
      <SidebarItems data={tree} addChild={addChild} />
    </div>
  )
}

export default App


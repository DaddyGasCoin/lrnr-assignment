import { useState } from "react"
import SidebarItems from "../Components/Menu"
import uniqid from "uniqid";
import { addNode, deleteNode } from "../util/manageTree";
function App() {

  /*tree structure for the menu;contains parent node and child node,
    all nodes are objects, only parent nodes contaiain children property
  */
  const data = [{ key: 1, title: 'parent', children: [{ key: 3, title: 'parent', children: [] }] },
  { key: 2, title: 'parent', children: [] }]

  const [tree, setTree] = useState(data)

  const manageData = (key, data, del_bool) => {
    let obj = [...tree]

    if (del_bool) {
      obj = deleteNode(obj, key)
      setTree(obj)
    }

    else {
      const node = {
        key: uniqid(),
        title: data
      }
      obj = addNode(obj, key, node)
      setTree(obj)
    }

  }


  return (
    <div className="App">
      <SidebarItems data={tree} manageData={manageData} />
    </div>
  )
}

export default App


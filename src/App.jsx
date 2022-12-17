import { useEffect, useState } from "react"
import SidebarItems from "../Components/Menu"
import ShowNodeContent from "../Components/ShowNodeContent"
import uniqid from "uniqid";
import { addNode, deleteNode } from "../util/manageTree";
function App() {

  /*tree structure for the menu;contains parent node and child node,
    all nodes are objects, only parent nodes contaiain children property
  */
  const data = [{ key: 1, title: 'parent', children: [{ key: 3, title: 'parent', children: [] }] },
  { key: 2, title: 'parent', children: [] }]

  const [tree, setTree] = useState(data)
  const [viewNode, setViewNode] = useState(false)

  useEffect(() => {

    const db = localStorage.getItem('db')
    if (!db) {
      localStorage.setItem('db', JSON.stringify(data))
    }
    else {
      setTree(JSON.parse(db))
    }
  }, [])

  const viewNodeHandler = (key) => {
    setViewNode(key)
  }

  const manageData = (key, data, del_bool, parent_bool) => {
    let obj = [...tree]
    if (del_bool) {
      obj = deleteNode(obj, key)
      setTree(obj)
      localStorage.removeItem(key)
    }

    else {
      const node = {
        key: uniqid(),
        title: data
      }

      if (parent_bool) {
        node.children = []
      }

      obj = addNode(obj, key, node)
      setTree(obj)
    }
    localStorage.setItem('db', JSON.stringify(obj))
  }


  return (
    <div className="App h-screen">
      <div className="flex flex-row p-2 ">
        <SidebarItems data={tree} manageData={manageData} nodeHandler={viewNodeHandler} />
        {viewNode ? <ShowNodeContent id={viewNode} /> : null}

      </div>
    </div>
  )
}

export default App


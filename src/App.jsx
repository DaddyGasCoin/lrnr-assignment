import { useEffect, useState } from "react"
import SidebarItems from "../Components/Menu"
import ShowNodeContent from "../Components/ShowNodeContent"
import uniqid from "uniqid";
import { addNode, deleteNode } from "../util/manageTree";
import DisplayHeader from "../Components/DisplayHeader";
import { sampledb, samplenode } from "../util/SampleData";
function App() {

  /*tree structure for the menu;contains parent node and child node,
    all nodes are objects, only parent nodes contaiain children property
  */
  const data = JSON.parse(sampledb)
  const nodeData = samplenode
  const [tree, setTree] = useState(data)
  const [viewNode, setViewNode] = useState(false)

  useEffect(() => {
    /*
        checks in local storeage if db already exists
        if no use sample data and store in db
    */
    const db = localStorage.getItem('db')
    if (!db) {
      localStorage.setItem('db', JSON.stringify(data))
      for (const y in nodeData) {
        localStorage.setItem(y, nodeData[y])
      }
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
      <DisplayHeader />
      <div className="flex flex-row p-3 gap-4 ">
        <SidebarItems data={tree} manageData={manageData} nodeHandler={viewNodeHandler} />
        {viewNode ? <ShowNodeContent id={viewNode} /> : null}
      </div>
    </div>
  )
}

export default App


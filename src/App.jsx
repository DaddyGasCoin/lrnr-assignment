import SidebarItems from "../Components/Menu"
function App() {

  //Sample data
  const data = [
    {
      key: 'sub1',
      title: 'Parent Node',
      icon: 'user',
      children: [
        {
          key: '1',
          title: 'Child Node 1',
          children: [
            {
              key: '1.1',
              title: 'GrandChild Node 1',
            },
            {
              key: '1.2',
              title: 'CrandChild Node 2',
            },
            {
              key: '1.3',
              title: 'GrandChild Node 3',
            },
          ],
        },
        {
          key: '2',
          title: 'Child Node 2',
        },
        {
          key: '3',
          title: 'Child Node 3',
        },
      ],
    },
    {
      key: 'sub2',
      title: 'Parent Node 2',
      icon: 'laptop',
      children: [
        {
          key: '4',
          title: 'Child Node 1',
        },
        {
          key: '5',
          title: 'Child Node 2',
        },
        {
          key: '6',
          title: 'Child Node 3',
        },
      ],
    },
  ]

  return (
    <div className="App">
      <SidebarItems data={data} />
    </div>
  )
}

export default App


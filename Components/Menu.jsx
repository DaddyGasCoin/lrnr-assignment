
import { Menu, Tooltip, Button, Input, Popover, Form } from 'antd';
import { PlusOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react';

function SidebarItems(props) {
   const { data, manageData } = props;
   const [key, setKey] = useState()

   //Popup to add new parent node in menue
   const [form] = Form.useForm()
   const onFinish = (values) => {
      const title = values.title
      form.resetFields()
      manageData(key, title)

   };
   const addItemForm = (
      <div>
         <Form
            form={form}
            layout={"inline"}
            name="basic"
            labelCol={{
               span: 1,
            }}
            wrapperCol={{
               span: 16,
            }}
            onFinish={onFinish}
         >
            <Form.Item
               label={<span></span>}
               name="title"
            >
               <Input />
            </Form.Item>
            <Form.Item
               wrapperCol={{
                  offset: 1,
                  span: 16,
               }}
            >
               <Button icon={<CheckCircleOutlined />} htmlType="submit">
               </Button>
            </Form.Item>
         </Form>
      </div>
   )

   //Checks if item is a parent or child node
   function renderMenu(menu) {
      return menu.map(item => {
         if (item.children) {
            return (
               <Menu.SubMenu
                  key={item.key}
                  title={
                     // Displays Node name and buttons to add or delete node
                     <div style={{
                        display: 'flex', flexDirection: 'row', gap: '10px',
                        alignItems: "center", justifyContent: "space-between",
                        marginRight: '3px'
                     }}>
                        <span>{item.title}</span>
                        <div className="">
                           <Tooltip title="Add item">
                              <Popover content={addItemForm} placement="right" trigger="click">
                                 <Button icon={<PlusOutlined />} size='small'
                                    onClick={() => setKey(item.key)} />
                              </Popover>
                           </Tooltip>
                           <Tooltip title="Delete node">
                              <Popover content={addItemForm} placement="right" trigger="click">
                                 <Button icon={<DeleteOutlined />} size='small'
                                    onClick={() => manageData(item.key, '', 'delete')} />
                              </Popover>
                           </Tooltip>
                        </div>


                     </div>
                  }
               >
                  {renderMenu(item.children)}
               </Menu.SubMenu>
            );
         }

         return (
            <Menu.Item key={item.key}>
               <div style={{
                  display: 'flex', flexDirection: 'row', gap: '10px',
                  alignItems: "center", justifyContent: "space-between",
                  marginRight: '3px'
               }}>
                  <span>{item.title}</span>
                  <Tooltip title="Delete node">
                     <Popover content={addItemForm} placement="right" trigger="click">
                        <Button icon={<DeleteOutlined />} size='small'
                           onClick={() => manageData(item.key, '', 'delete')} />
                     </Popover>
                  </Tooltip>
               </div>
            </Menu.Item>
         );
      });
   }

   return (
      <Menu mode="inline"
         defaultSelectedKeys={['1']}
         defaultOpenKeys={['sub1']}
         style={{ height: '100%', borderRight: 0, width: '250px' }}>
         {renderMenu(data)}
      </Menu>
   );
}

export default SidebarItems



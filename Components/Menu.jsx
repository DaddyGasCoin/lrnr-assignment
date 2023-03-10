
import { Menu, Tooltip, Button, Input, Popover, Form, Checkbox } from 'antd';
import { PlusOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { navItems } from './menucomponents/menuNavItems';

function SidebarItems(props) {
   const { data, manageData, nodeHandler } = props;
   const [key, setKey] = useState()

   //Popup to add new node in menue
   const [form] = Form.useForm()

   const onFinish = (values) => {
      const title = values.title
      form.resetFields()
      //check if node is parent or child
      if (values.Parent) {
         manageData(key, title, '', 'True')
      }
      else {
         manageData(key, title)
      }
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
               name="Parent"
               valuePropName="checked"
               wrapperCol={{
                  offset: 1,
                  span: 10,
               }}
            >
               <Checkbox>Parent</Checkbox>
            </Form.Item>
            <Form.Item
               wrapperCol={{
                  offset: 1,
                  span: 16,
               }}
            >
               <Button onClick={(e) => e.stopPropagation()} icon={<CheckCircleOutlined />} htmlType="submit">
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
                     <div className='key-container' onClick={(() => nodeHandler(item.key))}>
                        <span>{item.title}</span>
                        <div>
                           <Tooltip title="Add item">
                              <Popover content={addItemForm} placement="right" trigger="click">
                                 <Button icon={<PlusOutlined />} size='small'
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       setKey(item.key)
                                    }} />
                              </Popover>
                           </Tooltip>

                           <Tooltip title="Delete node">
                              <Popover content={addItemForm} placement="right" trigger="click">
                                 <Button icon={<DeleteOutlined />} size='small'
                                    onClick={(e) => {
                                       e.stopPropagation();
                                       manageData(item.key, '', 'delete')
                                    }} />
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
               <div className="key-container" onClick={(() => nodeHandler(item.key))}>
                  <span>{item.title}</span>
                  <Tooltip title="Delete node">
                     <Popover content={addItemForm} placement="right" trigger="click">
                        <Button icon={<DeleteOutlined />} size='small'
                           onClick={(e) => {
                              e.stopPropagation();
                              manageData(item.key, '', 'delete')
                           }} />
                     </Popover>
                  </Tooltip>
               </div>
            </Menu.Item>
         );
      });
   }

   return (
      <div className='menu-container'>
         <Menu mode="horizontal" items={navItems} style={{ width: '300px' }} />
         <Tooltip title="Add item">
            <Popover content={addItemForm} placement="right" trigger="click">
               <Button icon={<PlusOutlined />} size='small'
                  onClick={(e) => {
                     e.stopPropagation();
                     setKey('baseNode')
                  }} />
            </Popover>
         </Tooltip>
         <Menu mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
               width: '300px'
            }}>
            {renderMenu(data)}
         </Menu>
      </div>

   );
}

export default SidebarItems



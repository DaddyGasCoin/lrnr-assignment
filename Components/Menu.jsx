
import { Menu, Tooltip, Button, Input, Popover } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useState } from 'react';

function SidebarItems(props) {
    const { data, addChild } = props;
    const [key, setKey] = useState()
    const [nodeName, setNodeName] = useState()

    //Popup to add new parent node in menu
    const addItemForm = (
        <div>
            <Input onChange={(e) => setNodeName(e.target.value)} />
            <Button icon={<CheckCircleOutlined />} onClick={() => addChild(key, nodeName)} />
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
                            <div style={{
                                display: 'flex', flexDirection: 'row', gap: '10px',
                                alignItems: "center", justifyContent: "space-between",
                                marginRight: '3px'
                            }}>
                                <span>{item.title}</span>
                                <Tooltip title="search">
                                    <Popover content={addItemForm} placement="right" trigger="click">
                                        <Button icon={<PlusOutlined />} size='small'
                                            onClick={() => setKey(item.key)} />
                                    </Popover>
                                </Tooltip>

                            </div>
                        }
                    >
                        {renderMenu(item.children)}
                    </Menu.SubMenu>
                );
            }

            return (
                <Menu.Item key={item.key}>
                    <span>{item.title}</span>
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



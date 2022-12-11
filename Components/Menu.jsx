
import { Menu } from 'antd';

function SidebarItems(props) {
    const { data } = props;

    //Checks if item is a parent or child node
    function renderMenu(menu) {
        return menu.map(item => {
            if (item.children) {
                return (
                    <Menu.SubMenu
                        key={item.key}
                        title={
                            <span>
                                {item.title}
                            </span>
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

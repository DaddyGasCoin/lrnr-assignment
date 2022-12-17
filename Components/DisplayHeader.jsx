import { Button, Avatar, Popover } from 'antd';
import { MenuOutlined, UserAddOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const DisplayHeader = () => {

    const content = (
        <div className='user-popup'>
            <p>Dark Mode</p>
            <p>Profile</p>
            <p>What's New</p>
            <p>Help</p>
            <p>Send Feedback</p>
            <p>Hints and shorcuts</p>
            <p>Logout</p>
        </div>
    );

    return (

        <div className="header">
            <div>
                <Button icon={<MenuOutlined />} />
            </div>
            <div className="header-right">
                <Button icon={<UserAddOutlined />}>Invite Team Memer</Button>
                <Button icon={<BellOutlined />} />
                <Popover content={content} trigger="focus" style={{ boxshadow: 'none' }}>
                    <a href="#">
                        <Avatar size="default" icon={<UserOutlined />} />
                    </a>
                </Popover>
            </div>
        </div>

    )
}

export default DisplayHeader
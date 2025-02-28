import { Space } from 'antd';
import {Outlet} from "react-router-dom";

export const MainLayout = () => {

    return (
        <>
            <Space className='wrap'>
                <Space className='content'>
                    <Space className='inner-content'>
                        <Space className='site-layout'>
                            <Outlet />
                        </Space>
                    </Space>
                </Space>
            </Space>
        </>
    )
}
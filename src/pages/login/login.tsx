import { Button, Form, FormProps, Input, Row } from 'antd';
import { ILoginEntity, useLogin } from '@/shared/api/user/useLogin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '@/shared/storage';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loginForm, setLoginForm] = useState<ILoginEntity>({ email: '', password: '' });

    const { data: loginData, isPending, isError, status } = useLogin(loginForm);
    const { setSessionStorage } = useSessionStorage('accessToken');

    const onFinish: FormProps<ILoginEntity>['onFinish'] = (loginValues) => {
        //나중에 로그인 이벤트 추가하자
        setLoginForm({ email: loginValues.email, password: loginValues.password });
        //authContext.login(res.data.accessToken);
    };

    useEffect(() => {
        if (!isPending && !isError && loginData) {
            if (loginData.status === 200) {
                setSessionStorage(loginData.accessToken!);
                navigate('/home');
            } else {
                alert(loginData.errorMessage!);
            }
        }
    }, [isPending, isError, status, loginData]);

    return (
        <>
            <Form
                id="loginForm"
                className="box-body"
                layout="vertical"
                form={form}
                onFinish={onFinish}>
                <Row gutter={32}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: '이메일을 입력해주세요.' }]}>
                        <Input placeholder="관리자 이메일" size="large"></Input>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}>
                        <Input
                            type="password"
                            autoComplete="off"
                            placeholder="패스워드"
                            size="large"></Input>
                    </Form.Item>
                    <Button
                        type="primary"
                        className="black expand"
                        size="large"
                        htmlType="submit"
                        form="loginForm">
                        로그인
                    </Button>
                </Row>
            </Form>
        </>
    );
};

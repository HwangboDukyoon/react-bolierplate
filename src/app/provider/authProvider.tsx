import { createContext, useEffect } from 'react';
import apiCall from '@/shared/api/apiCall';
import { useSessionStorage } from '@/shared/storage';

interface AuthContextProps {
    accessToken: string | null;
    isLogin: boolean;
    //logout: () => void;
}

export const AuthProvider = createContext<AuthContextProps>({
    accessToken: null,
    isLogin: false,
    // logout: function (): void {
    //     throw new Error('Function not implemented.');
    // },
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    // 액세스 토큰
    const { value: accessToken, removeSessionStorage } = useSessionStorage('accessToken');
    const isLogin = !!accessToken;

    useEffect(() => {
        if (accessToken === null) {
            sessionStorage.clear();
            delete apiCall.defaults.headers.common['Authorization'];
        } else {
            //API 호출 시 헤더에 ACCESS 토큰 추가
            apiCall.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
    }, [accessToken]);

    // 로그아웃 핸들러
    // const logoutHandler = () => {
    //     removeSessionStorage();
    //     delete apiCall.defaults.headers.common['Authorization'];
    // };

    // AuthContext 값
    const authContextValue = {
        accessToken,
        isLogin: isLogin,
        //logout: logoutHandler,
    };

    return <AuthProvider.Provider value={authContextValue}>{children}</AuthProvider.Provider>;
};

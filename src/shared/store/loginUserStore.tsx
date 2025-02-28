import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ILoginUserStore {
    loginUserInfo: ILoginUserEntity;
    setLoginUserInfo: (userInfo: ILoginUserEntity) => void;
    removeLoginUserInfo: () => void;
}
export interface ILoginUserEntity {
    userId: number | null; // PK
    name: string; // 이름
    hp: string; // 휴대폰번호
    loginYn: boolean; // 로그인여부
}
const defaultLoginUserEntity = {
    userId: null, // 회원 ID
    name: '', // 이름
    hp: '', // 휴대전화
    loginYn: false,
};

export const loginUserStore = create(
    persist<ILoginUserStore>(
        (set) => ({
            loginUserInfo: defaultLoginUserEntity,
            setLoginUserInfo: (userInfo: ILoginUserEntity) => set({ loginUserInfo: userInfo }),
            removeLoginUserInfo: () => set({ loginUserInfo: defaultLoginUserEntity }),
        }),
        {
            name: 'login-user-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
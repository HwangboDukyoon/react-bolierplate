import { useQuery } from '@tanstack/react-query';
import apiCall from '@/shared/api/apiCall';
import { ILoginUserEntity } from '@/shared/store/loginUserStore';

export interface ILoginEntity {
    email: string;
    password: string;
}

interface ILoginResponse {
    status: number;
    accessToken: string | null;
    loginUserEntity: ILoginUserEntity | null;
    errorMessage: string | null;
}

export const useLogin = (params: ILoginEntity | null) => {
    const { data, isPending, isError, status } = useQuery({
        queryKey: ['login', params],
        queryFn: () => sendLogin(params),
        enabled: params !== null && params.email !== '' && params.password !== '',
    });
    return { data, isPending, isError, status };
};

const sendLogin = async (params: ILoginEntity | null) => {
    if (params === null) return;
    return await apiCall
        .post(`/auth/login`, params)
        .then((resp) => {
            //각 프로젝틍 맞게 변경
            const responseDto: ILoginResponse = {
                status: 200,
                accessToken: resp.data.accessToken,
                loginUserEntity: {
                    userId: resp.data.loginMemberId,
                    name: resp.data.loginMemberName,
                    hp: '01012345678',
                    loginYn: true,
                },
                errorMessage: null,
            };
            return responseDto;
        })
        .catch((err) => {
            const responseDto: ILoginResponse = {
                status: err.status,
                accessToken: null,
                loginUserEntity: null,
                errorMessage: err.message,
            };
            return responseDto;
        });
};

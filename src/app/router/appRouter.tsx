import {
    createBrowserRouter,
    LoaderFunctionArgs,
    Navigate,
    redirect,
    RouterProvider,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider } from '@/app/provider/authProvider';
import { LoginLayout, MainLayout } from '@/app/layout';
import { AboutPage, HomePage, LoginPage, ProductPage } from '@/pages';
import { productStore } from '@/shared/store';

export const AppRouter = () => {
    //로그인 권한 체크..
    const authContext = useContext(AuthProvider);
    const { isLogin } = authContext;

    const loginRoutes = {
        element: <LoginLayout />,
        errorElement: <h1>로그인 Router 에러다 !</h1>,
        children: [
            { path: '/', element: <Navigate to={'/login'} replace /> },
            {
                path: '/login',
                loader: () => {
                    if (isLogin) return redirect('/home');
                    else return null;
                },
                element: <LoginPage />,
            },
        ],
    };

    const userRoutes = {
        element: <MainLayout />,
        errorElement: <h1>로그인 이후 에러다 !</h1>,
        loader: () => {
            if (!isLogin) {
                return redirect('/login');
            }
            return null;
        },
        children: [
            /* 일반 이동 */
            {
                path: '/home',
                element: <HomePage />
            },
            /* 스토어를 사용하지 않고 데이터를 로드하여 화면에 전달하는 예시 */
            {
                path: '/about',
                element: <AboutPage/>,
                loader: async () => {
                    // 데이터 없으면 errorElement로 이동함
                    //const failExampleResponse = await fetch('https://api.example.com/data');
                    //return response.json();
                    return { id: 555, name : "하루"}
                }
            },
            /* 스토어에 값을 설정하고 화면에 전달하는 예시 */
            {
                path: '/product/:id',
                element: <ProductPage />,
                loader: async ({ params }: LoaderFunctionArgs<{ id: string }>) => {
                    const settingProduct = productStore.getState().setProduct;
                    settingProduct(params.id!);
                    return null;
                },
            },
        ],
    };

    const routes = createBrowserRouter([loginRoutes, userRoutes]);

    return <RouterProvider router={routes} />;
};
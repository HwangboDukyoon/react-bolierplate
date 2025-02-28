import { create } from 'zustand/react';

interface IProductStoreEntity {
    product: IProductEntity | null;
    setProduct: (productId: string) => void;
    removeProduct: () => void;
}
interface IProductEntity {
    productId: number;
    productName: string;
    productCount: number;
}
export const productStore = create<IProductStoreEntity>((set) => ({
    product: null,
    setProduct: async (productId) => {
        const tempProduct = {
            productId: Number(productId),
            productName: '임시상품',
            productCount: 100,
        };
        set({ product: tempProduct });
    },
    removeProduct: () => set({ product: null }),
}));

// API를 통해 데이터를 세팅하는 예시
// const useStore = create((set) => ({
//     user: null,
//     fetchUser: async (id) => {
//         const response = await fetch(`/api/user/${id}`);
//         const userData = await response.json();
//         set({ user: userData });
//     },
// }));
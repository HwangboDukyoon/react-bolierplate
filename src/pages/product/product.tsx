import { productStore } from '@/shared/store/productStore';

export const ProductPage = () => {
    const product = productStore((state) => state.product);
    return (
        <>
            <h1>상품 페이지입니다.</h1>
            <h2>상품 ID : {product?.productId}</h2>
            <h2>상품 명 : {product?.productName}</h2>
            <h2>상품 수 : {product?.productCount}</h2>
        </>
    );
};

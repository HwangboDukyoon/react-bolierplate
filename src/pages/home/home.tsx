import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
          홈 화면입니다.
            <button onClick={() => navigate("/about")}>어바웃으로 이동</button>
            <button onClick={() => navigate("/product/5")}>프로필으로 이동</button>
        </>
    )
}

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../domains/Login/components";

interface Props {}

const Header: FC<Props> = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("acoountId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      <div></div>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/mypage">마이페이지</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

// Recoil, Redux, Redux-saga, Zustand, Jotai

// Recoil, Jotai (최하위에서 원자단위로 상태를 관리하겠다.)
// Redux, Zustand (중앙관리형 상태관리)

// Recoil, Redux 보일러 플레이트 코드 -> 복잡한 로직이 들어갈때
// Jotai, Zustand -> 가벼운 로직이 들어갈때

// Jotai

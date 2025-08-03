import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    setIsLoggedIn(!!accountId);
  }, []);

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

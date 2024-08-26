import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://draft-api.vercel.app/profile', {
      credentials: 'include' ,
    }).then(resonse => {
      resonse.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('https://draft-api.vercel.app/logout', {
      credentials: 'include',
      method: 'POST',
  });
  setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">DRAFT </Link>  
      <nav>
        {username && (
          <>
          <Link to="/create">Create new post</Link>
          <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <> 
            <Link to="/login">LOGIN</Link>
            <Link to="/register">REGISTER</Link>
          </>
        )}
      </nav>
    </header>
  );
}

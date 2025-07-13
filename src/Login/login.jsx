import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"

function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Google 로그인 데모</h1>

      {!user ? (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("Google User:", decoded);
            setUser(decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      ) : (
        <div>
          <img src={user.picture} alt="프로필" style={{ borderRadius: "50%" }} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={() => setUser(null)}>로그아웃</button>
        </div>
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import Register from "./Register";
import Passwd from "./Passwd.js";

function Login() {
  const [Forgotpasswd, SetForgotpasswd] = useState(false);
  const [Sign, SetSign] = useState(true);

  return !Forgotpasswd ? (
    <div className="App2">
      <Register
        SetForgotpasswd={SetForgotpasswd}
        Sign={Sign}
        SetSign={SetSign}
      />
    </div>
  ) : (
    <div className="App2">
      <Passwd SetSign={SetSign} SetForgotpasswd={SetForgotpasswd} />
    </div>
  );
}

export default Login;
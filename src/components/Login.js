import { useNavigate } from "react-router-dom";
import AccessTemplate from "./templateAcces";
import { useState } from "react";
// import * as auth from '../utils/auth' 

function Login(props) {
  const { handleLogin } = props;
  // const [formDataLogin, setFormDataLogin] = useState({});

  // const navigate = useNavigate();
  // const handleChangeLogin = (e) => {
  //   const { name, value } = e.target;

  //   setFormDataLogin({
  //     ...formDataLogin,
  //     [name]:value
  //   })
  // };

  // const handleSubmit = (evt) =>{
  //   const {email,password} = formDataLogin
  //   evt.preventDefault();
  //   auth.authorize()
  // }
  return (
    <AccessTemplate
      title={"Inicia sesión"}
      buttonName={"Inicia sesión"}
      description={"¿Aún no eres miembro? Regístrate aquí"}
      access={props.access}
    >
      <div className="access__inputs-container">
        <label className="login__field">
          <input
            className="access__input"
            id="login__mail"
            placeholder="Correo electronico"
            name="email"
          />
        </label>
        <label className="login__field">
          <input
            className="access__input"
            id="login__password"
            placeholder="Contraseña"
            name="password"
          />
        </label>
      </div>
    </AccessTemplate>
  );
}

export default Login;

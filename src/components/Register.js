import React, { useState } from "react";
import AccessTemplate from "./templateAcces";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Register(props) {
  const [formData, setFormData] = useState({});
  const [error, setError] = React.useState(false);
  // const [infoToolOpen, setInfoToolOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleChangeRegister = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleCloseInfoTool = () =>{
  //   setError(false)
  //   setInfoToolOpen(false)
  // }
  const handleSubmit = (evt) => {
    const { password, email } = formData;
    evt.preventDefault();
    auth
      .register(password, email)
      .then((res) => {
        if (res.data) {
          navigate("/signIn", { state: "successo" });
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.log(err)
      })
  };
  return (
    <AccessTemplate
      title={"Registrate"}
      buttonName={"Registrate"}
      description={"¿Ya eres miembro? Inicia sesión aquí"}
      onSubmit={handleSubmit}
      access = {props.access}
    >
      <div className="access__inputs-container">
        <label className="login__field">
          <input
            className="access__input"
            id="Register__mail"
            name="email"
            placeholder="Correo electronico"
            onChange={handleChangeRegister}
          />
        </label>
        <label className="login__field">
          <input
            className="access__input"
            id="Register__password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChangeRegister}
          />
        </label>
      </div>
    </AccessTemplate>
  );
}

export default Register;

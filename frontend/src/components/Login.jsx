import { useState } from "react";
import { loginRequest } from "../services/auth";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await loginRequest(email, password);

        if (!res.ok) {
            alert("Credenciales incorrectas");
            return;
        }

        const data = await res.json();
        localStorage.setItem("logged", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
    };

    return (
        <div className="login-container">

            <div className="login-form-container fade-in-left">
                <div className="logo-box">
                    <img src="src/assets/prescott2.png" alt="Logo" />
                    <h2>La nueva experiencia digital de aprendizaje</h2>
                    <p>Cercana, dinámica y flexible</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form slide-in-bottom">
                    <label>Código de estudiante</label>
                    <input
                        type="email"
                        placeholder="Ingresa tu usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn-login">Iniciar sesión</button>

                </form>
            </div>

            <div className="login-illustration fade-in">
                <img src="src/assets/FondoAleLogIn.png" alt="Ilustración" />
            </div>
        </div>
    );
};

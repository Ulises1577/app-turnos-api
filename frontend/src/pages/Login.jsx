import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import TextField from '../components/TextField';
import SecretField from '../components/SecretField';
import useLogin from '../services/useLogin.jsx';    

export default function Login() {
    const navigate = useNavigate();
    const { login } = useLogin();
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    async function submitHandler(e) {
        e.preventDefault(); //Es un formulario va a recargar la pagina, esto es para que no lo haga
        const res = await login(data);
        console.log(res);
    }

    function cancelHandler() {
        navigate('/');
    }
    return <Form
    title="Login" 
    onSubmit={submitHandler}
    submitLabel="Iniciar sesión"
    onCancel={cancelHandler}
    >
    
            <TextField 
            label="Nombre de usuario: "
            value= {data.username}
            onChange={newValue => setData(data => ({ ...data, username: newValue }))} 
            required
            />
            <SecretField
            label="Contraseña: "
            value={data.password}
            onChange={newValue => setData(data => ({ ...data, password: newValue}))}
            required
            /> 
        </Form>;
}
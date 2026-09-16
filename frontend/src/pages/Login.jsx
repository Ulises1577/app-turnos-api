import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import TextField from '../components/TextField';
import SecretField from '../components/SecretField';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    function submitHandler(e) {
        e.preventDefault(); //Es un formulario va a recargar la pagina, esto es para que no lo haga
        console.log(data);
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
            />
            <SecretField
            label="Contraseña: "
            value={data.password}
            onChange={newValue => setData(data => ({ ...data, password: newValue}))}
            /> 
        </Form>;
}
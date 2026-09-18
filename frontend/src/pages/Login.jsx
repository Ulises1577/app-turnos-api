import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import TextField from '../components/TextField';
import SecretField from '../components/SecretField';
import useLogin from '../services/useLogin.jsx';    
import useApi from '../services/useApi.jsx';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useLogin();
    const { setAuthorization } = useApi();
    const [disabled, setDisabled] = useState(false);
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        setDisabled(true);

        try {
            const res = await login(data);
            console.log(res.authorizationToken);
            setAuthorization(`Bearer` + res.authorizationToken);
            alert('Inicio de sesión exitoso');
        } catch (error) {
            console.error('Error en el login:', error);
            alert('Error en el login.');
        }

        setDisabled(false);
    }
    function cancelHandler() {
        navigate('/');
    }

    return (
        <Form
            title="Login" 
            onSubmit={submitHandler}
            submitLabel={loading ? "Iniciando sesión..." : "Iniciar sesión"}
            onCancel={cancelHandler}
            disabled={disabled || loading}
        >
            {error && (
                <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>
                    {error}
                </div>
            )}
            <TextField 
                label="Nombre de usuario: "
                value={data.username}
                onChange={newValue => setData(data => ({ ...data, username: newValue }))} 
                required
                disabled={disabled}
            />
            <SecretField
                label="Contraseña: "
                value={data.password}
                onChange={newValue => setData(data => ({ ...data, password: newValue }))}
                required
                disabled={disabled}
            /> 
        </Form>
    );
}
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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function submitHandler(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await login(data);
            if (res.token) {
                localStorage.setItem('token', res.token);
            }
            if (res.username) {
                localStorage.setItem('user', JSON.stringify(res));
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
            console.error('Error al iniciar sesión:', err.message);
        } finally {
            setLoading(false);
        }
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
            />
            <SecretField
                label="Contraseña: "
                value={data.password}
                onChange={newValue => setData(data => ({ ...data, password: newValue }))}
                required
            /> 
        </Form>
    );
}
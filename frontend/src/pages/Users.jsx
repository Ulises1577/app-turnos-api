import { useState, useEffect } from 'react';
import useUser from '../services/useUser';

export default function Users() {
    const { getUsers } = useUser();
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getUsers();
                console.log('respuesta:', res);
                setList(res);
            } catch (err) {
                console.error('Error en ', err);
            }
        }

        fetchData();
        
    }, []);
    return <div>
        <h6> 
        Usuarios
        </h6>

        <table className="table">
            <thead>
                <tr>
                    <th>Nombre de usuario</th>
                    <th>Nombre completo</th>
                    <th>Email</th>
                    <th>Rol</th>
                </tr>
            </thead>
            <tbody>
                {
                 list.map(row => <tr key={row.username}>
                    <td>{row.username}</td>
                    <td>{row.displayName}</td>
                    <td>{row.email}</td>
                    <td>{row.role}</td>
                </tr>)}
            </tbody>
        </table>

        {/*<pre>
        {JSON.stringify(list, null, 2)}
        </pre>*/}

        </div>;
    
}
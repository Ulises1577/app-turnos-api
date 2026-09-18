import useApi from '../services/useApi.jsx';

export default function About() {
    const { authorization } = useApi();
    return <h6> 
        Acerca de 
        { authorization && <span>{authorization}</span>}
    </h6>;
    //quiero ver la autorization que me da el login, para ver si se guarda correctamente en el contexto
    //Revisar con agy
}
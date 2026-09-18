import { useState, createContext, useContext } from 'react';

const ApiContext = createContext();

export function ApiProvider({ children }) {
    const [urlBase, setUrlBase ] = useState('http://localhost:3000/api');
    const [authorization, setAuthorization] = useState('');

    async function request(url, options = {}) {
    options = { ...options };
    options.headers = { ...options.headers };

    const token = localStorage.getItem('token');
    if (token && !options.headers['Authorization']) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (options.body) {
        if (typeof options.body !== 'string') {
            options.body = JSON.stringify(options.body);
            options.headers['Content-Type'] = 'application/json'; 
        }
    }

    if (options.json) {
        options.headers['Accept'] = 'application/json';
    }

    if (authorization) {
        options.headers ??= {};
        options.headers['Authorization'] = authorization;
    } 

    const res = await fetch(urlBase + url, {
        ...options,
    });

    if (!res.ok) {
        let errorMsg = `Error en la petición: ${res.status} ${res.statusText}`;
        try {
            const errData = await res.json();
            if (errData?.message) {
                errorMsg = errData.message;
            } else if (errData?.error) {
                errorMsg = errData.error;
            }
        } catch {
            // Si la respuesta no es JSON, mantenemos el mensaje con statusText
        }
        throw new Error(errorMsg);
    }

    if (options.json) 
        return await res.json();

    return await res.text();
    }

    async function get(url) {
    return await request(url, { method: 'GET' });
    }

    async function getJson(url) {
    return await request(url, { method: 'GET', json: true });
    }

    async function post(url, body) {
    return await request(url, {
    method: 'POST',
    body,
    });
    }

    async function postJson(url, body) {
    return await request(url, {
    method: 'POST',
    body,
    json: true,
    });
    }

    async function patchJson(url, body) {
    return await request(url, {
    method: 'PATCH',
    body,
    json: true,
    });
    }

    async function deleteJson(url) {
    return await request(url, {
    method: 'DELETE',
    json: true,
    });
    }

    return (
        <ApiContext.Provider 
        value={{ 
            urlBase, 
            setUrlBase, 
            request,
            get,
            getJson,
            post,
            postJson,
            patchJson,
            deleteJson,
            authorization,
            setAuthorization, 
            }}
            >
            {children}
        </ApiContext.Provider>
    );
}
    
export default function useApi() {
    return useContext(ApiContext);
}
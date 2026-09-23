import useApi from './useApi';

export default function useUser() {
    const api = useApi();

    return {
        getUsers:(options) => api.getJson('/users', options),
    };
}
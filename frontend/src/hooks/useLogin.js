import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/v1/users/login', { email, password });
       
            localStorage.setItem('user', JSON.stringify(response.data.data));
            setLoading(false);
            return response.data.data;
        } catch (err) {
            setError(err ? err.response.data.message : 'Login failed');
            console.log('=== error useLogin.js [20] ===', error);
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
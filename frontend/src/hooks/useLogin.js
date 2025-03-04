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
            // Handle successful login, e.g., save token, update user state, etc.
            localStorage.setItem('user', JSON.stringify(response.data.data));
            setLoading(false);
            return response.data.data;
        } catch (err) {
            setError(err.response ? err.response.data : 'Login failed');
            setLoading(false);
        }
    };

    return { login, loading, error };
};

export default useLogin;
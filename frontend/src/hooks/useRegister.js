import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const register = async (prn, name, gender, mobile_no, email, password, graduation_year, current_status) => {
        setLoading(true);
        setError(null);

        if (!prn || !name || !gender || !mobile_no || !email || !password || !graduation_year || !current_status) {
            setLoading(false);
            return setError('Please fill all fields');
        }

        try {
            const response = await axios.post('/api/v1/users/register', {
                prn,
                name,
                gender,
                mobile_no,
                email,
                password,
                graduation_year,
                current_status
            });
            navigate('/login');
            setLoading(false);
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
        }
    };

    return { register, loading, error };
};

export default useRegister;

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const register = async (name, gender, mobile_no, email, password, graduation_year, otp) => {
        setLoading(true);
        setError(null);

        if (!name || !gender || !mobile_no || !email || !password || !graduation_year || !otp) {
            setLoading(false);
            return setError('Please fill all fields');
        }

        try {

            const response = await axios.post('/api/v1/users/verify-otp', { email, otp });
            if (response.data.message.verified === false) {
                setLoading(false);
                return setError(response.data.message);
            }

            const response2 = await axios.post('/api/v1/users/register', {
               
                name,
                gender,
                mobile_no,
                email,
                password,
                graduation_year

            });
            navigate('/login');
            setLoading(false);
            return response2.data;
        } catch (err) {
            setLoading(false);
            console.log('=== err useRegister.js [36] ===', err);
            setError(err.response?.data?.message || err.message);
        }
    };

    const sendOtp = async (email) => {
        setLoading(true);
        setError(null);

        if (!email) {
            setLoading(false);
            return setError('Please enter your email');
        }

        try {
            const response = await axios.post('/api/v1/users/send-otp', { email });
            setLoading(false);

            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
        }
    }

    return { register, loading, error, sendOtp };
};

export default useRegister;

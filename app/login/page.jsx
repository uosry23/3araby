'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function AuthPage() {
    const router = useRouter();
    const {
        user,
        login,
        signup,
        resetPassword,
        error,
        loading,
    } = useAuth();

    const [isLoginView, setIsLoginView] = useState(true);
    const [showResetForm, setShowResetForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    const toggleView = () => {
        setIsLoginView(!isLoginView);
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setResetMessage('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (FormLoginValidation()) {
            await login(email, password)
        };

    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (FormSignUpValidation()) { await signup(email, password, name, phone) };
    };
    const FormSignUpValidation = () => {
        const newErrors = {}
        if (!isLoginView && !name) {
            newErrors.name = "name is requird"
        }
        if (!isLoginView && !phone) {
            newErrors.phone = "phone number is requird"
        } else if (!/^\d{10,}$/.test(phone.replace(/\D/g, '')) && !isLoginView) {
            newErrors.phone = "please enter a valid number"
        }
        if (!isLoginView && !email) {
            newErrors.email = "email is requird"
        } else if (!isLoginView && !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid"
        }
        if (!isLoginView && !password) newErrors.password = "Password is required";
        else if (!isLoginView && password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    }
    const FormLoginValidation = () => {
        const newErrors = {}
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!email) newErrors.email = "email is required";
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const success = await resetPassword(resetEmail);
        setResetMessage(success ? 'Password reset email sent. Check your inbox.' : 'Failed to send reset email. Please try again.');
    };

    return (
        <div className="mt-20 flex flex-col items-center gap-4 px-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md w-full">
                    <span>{error}</span>
                </div>
            )}

            {showResetForm ? (
                <form onSubmit={handleResetPassword} className="flex flex-col gap-4 w-full max-w-md p-4">
                    <h2 className="text-2xl font-bold text-center font-mono">Reset Password</h2>
                    {resetMessage && (
                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                            {resetMessage}
                        </div>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border-2 border-black h-10 p-2"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-2 px-4 hover:bg-gray-950 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Email'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowResetForm(false)}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Login
                    </button>
                </form>
            ) : isLoginView ? (

                <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-md p-4">
                    <h2 className="text-2xl font-bold text-center font-mono">Login <span className='text-sm text-gray-600'> email(3Araby@gmail.com)&& pass(123456789)</span></h2>
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full border-2 ${errors.email ? 'border-red-500' : 'border-black'} h-10 p-2`} value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        className={`w-full border-2 ${errors.password ? 'border-red-500' : 'border-black'} h-10 p-2`}

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
                    <div className="flex justify-between">
                        <button type="button" onClick={() => setShowResetForm(true)} className="text-blue-600 hover:underline">
                            Forgot password?
                        </button>
                        <button type="button" onClick={toggleView} className="text-blue-600 hover:underline">
                            Create account
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-2 px-4 hover:bg-gray-950 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-md p-4">
                    <h2 className="text-2xl font-bold text-center font-mono">Sign Up</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        className={`w-full border-2 ${errors.name ? "border-red-500" : 'border-black'} h-10 p-2`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />
                    {errors.name && <p className='mt-1 text-red-500 text-sm'>{errors.name}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full border-2 ${errors.email ? "border-red-500" : 'border-black'} h-10 p-2`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                    {errors.email && <p className='mt-1 text-red-500 text-sm'>{errors.email}</p>}

                    <input
                        type="password"
                        placeholder="Password"
                        className={`w-full border-2 ${errors.password ? "border-red-500" : 'border-black'} h-10 p-2`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    {errors.password && <p className='mt-1 text-red-500 text-sm'>{errors.password}</p>}

                    <input
                        type="tel"
                        placeholder="Phone number"
                        className={`w-full border-2 ${errors.phone ? "border-red-500" : 'border-black'} h-10 p-2`}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className='mt-1 text-red-500 text-sm'>{errors.phone}</p>}

                    <button type="button" onClick={toggleView} className="text-blue-600 hover:underline">
                        Already have an account?
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white py-2 px-4 hover:bg-gray-950 transition-colors duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default AuthPage;

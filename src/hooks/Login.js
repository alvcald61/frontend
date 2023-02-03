import { useState} from "react";


const useLogin = () => {
    
    const [isLogin, setLogin] = useState(false);
    const [error, setError] = useState(false)
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const handleLogin = async (userInfo) => {
        setLoading(true);
        // const user = window.sessionStorage.getItem('user');
        // if (user) { 
        //     setUser(JSON.parse(user));
        //     setLogin(true);
        //     setLoading(false);
        //     return;
        // }
        const response = await fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo),
        })
        const data = await response.json();
        if (response.status === 202) {
            console.log(isLogin)
            setUser(data);
            setLogin(true);
            setLoading(false);
            window.sessionStorage.setItem('user', JSON.stringify(data));
            return;
        }
        setError(true)
        setLoading(false);  
        setLogin(false);
        setTimeout(() => {setError(false)}, 3000)
    }

    const handleGoogleLogin = async (userInfo) => {
        const response = await fetch('http://localhost:8080/api/v1/auth/googleLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'google-jwt': userInfo.tokenId
            },
        })
        const data = await response.json()
        if (response.status === 202) {
            console.log(data)
            setUser(data);
            setLogin(true);
            setLoading(false);
            window.sessionStorage.setItem('user', JSON.stringify(data));
            return;
        }
        setError(true)
        setLoading(false);  
        setLogin(false);
        setTimeout(() => {setError(false)}, 3000)
    }
    
    return { isLogin, user, loading, error, handleLogin, handleGoogleLogin};
}

export default useLogin;
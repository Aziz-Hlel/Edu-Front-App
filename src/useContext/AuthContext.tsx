import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import getUrl from './getUrl';
import { fetch, ResponseType, Body } from '@tauri-apps/api/http';
import { IFormInput } from '../Components/Logins2';
import useAxios, { authTokensType } from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';


type AuthContextType = {
    isAuthenticated: boolean | undefined;
    isAdmin: boolean;
    login: (data: IFormInput) => Promise<boolean>;
    logout: () => void;
    authTokens: any;
    user: userType | null;
    setUser: any;
    setAuthTokens: any;
}

type userType = {
    dre_id: number;
    exp: number;
    iat: number;
    isAdmin: boolean;
    jti: string;
    token_type: string;
    user_id: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const axios = useAxios();


    const storage = localStorage.getItem("authTokens");

    const [authTokens, setAuthTokens] = useState(() => storage ? JSON.parse(storage) : null);

    const [user, setUser] = useState<userType | null>(() => storage ? jwtDecode(storage) : null);
    const [isAdmin, setIs_admin] = useState<boolean>(user ? user.isAdmin : false);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);


    const url = getUrl();
    const navigate = useNavigate();


    useEffect(() => {

        const TokenIsValid = async () => {
            try {
                const response = await axios.get(url + "x/testAuth/",);
                console.log(response)
                console.log(response.data)
                if (response.data) {
                    setIsAuthenticated(true)
                    navigate('/');
                }

            } catch (error) {
                setIsAuthenticated(false)

            }
        }
        TokenIsValid()

    }, [])

    const login = async (credentials: IFormInput) => {
        try {
            const response = await fetch(url + 'users/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: Body.json(credentials),
                responseType: ResponseType.JSON
            });
            const data = (response.data as authTokensType);

            setIs_admin((jwtDecode(data.access) as any).isAdmin)
            setIsAuthenticated(true);

            setAuthTokens(data)
            setUser(jwtDecode(data.access))

            localStorage.setItem('authTokens', JSON.stringify(data));

            const authTokens = JSON.stringify(data)
            console.log(authTokens)
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            return true

        } catch (error) {
            return false
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };


    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
    }, [authTokens])


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isAdmin, authTokens, user, setUser, setAuthTokens }}>
            {children}
        </AuthContext.Provider>
    );

}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
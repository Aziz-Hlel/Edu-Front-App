// src/PrivateRoute.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './useContext/AuthContext';
import { CityDataContextProvider } from './useContext/CityDataContext';
import LoadingIcon from './lib/LoadingIcon';


const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated === false) navigate('/login')

    return isAuthenticated ? <CityDataContextProvider><Outlet /></CityDataContextProvider> :
        <div className=' w-full h-full'>

            <div className='fixed top-0 left-0 w-screen h-screen bg-white z-50 flex items-center justify-center'>

                <LoadingIcon className=' ' />

            </div>
        </div>

};

export default PrivateRoute;

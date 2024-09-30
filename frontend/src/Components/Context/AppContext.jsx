// import { createContext, useEffect, useState } from "react";
// import PropTypes from 'prop-types'
// import { useNavigate } from "react-router-dom";

// export const AppContext = createContext();

// const ProviderFunction = (props) => {
//     const url = import.meta.env.VITE_API_URL;

//     const [contacts, setContacts] = useState([])
//     const [token, setToken] = useState(null);
//     const navigate = useNavigate()

//     useEffect(() => {
//         const isTokenAvailable = localStorage.getItem('token');
//         if(isTokenAvailable) {
//             setToken(isTokenAvailable);
//         }
//         else {
//             navigate('/auth');
//         }
//     }, [token])
//     return(
//         <AppContext.Provider value={{url, contacts, setContacts, token, setToken}}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// ProviderFunction.propTypes = {
//     children: PropTypes.node.isRequired,
// }

// export default ProviderFunction;

import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const ProviderFunction = (props) => {
    const url = import.meta.env.VITE_API_URL; 

    const [contacts, setContacts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token')); // Initial token state

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            const isTokenAvailable = localStorage.getItem('token');
            if (isTokenAvailable) {
                setToken(isTokenAvailable);
            } else {
                navigate('/auth');
            }
        }
    }, [token,navigate]); 

    return (
        <AppContext.Provider value={{ url, contacts, setContacts, token, setToken }}>
            {props.children}
        </AppContext.Provider>
    );
}

ProviderFunction.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProviderFunction;

import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'

export const AppContext = createContext();

const ProviderFunction = (props) => {
    const url = 'http://localhost:5000';
    const [contacts, setContacts] = useState([])
    const [token, setToken] = useState(null);

    useEffect(() => {
        const isTokenAvailable = localStorage.getItem('token');
        if(isTokenAvailable) {
            setToken(isTokenAvailable);
        }
    }, [token])
    return(
        <AppContext.Provider value={{url, contacts, setContacts, token, setToken}}>
            {props.children}
        </AppContext.Provider>
    )
}

ProviderFunction.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProviderFunction;
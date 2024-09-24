import { createContext, useState } from "react";
import PropTypes from 'prop-types'

export const AppContext = createContext();

const ProviderFunction = (props) => {
    const url = 'http://localhost:5000';
    const [contacts, setContacts] = useState([])
    return(
        <AppContext.Provider value={{url, contacts, setContacts}}>
            {props.children}
        </AppContext.Provider>
    )
}

ProviderFunction.propTypes = {
    children: PropTypes.node.isRequired,
}

export default ProviderFunction;
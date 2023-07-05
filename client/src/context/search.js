import { useState, createContext, useContext, useEffect } from "react";

// create a custom state useAuth() using context
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword: "",
        results: [],
    });

    return (
        <SearchContext.Provider value={[values, setValues]}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };

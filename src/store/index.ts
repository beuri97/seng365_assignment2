import create from 'zustand';


const getLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) as string);
const setLocalStorage = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));

interface PetitionState {
    petitionsList: Petitions[],
    count: number,
    categories: Category[],
    searchTerm: string,
    minimumCost: string,
    sort: string,
    errorFlag: boolean,
    errorMsg: string,
    setPetitions: (petitions: Petitions[]) => void,
    setPage: (count: number) => void,
    setSearchTerm: (searchTerm: string) => void,
    setMinimumCost: (min: string) => void,
    setCategories: (categories: Category[]) => void,
    setSort: (sortBy: string) => void,
    setErrorFlag: (errorFlag: boolean) => void,
    setErrorMsg: (msg: string) => void
}

const petitionStore = create<PetitionState>(set => ({
    petitionsList: getLocalStorage('petitionsList') || [],
    count: 0,
    categories: getLocalStorage('categories') || [],
    searchTerm: "",
    minimumCost: "",
    sort: 'CREATED_ASC',
    errorFlag: false,
    errorMsg: '',

    setPetitions: (petitions: Petitions[]) => set(() => {
        setLocalStorage('petitions', petitions);
        return {petitionsList: petitions || []};
    }),

    setPage: (count: number) => set(() => {
        return {count: Math.ceil(count / 10)}
    }),

    setSearchTerm: (searchTerm: string) => set(() => {
        return {searchTerm: searchTerm}
    }),

    setMinimumCost: (min: string) => set(() => {
        return {minimumCost: min};

    }),

    setCategories: (categories: Category[]) => set(() => {
        setLocalStorage('categories', categories)
        return {categories: categories};
    }),

    setSort: (sortBy: string) => set(() => {
        return {sort: sortBy};
    }),

    setErrorFlag: (errorFlag: boolean) => set(() => {
        return{errorFlag: errorFlag};
    }),
    setErrorMsg: (msg: string) => set(() => {
        return{errorMsg: msg};
    })
}))

const getSessionStorage = (key: string) => JSON.parse(sessionStorage.getItem(key) as string);
const setSessionStorage = (key: string, value: any) => window.sessionStorage.setItem(key, JSON.stringify(value));

interface LoginState {
    token: string,
    user: { userId: number, firstName: string, lastName: string },
    setAuthorization: (token: string) => void,
    setUser: (user: { userId: number, firstName: string, lastName: string }) => void,
}

const loginState = create<LoginState>(set => ({

    token: getSessionStorage('authToken') || "",
    user: getSessionStorage('user') || { userId: -1, firstName: '', lastName: '' },

    setAuthorization: (token: string) => set(() => {
        setSessionStorage('authToken', token);
        return {token: token};
    }),
    setUser: (user) => set(() => {
        setSessionStorage('user', user);
        return {user: user};
    }),
}))

export {petitionStore, loginState};
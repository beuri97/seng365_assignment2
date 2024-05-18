import create from 'zustand';

interface PetitionState {
    petitionsList: Petition[],
    categories: Category[],
    searchTerm: string,
    noFilterBox:boolean,
    minimumCost: string,
    sort: string,
    errorFlag: boolean,
    errorMsg: string,
    setPetitions: (petitions: Petition[]) => void,
    setSearchTerm: (searchTerm: string) => void,
    setNoFilterBox: (status: boolean) => void,
    setMinimumCost: (min: string) => void,
    setCategories: (categories: Category[]) => void,
    setSort: (sortBy: string) => void,
    setErrorFlag: (errorFlag: boolean) => void,
    setErrorMsg: (msg: string) => void
}

const getLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) as string);
const setLocalStorage = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));

const petitionStore = create<PetitionState>(set => ({
    petitionsList: getLocalStorage('petitionsList') || [],
    categories: getLocalStorage('categories') || [],
    searchTerm: getLocalStorage('searchTerm') || "",
    noFilterBox: getLocalStorage('noFilterBox') || true,
    minimumCost: getLocalStorage('minimumCost') || "",
    sort: getLocalStorage('sort') || 'CREATED_ASC',
    errorFlag: false,
    errorMsg: '',

    setPetitions: (petitions: Petition[]) => set(() => {
        setLocalStorage('petitions', petitions);
        return {petitionsList: petitions || []};
    }),

    setSearchTerm: (searchTerm: string) => set(() => {
        return {searchTerm: searchTerm}
    }),
    setNoFilterBox: (status) => set(() => {
        return {noFilterBox: status};
    }),

    setMinimumCost: (min: string) => set(() => {
        return {minimumCost: min};

    }),

    setCategories: (categories: Category[]) => set(() => {
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

export default petitionStore;
type Petition = {
    petitionId: number,
    title: string,
    categoryId: number,
    categoryName: string,
    creationDate: string,
    ownerId: number,
    ownerFirstName: string,
    ownerLastName: string,
    numberOfSupporters: number,
    supportingCost: number
}

type Category = {
    categoryId: number,
    name: string,
    checked: boolean
}
type Petitions = {
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

type Petition = {
    petitionId: number,
    title: string,
    description: string,
    categoryId: number,
    ownerId: number,
    ownerFirstName: string,
    ownerLastName: string,
    creationDate: string,
    numberOfSupporters: number,
    moneyRaised: number,
    supportTiers: SupportTier[],
}

type PetitionPost = {
    title: string,
    description: string,
    categoryId: number,
    supportTiers: SupportTierPost[]
}

type Category = {
    categoryId: number,
    name: string,
    checked: boolean
}
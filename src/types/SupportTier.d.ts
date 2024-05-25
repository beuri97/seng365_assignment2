type SupportTierPost = {
    title: string,
    description: string,
    cost: number,
    open: boolean
}

type SupportTier = {
    supportTierId: number,
} & SupportTierPost;


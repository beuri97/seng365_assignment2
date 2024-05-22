type SupportTierPost = {
    title: string,
    description: string,
    cost: number
}

type SupportTier = {
    supportTierId: number,
} & SupportTierPost;


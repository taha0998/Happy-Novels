import { prisma } from "@/lib/prisma";

//  {
//         title: '',
//         description: '',
//         coverImg: '',
//         rating: ,
//         ratingCount: ,
//     }

const Novels = [
    {
        title: "To Be a Power in the Shadows!",
        description: "Just like how everyone adored heroes in their childhood, a certain young man adored those powers hidden in shadows. After hiding his strength and living the mediocre life of a mob character by day while undergoing frenzied training by night, he finally reincarnates into a different world and gains ultimate power. The young man who is only playing at being a power in the shadows, his misunderstanding subordinates, and a giant organization in the shadows that gets trampled. This is the story of a young boy who had adored powers in shadows possibly eventually reigning over the world of shadows in another world.",
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNolniHqNgfov6R2tmYOZnQzeialHVdbAXJEsr",
        rating: 90,
        ratingCount: 2314,
    },
    {
        title: 'Re: Zero Kara Hajimeru Isekai Seikatsu',
        description: 'Suddenly a high school student Subaru Natsuki has been summoned to another world on the way back from the convenience store. With the biggest crisis of his life being summoned to another world and no sign of the one who summoned him things become worse when he is attacked.',
        coverImg: 'https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PNs3pTy5jl57GkhOLgbScxIT3raAVEKoFuwy62',
        rating: 86,
        ratingCount: 976,
    }
]

const seed = async () => {
    const t0 = performance.now();
    console.log('DB Seed Started...')

    await prisma.novel.deleteMany();

    await prisma.novel.createMany({
        data: Novels.map((novel) => ({
            ...novel,
        }))
    })

    const t1 = performance.now();
    console.log(`DB Seed: Finished (${(t1 - t0).toFixed()}ms)`)
}

seed()
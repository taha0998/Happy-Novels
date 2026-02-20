//  {
//         title: '',
//         description: '',
//         coverImg: '',
//         rating: ,
//         ratingCount: ,
//     }

import { prisma } from "@/lib/prisma";

type NovelsType = {
    title: string,
    description: string,
    coverImg: string,
    rating: number,
    ratingCount: number,
}
const Novels: NovelsType[] = [
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
    },
    {
        title: "Overlord ",
        description: "After announcing it will be discontinuing all service, the internet game Yggdrasil' shut down That was the plan, but for some reason, the player character did not log out some time after the server was closed. NPCs start to become sentient. A normal youth who loves gaming in the real world seemed to have been transported into an alternate world along with his guild, becoming the strongest mage with the appearance of a skeleton, Momonga. He leads his guild Ainz Ooal Gown' towards an unprecedented legendary fantasy adventure!",
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN5tkAAnsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 84,
        ratingCount: 551,
    },
    {
        title: "Mushoku Tensei",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    }, {
        title: "Novel 5",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 6",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 7",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 8",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 9",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 10",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 11",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 12",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 13",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 14",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 15",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 16",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 17",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 18",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 19",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 20",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    },
    {
        title: "Novel 21",
        description: `A 34-year-old NEET otaku, chased out from his house by his family, found that his life is reaching a dead end. He then recalled that his life could actually have been much better if he had made better choices in the past. Just when he was at the point of regret, he saw a truck moving at fast speed, and three high schoolers in its path. Mustering all the strength he had, he tried to save them and ended getting run over by the truck, quickly ending his life. The next time he opened his eyes, he is reincarnated to a world of sword and magic as Rudeus Greyrat. Born to a new world, a new life, Rudeus decided that, "This time, I'll really live my life to the fullest with no regret!" Thus starts the journey of a man yearning to restart his life.`,
        coverImg: "https://yuzykc5xj5.ufs.sh/f/9ZvEbi04z0PN57YNTlsmGci5gqx23oO0QCBkZvpDrHhFUjdY",
        rating: 81,
        ratingCount: 602
    }
]

const seed = async () => {
    const t0 = performance.now();
    console.log('DB Seed Started...')

    await prisma.novel.deleteMany();

    await prisma.novel.createMany({
        data: Novels.map((novel) => (
            { ...novel }
        ))
    })

    const t1 = performance.now();
    console.log(`DB Seed: Finished (${(t1 - t0).toFixed()}ms)`)

}
seed()
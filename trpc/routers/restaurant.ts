import { procedure, router } from "../trpc";
import { prisma } from "@/db";
import {z} from'zod';

export const restaurantRouter = router({
    getRestaurants: procedure.query(() => {
        return prisma.HT_DMKhoaPhong.findMany()
    }),
    addFavorite: procedure.input(
        z.object({
            id: z.string(),
            isFavorite: z.boolean(),
          })
    )
    // .output(
    //     z.object({
    //         rating: z.number(),
    //         rating_count: z.number(),
    //         category: z.string(),
    //         city: z.string(),
    //         desc: z.string(),
    //         id: z.string(),
    //         images: z.array(z.string()),
    //         name: z.string(),
    //         price_range: z.string(),
    //         featured: z.object({
    //           text: z.string(),
    //           icon: z.string()
    //         }),
    //         isFavorite: z.boolean()
    //       }) 
    // )
    .mutation(({ input }) => {
        const { id, isFavorite } = input;

        return prisma.restaurant.update({
            where: { id },
            data: { isFavorite }, 
          });
    })
})
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const prisma = new PrismaClient();

const router = Router();


// Search for route
router.get("/", async (req, res) => {
  try {
    const { source, destination } = req.query;
    let where = {};
    if (source === "undefined" || source === "null") {
      where = {
        published: true,
      };
    } else {
      where = {
        published: true,
        OR: [
          {
            title: {
              contains: source,
            },
          },
          {
            title: {
              contains: destination,
            },
          },
        ],
      };
    }

    // console.log(where);
    const routes = await prisma.route.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
        bookmarks: true,
      },
    });

    // console.log({ source, destination, routes });
    return res.status(200).json({ routes });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

export default router;

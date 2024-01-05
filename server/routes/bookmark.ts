import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwtVerify from "../middleware/jwtVerify";
const prisma = new PrismaClient();

const router = Router();

// Add or remove bookmark
router.post("/", jwtVerify, async (req, res) => {
  try {
    const { routeId } = req.body as { routeId: string };
    if (!routeId) throw new Error("Route doesnt exist");
    if (!req.user)
      return res.status(403).json({ msg: "You are not authenticated" });
    const exist = await prisma.bookmark.findMany({
      where: {
        routeId,
        userId: req.user as string,
      },
    });
    let type = "",
      msg = "";
    let bookmark;
    if (exist.length === 0) {
      bookmark = await prisma.bookmark.create({
        data: {
          routeId,
          userId: req.user as string,
        },
      });
      type = "create";
      msg = "Bookmark added successfully";
    } else {
      await prisma.bookmark.deleteMany({
        where: {
          routeId,
          userId: req.user as string,
        },
      });
      type = "delete";
      bookmark = await prisma.bookmark.findMany({
        where: {
          routeId,
        },
      });
      msg = "Bookmark removed successfully";
    }
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: req.user,
      },
      include: {
        route: {
          include: {
            likes: true,
            comments: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    return res.status(201).json({ msg, type, bookmark, routeId, bookmarks });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Get all bookmarks
router.get("/", jwtVerify, async (req, res) => {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: req.user,
      },
      include: {
        route: {
          include: {
            likes: true,
            comments: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json({ bookmarks });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Delete all bookmark
router.delete("/", jwtVerify, async (req, res) => {
  try {
    await prisma.bookmark.deleteMany({
      where: {
        userId: req.user,
      },
    });
    return res
      .status(200)
      .json({ msg: "All bookmark cleared.", userId: req.user });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

export default router;

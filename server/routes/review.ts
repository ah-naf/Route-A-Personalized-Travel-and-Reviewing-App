import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwtVerify from "../middleware/jwtVerify";
const prisma = new PrismaClient();

const router = Router();

// Like or dislike a route
router.post("/like", jwtVerify, async (req, res) => {
  try {
    const { routeId } = req.body;
    if (!routeId) throw new Error("Route not found");

    let like = true;

    const exist = await prisma.routeLike.findMany({
      where: {
        routeId,
        userId: req.user,
      },
    });

    if (exist.length) {
      // Trigger Unlike
      await prisma.routeLike.delete({
        where: {
          id: exist[0].id,
        },
      });
      like = false;
    } else {
      // Trigger Like
      await prisma.routeLike.create({
        data: {
          routeId,
          userId: req.user as string,
        },
      });
    }
    const route = await prisma.route.findUnique({
      where: {
        id: routeId,
      },
      include: {
        likes: true,
        comments: true,
      },
    });
    return res.status(201).json({ route });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Comment on a route
router.post("/comment", jwtVerify, async (req, res) => {
  try {
    const { routeId, text } = req.body;
    if (!routeId) throw new Error("Route doesnt exist");
    if (!text) throw new Error("Comment cant be empty");

    await prisma.comment.create({
      data: {
        ...req.body,
        userId: req.user,
      },
    });

    const comments = await prisma.comment.findMany({
      where: {
        routeId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return res
      .status(201)
      .json({ msg: "Comment posted successfully", comments });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Get all the comment for a specific route
router.get("/comment/:id", async (req, res) => {
  try {
    if (!req.params.id) throw new Error("Route doesnt exist");

    const comments = await prisma.comment.findMany({
      where: {
        routeId: req.params.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            email: true,
            username: true,
            avatar: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ comments });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Delete a comment
router.delete("/comment/:id", jwtVerify, async (req, res) => {
  try {
    if (!req.params.id) throw new Error("Comment doesnt exist");

    const route = await prisma.comment.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!route) throw new Error("Comment doesnt exist");

    await prisma.comment.delete({
      where: {
        id: req.params.id,
      },
    });

    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        routeId: route.routeId,
      },
      include: {
        user: {
          select: {
            email: true,
            username: true,
            avatar: true,
            name: true,
          },
        },
      },
    });

    return res
      .status(200)
      .json({ comments, msg: "Comment deleted successfully" });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

export default router;

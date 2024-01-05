import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwtVerify from "../middleware/jwtVerify";
const prisma = new PrismaClient();

const router = Router();


// Add a new place review
router.post("/", jwtVerify, async (req, res) => {
  try {
    await prisma.review.create({
      data: {
        ...req.body,
        userId: req.user,
      },
    });
    return res.status(200).json({ msg: "Review Added Successfully" });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Update a place review
router.post("/:id", jwtVerify, async (req, res) => {
  try {
    if (!req.body.userId || req.body.userId !== req.user)
      throw new Error("You are not authorized");

    const { id, userId, ...rest } = req.body;

    await prisma.review.update({
      where: {
        id,
      },
      data: rest,
    });

    return res.status(200).json({ msg: "Review Updated Successfully" });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Get All the place names
router.get("/place-names", async (req, res) => {
  try {
    const places = await prisma.review.findMany({
      distinct: ["place"],
      select: {
        place: true,
      },
    });
    const place_names = places.map((val) => ({ value: val.place }));
    return res.status(200).json({ place_names });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Get all the place review
router.get("/", async (req, res) => {
  try {
    const places = await prisma.review.findMany({
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    return res.status(200).json({ places });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Get a single place review
router.get("/:id", async (req, res) => {
  try {
    const place = await prisma.review.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
            name: true,
          },
        },
      },
    });
    return res.status(200).json({ place });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

// Delete a place Review
router.delete("/:id", jwtVerify, async (req, res) => {
  try {
    if (!req.params.id) throw new Error("Place review doesnt exist");
    await prisma.review.delete({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ msg: "Place review delete successfully" });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(msg);
    return res.status(500).json({ msg });
  }
});

export default router;

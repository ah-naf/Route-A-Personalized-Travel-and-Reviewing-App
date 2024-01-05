import bcrypt from "bcrypt";
import cookie from "cookie";
import { Router } from "express";
import jwt from "jsonwebtoken";
import jwtVerify from "../middleware/jwtVerify";

import { PrismaClient } from "@prisma/client";
import { generateRandomBigHead } from "../util";
const prisma = new PrismaClient();

const router = Router();

// User Login
router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user)
      return res
        .status(403)
        .json({ msg: "User with the email doesn't exist." });

    // Check Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({ msg: "Invalid email/password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1hr",
    });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    const { password, ...rest } = user;

    res.status(200).json({ msg: "Login Successful.", user: rest, token });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(error);
    res.status(500).json({ msg });
  }
});

// User Register
router.post("/register", async (req, res) => {
  try {
    const randomAvatar = generateRandomBigHead();
    // console.log("first")
    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: req.body.email }, { username: req.body.username }],
      },
    });
    if (existUser)
      return res
        .status(409)
        .json({ msg: "User with the email or username already exist!" });

    console.log(req.body);
    // const hasehdPass = await bcrypt.hash(req.body.password, 10);
    const hasehdPass = req.body.password;
    console.log(hasehdPass);
    const { password, ...createdUser } = await prisma.user.create({
      data: {
        ...req.body,
        password: hasehdPass,
        avatar: randomAvatar,
      },
    });
    console.log(createdUser);
    const token = jwt.sign(
      { id: createdUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1hr",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    res
      .status(201)
      .json({ user: createdUser, token, msg: "User registered successfully" });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(error);
    res.status(500).json({ msg });
  }
});

// Verify if user is still logged in
router.get("/verify", jwtVerify, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user as string,
      },
    });

    if (!user)
      return res
        .status(403)
        .json({ msg: "User with the email doesn't exist." });

    const { password, ...rest } = user;

    res.status(200).json({
      msg: "User is still logged in",
      user: rest,
      token: req.cookies.auth,
    });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(error);
    res.status(500).json({ msg });
  }
});

// User logout
router.get("/logout", jwtVerify, async (req, res) => {
  res.removeHeader("Set-Cookie");
  res.clearCookie("auth");
  res
    .status(200)
    .json({ msg: "User logged out successfully", user: null, token: "" });
});

// Get Single User
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(404).json({ msg: "User doen't exist" });

    const { password, ...rest } = user;
    return res.status(200).json({ user: rest });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(error);
    res.status(500).json({ msg });
  }
});

// Update User
router.post("/user", jwtVerify, async (req, res) => {
  try {
    if (req.body.id !== req.user || !req.user) {
      return res.status(403).json({ msg: "You are not authorized." });
    }
    const userExist = await prisma.user.findUnique({
      where: { id: req.user as string },
    });
    if (!userExist) return res.status(404).json({ msg: "User not found" });
    const { id, email, username, ...rest } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user as string },
      data: {
        ...rest,
      },
    });
    return res.status(201).json({ msg: "User updated successfully" });
  } catch (error) {
    let msg = "An unknown error occured.";
    if (error instanceof Error) msg = error.message;
    console.log(error);
    res.status(500).json({ msg });
  }
});

export default router;

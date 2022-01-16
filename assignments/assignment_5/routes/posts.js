const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const User = require("../models/users");
const { body, validationResult } = require("express-validator");
const Post = require("../models/posts");
const faker = require("faker");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    console.log(posts);
    res.status(200).json({
      status: "success",
      posts: posts,
    });
  } catch (e) {
    res.json({
      status: "failed GET",
      message: e.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.name,
      body: req.body.body,
      image: req.body.image,
      user: req.user,
    });
    return res.status(200).json({ status: "success", post: post });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id });
    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const postuserID = await Post.find({ _id: req.params.postId });

    if (postuserID[0].user.toString() !== req.user.toString()) {
      return res.status(400).json({
        status: "Failed",
        message: "No Authorized",
      });
    } else {
      const posts = await Post.deleteOne({ _id: req.params.postId });
      res.status(200).json({
        status: "success",
        data: posts,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.put("/:postId", async (req, res) => {
  try {
    const postuserID = await Post.find({ _id: req.params.postId });
    if (postuserID[0].user.toString() !== req.user.toString()) {
      return res.status(400).json({
        status: "Failed",
        message: "No Authorized",
      });
    } else {
      console.log("IDs  MATCHED");
      const posts = await Post.updateOne(
        {
          $and: [
            { _id: { $eq: req.params.postId } },
            { user: { $eq: req.user } },
          ],
        },
        { title: req.body.name }
      );
      res.status(200).json({
        status: "success",
        post: posts,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;

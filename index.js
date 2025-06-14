import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const client = new PrismaClient();
const app = express();
app.use(express.json());

//Entry point

app.get("/", (req, res) => {
  console.log("It working  good");
  res.send("Welcome to blog  API ");
});

//create users
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, username } = req.body;
    const user_data = await client.users.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        username,
      }
    });
    res.status(201).json(user_data);
  } catch (e) {
    console.error("Error creating user",e)
    res
      .status(500)
      .json({ error: "Fail to create a new user .Try again later" });
  }
});
//create posts
app.post("/post", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post_data = await client.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(201).json(post_data);
  } catch (e) {
    res.status(500).json({ messege: "Something went wrong .Try again later" });
  }
});
//get all users
app.get("/users", async (req, res) => {
  try {
    const all_user = await client.users.findMany({
      include: {
        Post: true,
      },
    });
    res.status(200).json(all_user);
  } catch (error) {
    res.status(500).json({ messege: "Fail to get users .Try again later" });
  }
});
//get specific user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sp_user = await client.users.findFirst({
      where: { id: String(id) },
      include: {
        Post: true,
      },
    });
    if (!sp_user) {
      return res.status(404).json({ messege: "I am sorry the user not found" });
    }
    return res.status(200).json(sp_user);
  } catch (e) {
    res.status(500).json({ messege: "Something went wrong .Try again later" });
  }
});
//get all post
app.get("/Post", async (req, res) => {
  try {
    const all_post = await client.post.findMany({
      include: {
        user: true,
      },
    });
    res.status(201).json(all_post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "Something went wrong .Try again later" });
  }
});
//get specific post with user
app.get("/Post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sp_post = await client.post.findUnique({
      where: {
        id: String(id),
      },
      include: {
        user: true,
      },
    });
    if (sp_post) {
      return res.status(200).json(sp_post);
    } else {
      return res.status(404).json({ messege: "I am sorry the user not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "Something went wrong .Try again later" });
  }
});

//update all post
app.put("/Post/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const updates = await client.post.update({
      where: {
        id: String(id),
      },
      data: {
        title,
        content,
      },
    });
    res.status(200).json(updates);
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "Something went wrong .Try again later" });
  }
});

// //update specific post
// app.patch("/Post/:id",async(req,res)=>{
//     try{
//         const {id}=req.params
//         const update_sp=await client.Post.update({
//             where:{
//                 id:String(id)
//             },
//             data:{
//                 title:title&&title,
//                 content:content && content
//             }
//         })
//         res.status(200).json({messege:"Suceesful update",update_sp})
//     }
//     catch(e){
//         console.log(e)
//         res.status(500).json({messege:"Someting went wrong in updating post"})
//     }
// })

//delete a post
app.delete("/Post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const del_post = await client.post.update({
      where: { id: String(id) },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).json(del_post);
  } catch (e) {
    console.log(e);
    res.status(500).json({ messege: "Something went wrong .Try again later" });
  }
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Running at port ${port} server`);
});

// Started date Jan 3 2024 22:16

const express = require('express');
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
//this crypto is just for creating random string for token
// const crypto = require("crypto");
// console.log(crypto.randomBytes(16).toString("hex"));
const path = require('path');


require("dotenv").config();

//database
const connectToDB = require("./connectDB");
connectToDB();
//registration schema
const Registration = require("./schema/Registration");
//post schema
const Post = require("./schema/Post");
//friendship schema
const Friendship = require("./schema/FriendshipSchema");
//notification schema
const Notification = require("./schema/NotificationSchema");

//for image
const multer = require("multer");





//destination to save iimage in backend .
// const upload = multer({ dest: __dirname+"/uploads" }); 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueFileName = Date.now() + '_' + file.originalname  //for savedfile naming
      cb(null, file.fieldname + '-' + uniqueFileName)
    }
  })

const upload = multer({ storage})   

//middleware
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false})) 
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.get("/", (req, res) => {
    res.send("Hello World");
})
app.get("/home",async(req,res)=>{
   try {
    const allUser =await Registration.find({});
    res.json(allUser)
   } catch (error) {
    res.json("Error :"+error)
   }
})

//user registration


app.post("/register",upload.single('profileImage'), async (req, res) => {
    
    try {
      const { firstName, surname, email, password, dateOfBirth, selectedGender,vipToken} = req.body;
      const selectedImage = req.file.path;
    const  salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await Registration.create({
      firstName: firstName,
      surname: surname,
      email: email,
      password: hashedPassword,
      dateOfBirth: dateOfBirth,
      gender: selectedGender,
      profileImage: selectedImage,
      vipToken: vipToken,     // Gold Tick = iamgold   , Blue Tick = skyisblue
    });

    if (newUser) {
      res.status(200).json("User Created");
    } else {
      res.status(200).json("User not Created");
    }
  } catch (error) {
    res.status(400).json("Error here: " + error);
  }
});


//login
// login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await Registration.findOne({ email });
        if (checkUser) {
            const checkPassword = bcrypt.compareSync(password, checkUser.password);
            if (checkPassword) {
                // Include additional information in the token payload
                const token = jwt.sign(
                    { id: checkUser._id, email: checkUser.email, firstName: checkUser.firstName, surname: checkUser.surname, gender: checkUser.gender, profileImage: checkUser.profileImage,vipToken:checkUser.vipToken },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                // Set the token in a cookie
                res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

                // Respond with user information
                res.status(200).json({
                    id: checkUser._id,
                    email: checkUser.email,
                    firstName: checkUser.firstName,
                    surname: checkUser.surname,
                    gender:checkUser.gender,
                    profileImage: checkUser.profileImage,
                    vipToken:checkUser.vipToken
                });
            } else {
                res.status(400).json("Password not match");
            }
        }
    } catch (error) {
        res.status(400).json("Error :" + error);
    }
});

//profile
app.get("/profile", (req, res) => {
    const { token } = req.cookies
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err
        const { firstName,surname, email,gender, _id } = await User.findById(userData.id)
        res.json("profile : ",{firstName,surname, email, gender,_id})
      })
    } else {
      res.json(null)
    }
})


//users
// app.get("/users", async (req, res) => {
//     try {
//         const allUser = await Registration.find({}).sort({ firstName: -1  });
//         res.json(allUser);
//     } catch (error) {
//         res.json("Error : " + error);
//     }
// })
app.get("/users", async (req, res) => {
  try {
      const allUser = await Registration.aggregate([
          {
              $addFields: {
                  // Custom sort order based on the vipToken field
                  sortField: {
                      $switch: {
                          branches: [
                              { case: { $eq: ["$vipToken", "iamgold"] }, then: 1 },
                              { case: { $eq: ["$vipToken", "skyisblue"] }, then: 2 },
                              { case: { $eq: ["$vipToken", "default"] }, then: 4 },
                          ],
                          default: 5, // For any other cases
                      },
                  },
              },
          },
          { $sort: { sortField: 1, firstName: -1 } }, // Sort by custom field and then firstName
      ]).exec();

      res.json(allUser);
  } catch (error) {
      res.json("Error : " + error);
  }
});


//update userPost
app.patch("/updatepost/:postId", upload.single("image"), async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file.path;
        if(!image){
            return res.status(400).json({ error: "Please upload an image" });
        }
        
        const postId = req.params.postId;

        const updatePost = await Post.findByIdAndUpdate(postId, {
            $set: {
                caption: caption,
                image: image
            }
        }, { new: true });

        if (!updatePost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(updatePost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//profile setting (update profile except password)
app.patch("/profilesetting/:userId",upload.single("updatedProfileImage"), async (req, res) => {
  try {
      const { firstName, surname, dateOfBirth } = req.body;
      const profileImage = req.file.path;
      const userId = req.params.userId;
      const userProfile = await Registration.findByIdAndUpdate(
        userId, 
        {
          $set: {
            firstName: firstName,
            surname: surname,
            dateOfBirth: dateOfBirth,
            profileImage: profileImage
          }
        },
        { new: true } // To return the updated document
      );
      res.json(userProfile);
    } catch (error) {
      res.json("Error: " + error);
    }
  });
  



app.post("/newpost/:userId", upload.single('image'), async (req, res) => {
    // The 'image' parameter should match the name attribute of the file input in your form
    

    try {
        const { caption } = req.body;
        const userId = req.params.userId;
        const image = req.file.path; 
        // Your post creation logic here
        // Make sure to handle the image data appropriately (e.g., save to disk or database)
        const newPost = await Post.create({
            caption: caption,
            image: image,
            user: userId,
        });

        if (newPost) {
            res.status(200).json("Post Created");
        } else {
            res.status(200).json("Post not Created");
        }
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
});
//shows all post for home page 
app.get("/allpost", async (req, res) => {
    try {
        const allPost = await Post.find({}).sort({ createdAt: -1 }).populate('user');
        res.json(allPost);
    } catch (error) {
        res.json("Error: " + error);
    }
});
//shows post of specific user only
app.get("/yourpost/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const yourPosts = await Post.find({ user: userId }).sort({ createdAt: -1 }).populate('user');

        if (!yourPosts || yourPosts.length === 0) {
            return res.status(404).json({ message: "No posts found for the specified user ID." });
        }

        res.json(yourPosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//delete Post
// Route to delete a post by ID
app.delete('/deletepost/:postId', async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Find the post by ID and remove it
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (deletedPost) {
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

//delete account
app.delete("/deleteaccount/:userId", async (req, res) => {
    const userId = req.params.userId;
    // console.log(userId)
    try {
        const deletedUser = await Registration.findByIdAndDelete(userId);
        const deleteUserPosts = await Post.deleteMany({ user: userId });

        if (deletedUser && deleteUserPosts) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
//logout
app.post("/logout",(req,res)=>{
    res.clearCookie("token").json("Logout")
})





//for adding friends

// to send the friends request to another user
//this is just creating the collection of sender and reciver id but the status is still requested   
app.post("/addFriend", async (req, res) => {
    try {
        const { receiverId, senderId } = req.body;

        // Check for existing friendship in both directions
        const existingFriendship1 = await Friendship.findOne({ senderId, receiverId });
        const existingFriendship2 = await Friendship.findOne({ senderId: receiverId, receiverId: senderId });

        if (existingFriendship1 || existingFriendship2) {
            return res.status(401).json({ message: "Friend request already sent" });
        }

        // Create a new friendship
        const newFriend = await Friendship.create({ senderId, receiverId });

        // Create a notification for the friend request
        const notification = await Notification.create({
            senderId,
            receiverId,
            content: "sent you a Friend Request",
        });

        // Update sender and receiver notifications arrays
        await Registration.findByIdAndUpdate(senderId, { $addToSet: { notifications: notification._id } });
        await Registration.findByIdAndUpdate(receiverId, { $addToSet: { notifications: notification._id } });

        res.status(200).json({ message: "Friend request sent", newFriend });
    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//accept the friend request
app.post("/acceptFriend", async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        // Find the friendship based on either senderId and receiverId or vice versa
        const acceptRequest = await Friendship.findOneAndUpdate(
            {
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId },
                ],
            },
            { status: "accepted" },
            { new: true }
        );

        if (!acceptRequest) {
            return res.status(404).json({ message: "Friendship not found" });
        }

        res.status(200).json({ message: "Friend request accepted", acceptRequest });
    } catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



//notification counter
app.get("/notificationCount/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const notificationCounter = await Registration.findById(userId).populate("notifications");
        res.json(notificationCounter.notifications);
    } catch (error) {
        res.json("Error: " + error);
    }
});




//for exceptions
app.get("*", (req, res) => {

    res.status(404).send("Page not found")
})

if(connectToDB){
    app.listen(4000, () => {
        console.log("Server is running on port 4000");
        
    })

}else{
    console.log("Server is not running");
}
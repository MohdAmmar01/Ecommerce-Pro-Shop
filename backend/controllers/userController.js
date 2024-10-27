const asyncHandler =require( "express-async-handler")
const User =require( "../models/userModel.js")
const bcrypt =require( "bcryptjs")
const jwt =require( "jsonwebtoken")
const Order =require( "../models/orderModel.js")
const sendEmail =require( "../utils/VerifyEmail.js")
const crypto =require( "crypto")

const verifyEmail=asyncHandler(
  asyncHandler(async(req,res)=>{
   const user=await User.findOne({"VerficationCode":req.body.code});
   if(user!==null){
    await User.updateOne({"VerficationCode":req.body.code},{"isVerified":true });
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10hr",
    });
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 36000),
      httpOnly: true,
      sameSite: "none",
      secure:true
    });
    res.status(200).json({ success: true, message: user, token: token });
  
   }else{
    res.status(200).json({"success":false,"message":"wrong VerificationCode provided"})
   }
  })
)
const authUser = asyncHandler(
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: req.body.email });
    if (user===null) {
      throw new Error("Invalid  email or password");
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
      // if(user.isVerified===false){
      //   const code=crypto.randomBytes(32).toString('hex')
      // const u=  await User.updateOne({"email":req.body.email},{"VerficationCode":code })
      //   // sendEmail(req.body.email,code)
      //   res.status(200).json({ success: false, message: "EMAIL IS SENT TO YOUR EMAILID , PLEASE VERIFY" });

      // }else{
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "10hr",
        });
        res.cookie("token", token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 36000),
          httpOnly: true,
          sameSite: "none",
           secure:true
        });
        res.status(200).json({ success: true, message: user, token: token });
      // } 
    }else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    }
  })
);
const logout = asyncHandler(
  asyncHandler(async (req, res) => {
    res.clearCookie('token')
    req.cookies.token=''
    res.status(200).json({"success":true ,"message":"logout successfully"})
      })
);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new Error("provide all details during registeration ...");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const code=crypto.randomBytes(32).toString('hex')

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
    VerficationCode:code
  });


  const user = await newUser.save();
  // sendEmail(req.body.email,code)
  res.status(200).json({"success":true,"message":user})
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      "success":true,"message":user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    var hashedpassword=user.password;
    if (req.body.password) {
       hashedpassword = await bcrypt.hash(req.body.password, 10);

    }
 
  const t=await User.findByIdAndUpdate(req.user._id,{
        name:req.body.name,
        password:hashedpassword})

    res.json({
      success: true,
      message: t,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt : -1});
  res.json({"success":true,"message":users});
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const orders=await Order.find({"user":req.params.id});
  orders.forEach(async(elem)=>{
    elem.orderItems.forEach(async(elem)=>{
      await Product.findByIdAndUpdate(elem._id,{ $pull: { purchasedUsers: req.params.id }})
    })
  })

  if (user) {
   await Order.deleteMany({"user":req.params.id})
    await user.remove();
    res.json({"success":true, "message": "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findOne({"_id" : req.params.id}).select("-password");
  if (user) {
    res.json({"success":true,"message":user});
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({"success":true,"message":updateUser });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports= {
  authUser,
  registerUser,
  getUserProfile,
  logout,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyEmail
};

// register.js

const User = require('./registerSchema');

const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        });

        if (user) {
            res.status(200).json({ message: 'User created successfully' });
        } else {
            res.status(400).json({ message: "Failed to create the user" });
        };
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ message: 'Server error' });
    }
}
const loginUser = async(req,res)=>{
    try{
        const{email,password}=req.body;
        const login = await  User.findOne({email:email}); 
        if(!login){
            res.status(400).json( {"message":"email not found"} )
        }
        res.status(200).json({"message":"login successfull"})
    }catch(err){
        console.log("error",err)
    }
}


module.exports = {
    register,
    loginUser
}

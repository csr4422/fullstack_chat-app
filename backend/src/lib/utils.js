import jwt from "jsonwebtoken";


//Generating webtoken
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    //Sending JWT as cookies to user
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,//in miliseconds
        //Security fields
        httpOnly: true,//prevent xxs attacks cross-site scripting attacks})
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
    return token;

};

import jwt from 'jsonwebtoken';


export const authUser = (req, res, next) => {
    try{
    const token =req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.log(res.status(401).json({ message: "No token provided" }));
        return res.status(401).json({ message: "Unauthorized" });

    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}
catch(error){
    console.log(error);
    res.status(401).send({ message: "Invalid token" });
}
}
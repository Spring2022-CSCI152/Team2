```

const jwt = require("jsonwebtoken");



module.exports = (req, res, next) => {
    try { const token = req.headers.authorization.split(" ")[1];
   const decodedToken = jwt.verify(
     token,
     "secret_this_should_be_longer"
  );
  
  req.userData = {

           id: decodedToken.id,
           name: decodedToken.name 
     };    
     
     next();


    } catch (error) {
      res.status(401).json({ message: "Auth failed!" });
    }
  };
  ```
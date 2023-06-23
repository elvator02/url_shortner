require("dotenv").config()

const { sign } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { id: user._id },//giving user object id to create token for payload
   process.env.JSON_WEB_TOKEN
  );

  return accessToken;
};


const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
  
    if (!accessToken)
    return res.redirect('/login');
  
    try {
      const validToken = verify(accessToken, process.env.JSON_WEB_TOKEN);
      if (validToken) {
        //assigning the id from token to the user
        req.user = { id: validToken.id };
        return next();
      }
    } catch (err) {
      return res.redirect('/login');
    }
  };
  

module.exports = {
    createTokens,
    validateToken
  };
  
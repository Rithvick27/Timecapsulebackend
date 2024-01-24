var jwt = require("jsonwebtoken");
const secret = process.env.secret;
const fetchuser = (req, res, next) => {
  //decoding the jwt token to  get the user
  const token = req.header("a-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  try {
    const gotchu = jwt.verify(token, secret);
    req.user = gotchu.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};
module.exports = fetchuser;

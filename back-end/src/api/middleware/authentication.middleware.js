import DefaultResponses from "../utils/responses";
import jwt from "jsonwebtoken";

// Middleware para verificar se o token é válido
function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const { status, ...rest } = DefaultResponses.NOT_AUTHENTICATED;

  if (token == null) {
    return res.status(status).json(rest);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(status).json(rest);
    req.user = user;
    next();
  });
}

export default requireAuth;

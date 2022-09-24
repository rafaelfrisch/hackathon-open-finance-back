import * as jwt from "jsonwebtoken";
import { publicRoutes } from "../../helpers/constants";

const authenticationMiddleware = (req, res, next) => {
  const isRoutePublic = publicRoutes.some((routes) => routes.method === req.method && routes.path === req.path);

  if (
    isRoutePublic
  ) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next({ statusCode: 401, message: "No token provided" });
    return;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    next({ statusCode: 401, message: "Token error" });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    next({ statusCode: 401, message: "Token malformatted" });
    return;
  }

  const callback = (err, decoded) => {
    if (err) {
      next({ statusCode: 401, message: "Token invalid" });
      return;
    }
    if (!decoded) {
      next({ statusCode: 403, message: "Token couldn't be decoded" });
      return;
    }
    next();
  };

  jwt.verify(token, process.env.SECRET_KEY, callback);
};

export default authenticationMiddleware;

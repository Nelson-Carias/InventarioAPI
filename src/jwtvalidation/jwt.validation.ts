import { User } from "../models/User";
import jwt from 'jsonwebtoken'
import { decode } from "punycode";
import {Response,Request, NextFunction } from 'express'

export const Token = async (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      
    },

    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
      
    }

    
   
  );
  
};


export const checkToken = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | undefined = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    jwt.verify(token, process.env.TOKEN_KEY, (err: any, decoded: any) => {
      if (err) {
        res.json({
          success: 0,
          message: "Invalid Token..."
     });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
};

// export const ValidateToken = async (token: string) => {
//   try {
//     return jwt.verify(token, process.env.TOKEN_KEY);
    
//   } catch (error) {
//     null;
//   }
// };

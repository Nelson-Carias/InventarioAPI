import { User } from "../models/User";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import { Token } from "../jwtvalidation/jwt.validation";

class authController {
  static Login = async (req: Request, res: Response) => {
    const authrepo = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    try {
      const user = await authrepo.findOne({
        where: { email, state: true },
      });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.json({
          ok: false,
          message: "email or password incorrect",
        });
      }
      const tokenb = await Token(user);
      return res.json({
        ok: true,
        message: "correct",
        tokenb,
      });
    } catch (error) {
      return res.json({
        ok: false,
        message: `Error ${error}`,
      });
    }
  };
}
export default authController;

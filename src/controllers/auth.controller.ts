// Importa los módulos necesarios
import { Request, Response } from 'express';
import { AppDataSource } from './../data-source';  
import { User } from '../models/User';  

class AuthController {

  static loginUser = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);

    try {
      const user = await userRepository.findOne({ where: { email } });

      if (!user || user.password !== password) {
        return res.json({ 
            ok: false, 
            StatusCode: 404,
            message: 'email or password does not exist' });
      }

      return res.json({
        ok: true,
        msg: 'Login successful',
      });
    } catch (error) {
      return res.json({
        ok: false,
        message: `error = ${error}`,
      });
    }
  };
}

export default AuthController
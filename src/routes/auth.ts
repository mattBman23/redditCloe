import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';

import { User } from '../entities/User';

const router = Router();

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // validate user
    let errors: any = {};

    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) errors.email = 'Email is already in use';
    if (usernameUser) errors.username = 'Username is already in use';

    // if errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // create user
    const user = new User({
      email,
      username,
      password,
    });

    errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

router.post('/register', register);

export default router;

import { validate, isEmpty } from 'class-validator';
import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import User from '../entities/User';
import auth from '../middleware/auth';
import user from '../middleware/user';

const router = Router();

const mapErrors = (errors: Object[]) => {
  return errors.reduce((acc: any, cur: any) => {
    acc[cur.property] = Object.entries(cur.constraints)[0][1];
    return acc;
  }, {});
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};
    //  validate data
    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) errors.email = 'Email is already taken';
    if (usernameUser) errors.username = 'Username is already taken';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    //  create user
    const user = new User({ email, username, password });

    errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await user.save();

    //  return user
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(username)) errors.username = 'Username is empty';
    if (isEmpty(password)) errors.password = 'Password is empty';

    if (Object.keys(errors).length > 0) return res.status(404).json({ errors });

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ username: 'Invalid login' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ username: 'Invalid login' });

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong...' });
  }
};

const logout = (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );

  return res.status(200).json({ message: 'You have logout' });
};

const authTest = async (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

router.post('/register', register);
router.post('/login', login);
router.get('/logout', user, auth, logout);
router.get('/me', user, auth, authTest);

export default router;

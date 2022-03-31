import { Request, Response } from 'express';
import { User } from './user/user.model';

type Ctx = {
    req: Request & { user?: Pick<User, 'email' | 'username'> };
    res: Response;
};

export default Ctx;
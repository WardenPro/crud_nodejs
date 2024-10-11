import { Request, Response } from 'express';
import { User } from '../models/user';

let users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};
import { IResolvers } from '@graphql-tools/utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserInputError, AuthenticationError } from 'apollo-server';
import {
  Parent, Context, UserId, User, Group,
} from '../types';
import { NotFoundError } from '../errors';
import { groupsByManagerIdLoader } from '../group/GroupLoader';
import { authenticate } from '../utils/authenticate';
import { UserModel } from './UserModel';
import { usersByIdLoader, usersByEmailLoader } from './UserLoader';

interface CreateUserArgs {
  email: string
  firstName: string
  lastName: string
  password: string
}

interface LoginUserArgs {
  email: string
  password: string
}

interface DeleteUserArgs {
  id: UserId
}

async function enhanceUser(user: User) {
  const groups = await groupsByManagerIdLoader.load(user.id);

  user.onboarded = groups !== null && groups.length > 0;
  user.groups = groups;

  return user;
}

export const userResolver: IResolvers = {
  Query: {

    async me(_: Parent, __: void, context: Context) {
      const token = authenticate(context);
      const [user] = await usersByIdLoader.load(token.userId);

      if (!user) {
        throw new NotFoundError(`User not found! User ID: ${token.userId}, Email: ${token.userEmail}`);
      }

      return enhanceUser(user);
    },

  },
  Mutation: {

    async signup(_: Parent, args: CreateUserArgs) {
      const existingUser = await usersByEmailLoader.load(args.email);

      if (existingUser) {
        throw new UserInputError(`A user with the email "${args.email}" already exists`);
      }

      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = await UserModel.create({
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        password: hashedPassword,
      });

      return !!user;
    },

    async login(_: Parent, args: LoginUserArgs, context: Context) {
      const users = await usersByEmailLoader.load(args.email);

      if (users.length === 0) {
        throw new AuthenticationError(`User not found! Email: ${args.email}`);
      }

      const user = users[0];
      const valid = await bcrypt.compare(args.password, user[0]?.password);

      if (!valid) {
        throw new AuthenticationError(`Invalid password! Email: ${args.email}`);
      }

      const tokenData = { userId: user?.id, userEmail: user?.email };
      const tokenOption = { expiresIn: '7d' };
      const accessToken = jwt.sign(tokenData, process.env.MUSLY_API_TOKEN_SECRET, tokenOption);

      context.req.headers.authorization = accessToken;

      const updatedUser = await UserModel.findByIdAndUpdate(user?.id, { token: accessToken }).exec();

      if (!updatedUser) {
        throw new NotFoundError(`User not found! Email: ${args.email}`);
      }

      const [loggedInUser] = await usersByIdLoader.load(updatedUser.id);
      return enhanceUser(loggedInUser);
    },

    async logout(_: Parent, __: void, context: Context) {
      const token = authenticate(context);
      const loggedOutUser = await UserModel.findByIdAndUpdate(token.userId, { token: null }).exec();

      if (!loggedOutUser) {
        throw new NotFoundError(`User not found! User ID: ${token.userId}, Email: ${token.userEmail}`);
      }

      return (loggedOutUser.token === null);
    },

    async delete(_: Parent, args: DeleteUserArgs, context: Context) {
      authenticate(context);
      const deletedUser = await UserModel.findByIdAndDelete(args.id);

      if (!deletedUser) {
        throw new NotFoundError(`User not found! User ID: ${args.id}`);
      }

      return true;
    },
  },
  Group: {

    async manager(parent: Group) {
      const [user] = await usersByIdLoader.load(parent.managerId);
      return user || null;
    },

  },
};

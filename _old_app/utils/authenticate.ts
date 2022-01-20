import { verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { TOKEN_SECRET } from '../constants';
import { Context, AuthData } from '../types';

export function authenticate({ req }: Context): AuthData {
  if (!req.headers.authorization) {
    throw new AuthenticationError('Not logged in!');
  }

  try {
    return verify(req.headers.authorization, TOKEN_SECRET) as AuthData;
  } catch (error) {
    throw new AuthenticationError('Not logged in!');
  }
}

import { IResolvers } from '@graphql-tools/utils';

export function buildResolvers(resolvers: IResolvers[] = []): IResolvers {
  const mergedResolvers = {};

  resolvers.forEach((resolver) => {
    Object.keys(resolver).forEach((key) => {
      mergedResolvers[key] = {
        ...mergedResolvers[key] || {},
        ...resolver[key] || {},
      };
    });
  });

  return mergedResolvers;
}

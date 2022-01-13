exports.buildResolvers = function buildResolvers (resolvers) {
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
};

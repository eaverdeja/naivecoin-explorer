export const hashResume = (hash, limit = 16) =>
  `${hash.slice(0, limit)}....${hash.slice(-limit)}`;

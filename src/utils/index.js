export const hashResume = (hash, limit = 12) => hash
  ? `${hash.slice(0, limit)}....${hash.slice(-limit)}`
  : null;

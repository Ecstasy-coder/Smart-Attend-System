import crypto from 'crypto';

export const createFaceEncoding = (buffer) => {
  if (!buffer || buffer.length === 0) {
    return [];
  }

  const hash = crypto.createHash('sha256').update(buffer).digest();
  const vector = Array.from({ length: 128 }, (_, index) => {
    const value = hash[index % hash.length];
    return Math.round(((value / 255) * 2 - 1) * 1000) / 1000;
  });

  return vector;
};

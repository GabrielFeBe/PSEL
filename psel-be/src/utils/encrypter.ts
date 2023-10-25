import * as bcrypt from 'bcrypt';

export async function encrypt(password: string) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function compare(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

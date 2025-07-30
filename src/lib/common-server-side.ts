import Ecomuser from '@/models/user';
import bcrypt from 'bcryptjs';

//validate user with combination of email and password
export async function validateUser(email: string, password: string) {
  console.log(
    'comming for check email esists or not with validateUser() with email',
    email + ' - ' + password,
  );
  const user = await Ecomuser.findOne({ email });
  console.log('get user object from mongodb by email', user);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
}

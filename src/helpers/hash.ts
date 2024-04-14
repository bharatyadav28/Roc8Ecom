import bcrypt from "bcrypt";

const hashPassword = async (password: string | Buffer) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};

const comparePassword = async (
  hashedPassword: string,
  enteredPassword: string | Buffer,
) => {
  return bcrypt.compare(enteredPassword, hashedPassword);
};

export { hashPassword, comparePassword };

const isEmail = (input: string) => {
  const isValid =
    input.trim().length > 0 &&
    /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input.trim());
  return isValid;
};

export { isEmail };

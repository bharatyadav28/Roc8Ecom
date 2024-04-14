function generateOTP(digits: number): string {
  let randomNumber = "";
  for (let i = 0; i < digits; i++) {
    const digit = Math.floor(Math.random() * 10);
    randomNumber += digit.toString();
  }
  return randomNumber;
}

export default generateOTP;

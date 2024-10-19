export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length >= 4) {
    return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
  }
  return phoneNumber;
};

export const generateUniqueText = () => {
  const currentTime = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 15);
  const uniqueText = `${currentTime}-${randomPart}`;
  return uniqueText;
};

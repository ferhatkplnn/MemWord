export const getRandomWord = (words) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  return randomWord;
};

export const getRandomWordId = (words) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  return randomWord.id;
};

export const hideWordLetters = (word) => {
  if (typeof word !== "string") {
    throw new Error("Input should be a string.");
  }
  const length = word.length;

  if (length <= 1) {
    return word;
  }

  let indices = Array.from({ length: 2 }, () =>
    Math.floor(Math.random() * length)
  );

  while (indices[0] === indices[1]) {
    indices[1] = Math.floor(Math.random() * length);
  }

  return Array.from({ length }, (_, i) =>
    indices.includes(i) ? word[i] : "-"
  ).join("");
};

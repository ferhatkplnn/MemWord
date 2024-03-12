export const getRandomWordId = (words) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  return randomWord?.id;
};

export const getRandomIndex = (sentences) => {
  return Math.floor(Math.random() * sentences.length);
};

export const getRandomSentence = (sentences) => {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const randomSentence = sentences[randomIndex];
  return randomSentence;
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

export const speak = (text, rate = 0.8) => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.rate = rate;
  msg.lang = "en-US";
  window.speechSynthesis.speak(msg);

  const cancelSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return cancelSpeech;
};

export const scrollToElement = (node) => {
  setTimeout(() => {
    node.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }, 300);
};

export const scoreToPercentage = (score) => {
  let filteredScore = score;
  if (score < 0) {
    filteredScore = 0;
  } else if (score > 40) {
    filteredScore = 40;
  }
  return ((filteredScore * 100) / 40).toFixed(0);
};

export const colorByPercentage = (percentage) => {
  switch (true) {
    case percentage <= 20:
      return "bg-red-500";
    case percentage > 20 && percentage <= 40:
      return "bg-amber-500";
    case percentage > 40 && percentage <= 60:
      return "bg-yellow-500";
    case percentage > 60 && percentage <= 80:
      return "bg-lime-500";
    default:
      return "bg-green-500";
  }
};

export const shuffleArray = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

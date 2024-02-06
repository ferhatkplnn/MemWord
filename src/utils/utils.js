export const getRandomWordId = (words) => {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  return randomWord?.id;
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
  }, 1000);
};

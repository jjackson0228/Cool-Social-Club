const userNameParts = [
  'hoop',
  'dunk',
  'goal',
  'kick',
  'ball',
  'net',
  'strike',
  'pitch',
  'champ',
  'rookie',
  'pro',
  'ace',
  'legend',
];

const parts = [
  'win',
  'level',
  'boss',
  'team',
  'skill',
  'power',
  'combo',
  'victory',
  'defeat',
  'respawn',
];

const reactionBodies = [
  'Epic win!',
  'This is amazing!',
  "I can't believe this!",
  'No way!',
  'LOL',
  'Great game!',
  'Agreed!',
  'I disagree.',
];

const sentenceTemplates = [
  'I think [WORD1] is really [WORD2].',
  'Have you ever thought about [WORD1]?',
  "It's amazing how [WORD1] makes me feel [WORD2].",
  '[WORD1] is the best thing ever!',
];

// Function to get a random item from an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random usernames
function generateRandomUser() {
  const randomNum = Math.floor(Math.random() * 1000); // random number between 0-999
  return `${getRandomArrItem(userNameParts)}${getRandomArrItem(
    userNameParts
  )}${randomNum}`;
}

// Generate random email
function generateRandomEmail() {
  const domains = ['coolclub.com', 'gamingzone.com', 'socialhub.net'];
  const localPart = Math.random().toString(36).substring(7); // generate a random local part
  const domain = getRandomArrItem(domains);
  return `${localPart}@${domain}`;
}

// Generate structured thought text based on sentence templates
function generateThoughtText() {
  const template = getRandomArrItem(sentenceTemplates);
  const word1 = getRandomArrItem(parts);
  const word2 = getRandomArrItem(parts);
  return template.replace('[WORD1]', word1).replace('[WORD2]', word2);
}

// Generate random date within a range
function getRandomDate() {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Generate a random thought object with username, text, reactions, and timestamp
function generateRandomThought() {
  return {
    username: generateRandomUser(),
    thoughtText: generateThoughtText(),
    reactions: [...getReactions(3)],
    createdAt: getRandomDate(),
  };
}

// Generate reactions for a thought
function getReactions(int) {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactionBodies),
      username: generateRandomUser(),
    });
  }
  return results;
}

module.exports = {
  generateRandomEmail,
  generateRandomUser,
  generateThoughtText,
  generateRandomThought,
};

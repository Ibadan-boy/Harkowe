import { nanoid } from 'nanoid';

function generateSpectacularID() {
  const adjectives = [
    'stellar', 'velvet', 'onyx', 'crimson', 'ivory', 
    'phantom', 'lunar', 'ember', 'nova', 'aurora'
  ];
  const nouns = [
    'quill', 'scroll', 'atlas', 'raven', 'symphony',
    'cipher', 'oracle', 'echo', 'serpent', 'halo'
  ];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const uniquePart = nanoid(6); // small unique string
  const timePart = Date.now().toString(36); // base36 timestamp

  return `${adj}-${noun}-${uniquePart}-${timePart}`;
}

export default generateSpectacularID;
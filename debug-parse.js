const { parseResumeMarkdown } = require('./src/lib/parseResumeMarkdown.ts');

console.log('Testing resume parsing...');

try {
  const result = parseResumeMarkdown();
  console.log('Profile:', result.profile.name);
  console.log('Experience entries:', result.experience.length);
  
  if (result.experience.length > 0) {
    console.log('First experience:');
    console.log('- Employer:', result.experience[0].employer);
    console.log('- Title:', result.experience[0].title);
    console.log('- Summary:', result.experience[0].summary);
    console.log('- Achievements:', result.experience[0].achievements.length);
  } else {
    console.log('No experience entries found!');
  }
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}
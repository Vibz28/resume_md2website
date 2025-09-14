const { parseResumeMarkdown } = require('./src/lib/parseResumeMarkdown');

try {
  const parsed = parseResumeMarkdown();
  console.log('Profile:', parsed.profile);
  console.log('Experience count:', parsed.experience.length);
  parsed.experience.forEach((exp, i) => {
    console.log(`Experience ${i + 1}:`, {
      employer: exp.employer,
      title: exp.title,
      timeframe: exp.timeframe,
      location: exp.location,
      summary: exp.summary?.substring(0, 100) + '...',
      achievements: exp.achievements.length
    });
  });
} catch (error) {
  console.error('Error:', error.message);
}
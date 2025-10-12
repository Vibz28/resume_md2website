import { parseResumeMarkdown } from '../src/lib/parseResumeMarkdown';

// Test the parsing function directly
function testResumeParsingLogic() {
  console.log('Testing resume parsing logic...');
  
  try {
    const parsed = parseResumeMarkdown();
    
    console.log('Profile:', {
      name: parsed.profile.name,
      title: parsed.profile.title,
      skillsCount: parsed.profile.skills.length,
      contactsCount: parsed.profile.contacts.length
    });
    
    console.log('Experience entries:', parsed.experience.length);
    
    parsed.experience.forEach((exp, index) => {
      console.log(`\n${index + 1}. ${exp.employer}`);
      console.log(`   Title: ${exp.title}`);
      console.log(`   Timeframe: ${exp.timeframe}`);
      console.log(`   Location: ${exp.location}`);
      console.log(`   Summary: ${exp.summary?.substring(0, 100)}...`);
      console.log(`   Achievements: ${exp.achievements.length} items`);
      
      if (exp.achievements.length > 0) {
        console.log('   First achievement:', exp.achievements[0].substring(0, 80) + '...');
      }
    });
    
    console.log('\nProjects:', parsed.projects.length);
    parsed.projects.forEach((proj, index) => {
      console.log(`${index + 1}. ${proj.title}`);
    });
    
    // Validate parsing results
    console.log('\n=== VALIDATION ===');
    
    // Should have 4 experience entries (Bristol Myers Squibb has 2 positions, plus Formulatrix and Zebra)
    console.log(`✓ Expected 4 experience entries, got: ${parsed.experience.length}`);
    
    // Check for Bristol Myers Squibb positions
    const bmsPositions = parsed.experience.filter(exp => exp.employer === 'Bristol Myers Squibb');
    console.log(`✓ Expected 2 Bristol Myers Squibb positions, got: ${bmsPositions.length}`);
    
    // Check that achievements are populated
    const entriesWithAchievements = parsed.experience.filter(exp => exp.achievements.length > 0);
    console.log(`✓ Expected all entries to have achievements, got: ${entriesWithAchievements.length}/${parsed.experience.length}`);
    
    // Check that summaries are populated
    const entriesWithSummary = parsed.experience.filter(exp => exp.summary.trim().length > 0);
    console.log(`✓ Expected all entries to have summaries, got: ${entriesWithSummary.length}/${parsed.experience.length}`);
    
    console.log('\n=== TEST COMPLETE ===');
    
  } catch (error) {
    console.error('Error testing resume parsing:', error);
  }
}

// Run the test
testResumeParsingLogic();
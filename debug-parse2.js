const fs = require('fs');
const path = require('path');

console.log('Debugging resume parsing...');

try {
  const resumePath = path.join(process.cwd(), 'resume_vibhor_janey_updated_aug_2025.md');
  const content = fs.readFileSync(resumePath, 'utf-8');
  
  console.log('File loaded successfully, length:', content.length);
  
  // Test work section extraction
  const workSection = content.match(/## WORK EXPERIENCE\s*([\s\S]*?)(?=\n---|\n##|$)/);
  console.log('Work section match:', workSection ? 'Found' : 'Not found');
  
  if (workSection) {
    console.log('Work section length:', workSection[1].length);
    console.log('First 500 chars of work section:');
    console.log(workSection[1].substring(0, 500));
    
    // Test company splitting
    const workText = workSection[1];
    const companyBlocks = workText.split(/(?=^\*\*[^*]+\*\*\s*$)/gm).filter(block => block.trim());
    console.log('Company blocks found:', companyBlocks.length);
    
    for (let i = 0; i < companyBlocks.length; i++) {
      console.log(`\nCompany block ${i}:`);
      console.log(companyBlocks[i].substring(0, 200) + '...');
    }
  }
} catch (error) {
  console.error('Error:', error.message);
}
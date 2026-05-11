import fs from 'fs';
import path from 'path';
import { mdToPdf } from 'md-to-pdf';

const inputPath = path.join(process.cwd(), 'resume_vibhor_janey_updated_aug_2025.md');
const outputPath = path.join(process.cwd(), 'resume_vibhor_janey_updated_aug_2025.pdf');

const markdown = fs.readFileSync(inputPath, 'utf-8');

const extractSection = (source, heading) => {
  const pattern = new RegExp(`## ${heading}\\s*\\n\\n?([\\s\\S]*?)(?=\\n---|\\n##|$)`, 'i');
  const match = source.match(pattern);
  return match ? match[0].trim() : '';
};

const filterProjects = (source, maxCount = 3) => {
  const projectsSection = extractSection(source, 'PROJECTS');
  if (!projectsSection) return '';

  const header = '## PROJECTS';
  const body = projectsSection.replace(/^## PROJECTS\s*/i, '').trim();
  const blocks = body.split(/\n\n+/).filter(block => block.trim());

  const filteredBlocks = blocks.slice(0, maxCount).map(block => {
    const lines = block.split('\n').filter(line => line.trim());
    const keep = [];
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('**Category:**')) continue;
      if (trimmedLine.startsWith('**Metrics:**')) continue;
      if (trimmedLine.startsWith('**Technologies:**')) continue;
      if (trimmedLine.startsWith('**Recognition:**')) {
        keep.push(trimmedLine);
        continue;
      }
      if (trimmedLine.startsWith('- ')) {
        keep.push(trimmedLine);
        continue;
      }
      const linkedTitleMatch = trimmedLine.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
      const plainTitleMatch = trimmedLine.match(/^\*\*([^*\n]+)\*\*$/);
      if (linkedTitleMatch) {
        keep.push(`### [${linkedTitleMatch[1]}](${linkedTitleMatch[2]})`);
        continue;
      }
      if (plainTitleMatch) {
        keep.push(`### ${plainTitleMatch[1]}`);
      }
    }
    return keep.join('\n');
  });

  return [header, '', ...filteredBlocks].join('\n');
};

const sections = [
  markdown.split('\n---\n')[0].trim(),
  extractSection(markdown, 'HIGHLIGHTS'),
  extractSection(markdown, 'WORK EXPERIENCE'),
  extractSection(markdown, 'EDUCATION'),
  extractSection(markdown, 'SKILLS'),
  filterProjects(markdown, 3),
  extractSection(markdown, 'COURSES')
].filter(Boolean);

const filteredMarkdown = sections.join('\n\n---\n\n');

const result = await mdToPdf(
  {
    content: filteredMarkdown
  },
  {
    dest: outputPath
  }
);

if (result?.filename) {
  console.log(`PDF generated: ${result.filename}`);
} else {
  console.log('PDF generation completed.');
}

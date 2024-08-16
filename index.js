#!/usr/bin/env node
const { intro, outro, select, text, confirm, isCancel } = require('@clack/prompts');
const fs = require('fs-extra');
const path = require('path');

async function main() {
  intro('Welcome to Ditto! 🎉');

  const projectName = await text({
    message: 'What is your project name?',
    placeholder: 'ditto-app',
  });

  if (isCancel(projectName)) {
    outro('Process cancelled. Goodbye!');
    return;
  }

  const finalProjectName = projectName || 'ditto-app';
  const projectDir = path.join(process.cwd(), finalProjectName);

  const template = await select({
    message: 'Select a framework:',
    options: [
      { value: 'vite', label: 'Vite' },
      { value: 'next', label: 'Next.js' },
    ],
  });

  if (isCancel(template)) {
    outro('Process cancelled. Goodbye!');
    return;
  }

  if (template === 'vite' || template === 'next') {
    const language = await select({
      message: 'What would you like to use?',
      options: [
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
      ],
    });

    if (isCancel(language)) {
      outro('Process cancelled. Goodbye!');
      return;
    }

    let specificTemplate;
    if (template === 'vite') {
      const useTailwind = await confirm({
        message: 'Would you like to use TailwindCSS?',
      });
      
      if (isCancel(useTailwind)) {
        outro('Process cancelled. Goodbye!');
        return;
      }

      if (language === 'ts' && useTailwind) {
        const useShadcn = await confirm({
          message: 'Would you like to use ShadCN?',
        });

        if (isCancel(useShadcn)) {
          outro('Process cancelled. Goodbye!');
          return;
        }

        specificTemplate = useShadcn ? 'with-shadcn' : 'with-tailwind';
      } else {
        specificTemplate = useTailwind ? 'with-tailwind' : 'without-tailwind';
      }

      const templateDir = path.join(__dirname, 'templates', 'vite', language, specificTemplate);
      fs.copySync(templateDir, projectDir);
      
    } else if (template === 'next') {
      const useShadcn = await confirm({
        message: 'Would you like to use ShadCN?',
      });

      if (isCancel(useShadcn)) {
        outro('Process cancelled. Goodbye!');
        return;
      }

      specificTemplate = useShadcn ? 'with-shadcn' : 'without-shadcn';

      const directoryStructure = await select({
        message: 'Which directory structure would you like to use?',
        options: [
          { value: 'app', label: 'app directory' },
          { value: 'src', label: 'src directory' },
        ],
      });

      if (isCancel(directoryStructure)) {
        outro('Process cancelled. Goodbye!');
        return;
      }

      const templateDir = path.join(__dirname, 'templates', 'next', language, directoryStructure, specificTemplate);
      fs.copySync(templateDir, projectDir);
    }
  }

  fs.ensureDirSync(projectDir);
  outro(`${finalProjectName} created successfully!`);
}

main().catch(err => {
  console.error(err);
  outro('An error occurred. Process terminated.');
});
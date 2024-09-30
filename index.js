#!/usr/bin/env node

import { Command } from 'commander';
import { backfillEntireDirectory } from './backfill.js';
const program = new Command();

// --- CLI

program
  .name('globetrotter')
  .description('Globetrotter CLI interface')
  .version('1.0.0');

program.command('load-json')
  .description('Backfill translations from translation files in JSON format. This command writes files for each locale to the directory specified')
  .argument('<string>', 'directory to load')
  .option('--locales <string>', 'Comma-separated list of locales to backfill', 'en-US,fr-FR,es-ES,zh-CN,ja-JP,ko-KR,pt-PT,de-DE,hi-IN,ru-RU')
  .option('--default <string>', 'Default locale to backfill from. Name of the locale file must be the locale itself', 'en-US')
  .option('--ext <string>', 'File extensions to use', '.json')
  .option('--keep_existing_translations', 'If specified, globetrotter will keep pre-existing translations in files', false)
  .action((directory, options) => {
    console.log('Starting Globetrotter load-json...');
    return backfillEntireDirectory(directory, options);
  });

program.parse();

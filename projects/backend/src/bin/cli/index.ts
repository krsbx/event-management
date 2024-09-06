import { CommandLineParser } from '@rushstack/ts-command-line';
import { MigratorCli } from '../migrator';
import { GeneratorCli } from '../generator';

export class BackendCli extends CommandLineParser {
  constructor() {
    super({
      toolDescription: 'Backend CLI.',
      toolFilename: 'backend-cli',
    });

    this.addAction(new MigratorCli());
    this.addAction(new GeneratorCli());
  }
}

const cli = new BackendCli();

cli.executeAsync();

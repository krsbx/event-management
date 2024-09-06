import {
  CommandLineAction,
  CommandLineChoiceParameter,
  CommandLineStringParameter,
} from '@rushstack/ts-command-line';
import { MigrationAction } from './utils/constants.migrator';
import { connectDB } from '../../utils/mongoose';
import {
  listMigrationHistories,
  listSeeders,
} from '../migrations/utils/helper.migrations';
import {
  downMigrations,
  latestMigrations,
  revertMigrations,
  upMigrations,
} from './utils/helper.migrations';

export class MigratorCli extends CommandLineAction {
  private action: CommandLineChoiceParameter<MigrationAction>;
  private target: CommandLineStringParameter;

  constructor() {
    super({
      actionName: 'migrate',
      summary: 'Run mongodb seeder.',
      documentation: 'Run mongodb seeder.',
    });

    this.action = this.defineChoiceParameter({
      alternatives: [
        MigrationAction.UP,
        MigrationAction.DOWN,
        MigrationAction.LATEST,
        MigrationAction.REVERT,
      ],
      description: 'Type of migration actions',
      parameterLongName: '--action',
      defaultValue: MigrationAction.LATEST,
    });

    this.target = this.defineStringParameter({
      argumentName: 'TARGET',
      parameterLongName: '--target',
      description: 'Target migration name',
    });
  }

  protected async onExecute() {
    const db = await connectDB();

    const histories = await listMigrationHistories();

    const seeders = await listSeeders();

    switch (this.action.value) {
      case MigrationAction.UP: {
        return upMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
      }

      case MigrationAction.DOWN: {
        return downMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
      }

      case MigrationAction.REVERT: {
        return revertMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
      }

      case MigrationAction.LATEST: {
        return latestMigrations({
          db,
          histories,
          migrations: seeders,
          target: this.target.value,
        });
      }

      default: {
        throw new Error(`Unknown action: ${this.action.value}`);
      }
    }
  }
}

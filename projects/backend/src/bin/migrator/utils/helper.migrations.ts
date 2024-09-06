import { Mongoose } from 'mongoose';
import { Backend } from '../../../types/backend';
import { Migration } from '../../migrations/models/migration.migrations';

type MigrationParams = {
  migrations: { name: string; migration: Backend.Migration }[];
  db: Mongoose;
  histories: string[];
  target: string | undefined;
};

export async function upMigrations({
  db,
  histories,
  migrations,
  target,
}: MigrationParams) {
  if (histories.length === 0) {
    console.log('No migrations to be applied!');
    return;
  }

  const migration = target
    ? migrations.find((migration) => migration.name === target)
    : migrations[migrations.length - 1];

  if (!migration) {
    console.log(`Migration "${target}" not found!`);
    return;
  }

  if (histories.includes(migration.name)) {
    console.log(`Migration "${migration.name}" already applied!`);
    return;
  }

  const session = await db.startSession();

  await session.withTransaction(async () => {
    await migration.migration.up(session);

    await Migration.create({
      migrationName: migration.name,
      executedAt: new Date(),
    });
  });

  session.endSession();
}

export async function downMigrations({
  db,
  histories,
  migrations,
  target,
}: MigrationParams) {
  const migration = target
    ? migrations.find((migration) => migration.name === target)
    : migrations[migrations.length - 1];

  if (!migration) {
    console.log(`Migration "${target}" not found!`);
    return;
  }

  if (!histories.includes(migration.name)) {
    console.log(`Migration "${migration.name}" not applied!`);
    return;
  }

  const session = await db.startSession();

  await session.withTransaction(async () => {
    await migration.migration.down(session);

    await Migration.deleteOne()
      .where({
        migrationName: target,
      })
      .session(session);
  });

  session.endSession();
}

export async function revertMigrations({
  db,
  histories,
  migrations,
}: MigrationParams) {
  if (histories.length === 0) {
    console.log('No migrations to be reverted!');
    return;
  }

  for (const { migration, name } of migrations) {
    const session = await db.startSession();

    await session.withTransaction(async () => {
      await migration.down(session);

      await Migration.deleteOne()
        .where({
          migrationName: name,
        })
        .session(session);
    });

    session.endSession();
  }
}

export async function latestMigrations({
  db,
  histories,
  migrations,
}: MigrationParams) {
  if (histories.length === migrations.length) {
    console.log('No new migrations to be applied!');
    return;
  }

  const targets = migrations.filter(
    (migration) => !histories.includes(migration.name)
  );

  for (const target of targets) {
    const session = await db.startSession();

    await session.withTransaction(async () => {
      await target.migration.up(session);

      await Migration.create([
        {
          migrationName: target.name,
          executedAt: new Date(),
        },
      ]);

      session.endSession();
    });
  }
}

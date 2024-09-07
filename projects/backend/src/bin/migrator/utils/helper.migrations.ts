/* eslint-disable no-restricted-syntax */
import { Mongoose } from 'mongoose';
import { MigrationFile } from '../../../types/backend';
import { Migration } from '../../migrations/models/migration.migrations';

type MigrationParams = {
  migrations: { name: string; migration: MigrationFile }[];
  db: Mongoose;
  histories: string[];
  target: string | undefined;
};

export async function upMigrations({
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

  await migration.migration.up();

  await Migration.create({
    migrationName: migration.name,
    executedAt: new Date(),
  });

  console.log(`Applied "${target}" migration!`);
}

export async function downMigrations({
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

  await migration.migration.down();

  await Migration.deleteOne().where({
    migrationName: target,
  });

  console.log(`Reverted "${target}" migration!`);
}

export async function revertMigrations({
  histories,
  migrations,
}: MigrationParams) {
  if (histories.length === 0) {
    console.log('No migrations to be reverted!');
    return;
  }

  for (const { migration, name } of migrations) {
    await migration.down();

    await Migration.deleteOne().where({
      migrationName: name,
    });
  }

  console.log(`Reverted ${migrations.length} migrations!`);
}

export async function latestMigrations({
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
    await target.migration.up();

    await Migration.create([
      {
        migrationName: target.name,
        executedAt: new Date(),
      },
    ]);
  }

  console.log(`Applied ${targets.length} new migrations!`);
}

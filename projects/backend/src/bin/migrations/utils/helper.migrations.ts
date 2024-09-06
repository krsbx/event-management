import _ from 'lodash';
import path from 'node:path';
import fs from 'node:fs';
import { Migration } from '../models/migration.migrations';
import { APP_SERVICE_PATH } from '../../../utils/constants';
import { Backend } from '../../../types/backend';

export async function listMigrationHistories() {
  const histories = await Migration.find().sort({ executedAt: -1 });

  return histories.map((h) => h.migrationName);
}

function listDirectoryServices() {
  const services = fs.readdirSync(APP_SERVICE_PATH);
  const filtered = services.map((service) => {
    const stats = fs.lstatSync(path.resolve(APP_SERVICE_PATH, service));

    if (stats.isDirectory()) return service;

    return null;
  });

  return _.compact(filtered);
}

function listServiceSeeders(service: string) {
  const servicePath = path.resolve(APP_SERVICE_PATH, service);
  const seedersPath = path.resolve(servicePath, 'seeders');

  if (!fs.existsSync(seedersPath)) return [];

  const stats = fs.lstatSync(seedersPath);

  if (!stats.isDirectory()) return [];

  const files = fs.readdirSync(seedersPath);
  files.sort((a, b) => a.localeCompare(b));

  return files.map((file) => path.resolve(seedersPath, file));
}

export async function listSeeders() {
  const services = listDirectoryServices();
  const migrations = services.map(listServiceSeeders).flat();
  migrations.sort((a, b) => a.localeCompare(b));

  return Promise.all(
    migrations.map(async (migration) => ({
      name: path.parse(migration).name,
      migration: (await import(migration)) as Backend.Migration,
    }))
  );
}

export interface MigrationFile {
  up(): Promise<void>;
  down(): Promise<void>;
}

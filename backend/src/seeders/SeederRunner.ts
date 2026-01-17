import { TrainerSeeder } from './TrainerSeeder';

export class SeederRunner {
  private seeders: Array<{ name: string; seeder: any }> = [];

  constructor() {
    this.seeders = [
      { name: 'TrainerSeeder', seeder: new TrainerSeeder() },
    ];
  }

  async run(): Promise<void> {
    console.log('🚀 Starting seeders...\n');

    try {
      for (const { name, seeder } of this.seeders) {
        console.log(`\n📦 Running ${name}...`);
        await seeder.seed();
      }

      console.log('\n✅ All seeders completed successfully!');
    } catch (error) {
      console.error('\n❌ Error running seeders:', error);
      throw error;
    }
  }

  async runSpecific(seederName: string): Promise<void> {
    const seeder = this.seeders.find(s => s.name === seederName);
    
    if (!seeder) {
      throw new Error(`Seeder "${seederName}" not found`);
    }

    console.log(`\n📦 Running ${seederName}...`);
    await seeder.seeder.seed();
    console.log(`✅ ${seederName} completed successfully!`);
  }
}

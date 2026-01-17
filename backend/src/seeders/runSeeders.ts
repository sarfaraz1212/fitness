import { connectDB } from '../config/database';
import { SeederRunner } from './SeederRunner';

const runSeeders = async () => {
  try {
    await connectDB();
    console.log('📦 Database connected\n');

    const runner = new SeederRunner();
    
    const seederName = process.argv[2];
    
    if (seederName) {
      await runner.runSpecific(seederName);
    } else {
      await runner.run();
    }

  
    process.exit(0);
  } catch (error) {
    console.error('❌ Error running seeders:', error);
    process.exit(1);
  }
};

runSeeders();

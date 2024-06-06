import * as dotenv from 'dotenv';
import * as path from 'path';

const setUp = (): void => {
  const testEnv = dotenv.config({
    path: path.join(process.cwd(), '.env.local.test'),
  });

  Object.assign(process.env, {
    ...testEnv.parsed,
  });
};

export default setUp;

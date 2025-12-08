import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config(); // .env file

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_BACKEND_URL + '/graphql',
  documents: ['./src/api/graphql/**/*.tsx'],
  generates: {
    './src/api/graphql/__generated__/': {
      preset: 'client',
    },
  },
};

export default config;

import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'cjs',
    format: 'es',
  },
  plugins: [
    typescript({
      module: 'esnext',
      target: 'esnext',
      noImplicitAny: true,
      moduleResolution: 'node',
      strict: true,
    }),
  ],
};

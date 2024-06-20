import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#modules': path.resolve(__dirname, './src/modules'),
      '#database': path.resolve(__dirname, './src/database'),
      '#http': path.resolve(__dirname, './src/http'),
      '#utils': path.resolve(__dirname, './src/utils'),
      '#@types': path.resolve(__dirname, './src/@types'),
    },
  },
});

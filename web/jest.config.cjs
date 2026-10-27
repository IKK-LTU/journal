// Jest + ts-jest. Type checking is done by `pnpm typecheck` (tsc), so ts-jest only transpiles here:
// the app's tsconfig uses bundler-only options (moduleResolution "bundler", .ts imports) that CommonJS Jest can't use.
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          jsx: 'react-jsx',
          module: 'commonjs',
          moduleResolution: 'node',
          target: 'ES2022',
          esModuleInterop: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    // Same alias as vite.config.ts / tsconfig: "@/x" → "src/x"
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.cjs',
  },
};

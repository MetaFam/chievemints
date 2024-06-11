import type { Config } from 'jest'

export const config: Config = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '@/config': '<rootDir>/src/config',
    '@/components': '<rootDir>/src/components/index',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
}

export default config
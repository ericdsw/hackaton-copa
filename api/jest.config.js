module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
		'**/src/**/*.test.(ts|js)'
	],
	testEnvironment: 'node',
  setupFiles: [
    '<rootDir>/src/setupTests.ts',
  ],
};
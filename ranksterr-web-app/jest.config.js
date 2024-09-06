module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Ensure this line is present
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Correctly map CSS files
        '^@/(.*)$': '<rootDir>/$1', // Ensure this line is present for alias resolution
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
        '^.+\\.(js|jsx)$': 'babel-jest', // Transform JavaScript files
    },
    transformIgnorePatterns: [
        "/node_modules/(?!@shadcn/ui)" // Add any other packages that need transformation
    ],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json', // Ensure this points to your tsconfig
        },
    },
};
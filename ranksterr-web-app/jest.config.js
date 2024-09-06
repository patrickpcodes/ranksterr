module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Ensure this line is present
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1', // Add this line to handle the alias
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest', // Ensure this line is present
    },
};
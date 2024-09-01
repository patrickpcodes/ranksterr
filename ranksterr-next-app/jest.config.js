const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
  
  module.exports = config;
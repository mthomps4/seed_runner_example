export {};

const run = () => {
  const { file } = require('minimist')(process.argv.slice(2));
  console.log({ file });

  if (file === '') {
    return console.log('ERROR: file name required');
  }
  console.log({ file });
};

run();

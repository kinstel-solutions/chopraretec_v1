const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'original-assets/certificates/iso-9001-2015-cerficate-(nqa).pdf');
const output = path.join(__dirname, 'test-cert.webp');

console.log(`Attempting to convert ${input} to ${output}`);

sharp(input)
  .toFile(output)
  .then(info => {
    console.log('Success:', info);
  })
  .catch(err => {
    console.error('Error:', err);
  });

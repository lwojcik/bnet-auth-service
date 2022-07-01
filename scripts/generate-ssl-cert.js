/* eslint-disable @typescript-eslint/no-var-requires */
const makeCert = require('make-cert');
const fs = require('fs');
const path = require('path');

const { key, cert } = makeCert('localhost');

const certDir = path.join(__dirname, '..', 'certs');
const keyPath = path.join(certDir, 'localhost.key');
const certPath = path.join(certDir, 'localhost.pem');

if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

fs.writeFileSync(keyPath, key);
fs.writeFileSync(certPath, cert);

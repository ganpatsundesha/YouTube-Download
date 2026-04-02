const fs = require('fs');
const https = require('https');
const path = require('path');
const os = require('os');

const isWin = os.platform() === 'win32';

// We only need to download the specialized linux compiled binary on Linux/Vercel
// so it doesn't require python3 to exist on the host os.
if (isWin) {
  console.log('Windows detected. Skipping yt-dlp_linux download.');
  process.exit(0);
}

const binDir = path.join(process.cwd(), 'bin');
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

const destFile = path.join(binDir, 'yt-dlp_linux');
if (fs.existsSync(destFile)) {
  console.log('yt-dlp_linux already exists. Skipping download.');
  process.exit(0);
}

console.log('Downloading standalone compiled yt-dlp_linux...');

const file = fs.createWriteStream(destFile);
https.get('https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux', (response) => {
  if (response.statusCode === 301 || response.statusCode === 302) {
    https.get(response.headers.location, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        fs.chmodSync(destFile, 0o755); // make executable
        console.log('yt-dlp_linux downloaded successfully!');
      });
    }).on('error', (err) => {
      fs.unlinkSync(destFile);
      console.error('Error downloading yt-dlp_linux:', err.message);
      process.exit(1);
    });
  } else {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      fs.chmodSync(destFile, 0o755); // make executable
      console.log('yt-dlp_linux downloaded successfully!');
    });
  }
}).on('error', (err) => {
  fs.unlinkSync(destFile);
  console.error('Error downloading yt-dlp_linux:', err.message);
  process.exit(1);
});

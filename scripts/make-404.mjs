// GitHub Pages serves 404.html for unknown URLs. The client-rendered shell lets the router show the site's own 404 page.
import { copyFileSync, existsSync } from 'node:fs';

const dir = 'dist/noble-wave/browser';
if (!existsSync(dir + '/index.csr.html')) {
  console.error('make-404: build output not found, run the build first');
  process.exit(1);
}
copyFileSync(dir + '/index.csr.html', dir + '/404.html');
console.log('make-404: wrote ' + dir + '/404.html');

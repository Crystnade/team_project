const app = document.getElementById('app');
if (app) {
  const info = document.createElement('div');
  info.className = 'runtime-info';
  info.textContent = 'Environment: development';
  app.appendChild(info);
}

document.querySelectorAll('[data-image-pair]').forEach(figure => {
  const image = figure.querySelector('img[data-original]');
  const link = figure.querySelector('.image-stage');
  const controls = figure.querySelector('.image-switch');
  const buttons = Array.from(controls.querySelectorAll('button[data-version]'));
  controls.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => {
    const version = button.dataset.version;
    image.src = image.dataset[version];
    link.href = image.src;
    link.setAttribute('aria-label', 'Open ' + version + ' image at full resolution');
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
});

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Our Services', path: '/services' },
  { label: 'Contact us', path: '/contact' },
];

function renderPage({ title, activePath, content }) {
  const links = navigation
    .map(({ label, path }) => {
      const current = path === activePath ? ' aria-current="page"' : '';
      return `<a href="${path}"${current}>${label}</a>`;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f7f2e8">
    <title>${title} | Baobab Table</title>
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="/" aria-label="Baobab Table home">
        <span class="brand-mark" aria-hidden="true">B</span>
        <span>baobab<span class="brand-light"> table</span></span>
      </a>
      <nav class="site-nav" aria-label="Main navigation">${links}</nav>
    </header>
    <main>${content}</main>
    <footer class="site-footer">
      <p>Baobab Table <span aria-hidden="true">·</span> Good food, good company.</p>
      <p>Open Monday to Friday, 9:00 am – 5:00 pm</p>
    </footer>
  </body>
</html>`;
}

module.exports = renderPage;

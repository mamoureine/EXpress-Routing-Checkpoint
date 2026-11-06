const renderPage = require('../views/render-page');

function isWithinWorkingHours(date) {
  const day = date.getDay();
  const hour = date.getHours();

  return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
}

function createBusinessHoursMiddleware(now = () => new Date()) {
  return (req, res, next) => {
    if (isWithinWorkingHours(now())) {
      return next();
    }

    return res.status(503).send(
      renderPage({
        title: 'We’re currently closed',
        activePath: '',
        content: `
          <section class="page-intro">
            <p class="eyebrow">See you soon</p>
            <h1>We’re currently closed</h1>
            <p>Our restaurant is open Monday to Friday, from 9:00 to 17:00.</p>
            <p>Please visit us during opening hours. We look forward to welcoming you.</p>
          </section>
        `,
      }),
    );
  };
}

module.exports = createBusinessHoursMiddleware;
module.exports.isWithinWorkingHours = isWithinWorkingHours;

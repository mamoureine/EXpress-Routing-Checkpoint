const { createApp } = require('./app');
const createBusinessHoursMiddleware = require('./middleware/business-hours');

const isWithinWorkingHours = createBusinessHoursMiddleware.isWithinWorkingHours;

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createApp().listen(port, () => {
    console.log(`Baobab Table is listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  createWorkingHoursMiddleware: createBusinessHoursMiddleware,
  isWithinWorkingHours,
};

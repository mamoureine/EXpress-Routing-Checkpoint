const express = require('express');
const path = require('path');
const createBusinessHoursMiddleware = require('./middleware/business-hours');
const renderPage = require('./views/render-page');

function createApp(now) {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(createBusinessHoursMiddleware(now));

  app.get('/', (req, res) => {
    res.send(
      renderPage({
        title: 'Home',
        activePath: '/',
        content: `
        <section class="hero">
          <div class="hero-copy">
            <p class="eyebrow">A taste of West Africa</p>
            <h1>A taste of West Africa, made with heart</h1>
            <p class="hero-description">
              Gather around the table for generous plates, vibrant spices, and
              the warmth of a meal made to be shared.
            </p>
            <a class="button" href="/services">Explore our menu</a>
          </div>
          <div class="hero-art" role="img" aria-label="Illustration of a colourful African-inspired meal">
            <span class="sun"></span>
            <span class="plate"><span class="meal"></span></span>
            <span class="art-caption">Made with heart <span aria-hidden="true">✦</span></span>
          </div>
        </section>
        <section class="welcome">
          <p class="eyebrow">Welcome to Baobab Table</p>
          <h2>There’s always room at our table.</h2>
          <p>
            From slow-cooked jollof to crisp plantain, we bring much-loved
            flavours and fresh ingredients together in every dish.
          </p>
        </section>
      `,
      }),
    );
  });

  app.get('/services', (req, res) => {
    res.send(
      renderPage({
        title: 'Our Services',
        activePath: '/services',
        content: `
        <section class="page-intro">
          <p class="eyebrow">Made for sharing</p>
          <h1>Something delicious for every occasion</h1>
          <p>However you like to gather, we’ll bring something delicious to the table.</p>
        </section>
        <section class="service-grid" aria-label="Restaurant services">
          <article class="service-card">
            <span class="card-number">01</span>
            <h2>Dine with us</h2>
            <p>Settle in for a relaxed meal, friendly service, and the flavours of home.</p>
          </article>
          <article class="service-card">
            <span class="card-number">02</span>
            <h2>Takeaway</h2>
            <p>Take your favourites to go, freshly prepared and packed for the journey.</p>
          </article>
          <article class="service-card">
            <span class="card-number">03</span>
            <h2>Catering</h2>
            <p>Let us help make your celebration memorable with a feast made for your guests.</p>
          </article>
        </section>
        <p class="service-note">Ask us about today’s specials when you get in touch.</p>
      `,
      }),
    );
  });

  app.get('/contact', (req, res) => {
    res.send(
      renderPage({
        title: 'Contact us',
        activePath: '/contact',
        content: `
        <section class="page-intro">
          <p class="eyebrow">We’d love to hear from you</p>
          <h1>We saved you a seat</h1>
          <p>Planning a visit or a celebration? Get in touch and we’ll be happy to help.</p>
        </section>
        <section class="contact-panel">
          <div>
            <p class="eyebrow">Come by</p>
            <h2>Find us</h2>
            <p>42 Market Street<br>Accra, Ghana</p>
          </div>
          <div>
            <p class="eyebrow">Say hello</p>
            <h2>Get in touch</h2>
            <p><a href="tel:+233200123456">+233 20 012 3456</a><br>
            <a href="mailto:hello@baobabkitchen.example">hello@baobabkitchen.example</a></p>
          </div>
          <div>
            <p class="eyebrow">Visit us</p>
            <h2>Opening hours</h2>
            <p>Monday to Friday<br>9:00 am – 5:00 pm</p>
          </div>
        </section>
      `,
      }),
    );
  });

  app.use((req, res) => {
    res.status(404).send(
      renderPage({
        title: 'Page not found',
        activePath: '',
        content: `
        <section class="page-intro">
          <p class="eyebrow">404</p>
          <h1>We can’t find that page.</h1>
          <p>Try one of the links in the navigation to find your way back.</p>
        </section>
      `,
      }),
    );
  });

  return app;
}

module.exports = { createApp };

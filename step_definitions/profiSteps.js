const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {
  Given(/^открыта главная страница profi$/, () => {
    return client
      .url('http://profi.ru');
  });

  When(/^кликнули на переключатель городов$/, () => {
    return client.page.profi().section.header
      .click('@city');
  });
});
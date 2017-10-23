const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {
  Given(/^открыта главная страница profi$/, () => {
    return client
      .url('http://profi.ru');
  });

  When(/^кликнули на переключатель городов$/, () => {
    return client.page.profi().section.header
      .click('@city').api.pause(5000);
  });

  Then(/^открылся список городов$/, () => {
  	var profi = client.page.profi();
  	return profi.assert.visible('@citylist');
  });

  When(/^выбрали раздел "(.*?)"$/, (name) => {
    return client.page.profi().section.search.setValue('@service', name);
  });

  When(/^выбрали район "(.*?)"$/, (name) => {
  	return client.page.profi().section.search
      .assert.visible('@geo');
  });

  When(/^кликнули поиск$/, () => {
    return client.page.profi().section.search.click('@searchButton');
  });

  Then(/^открылся список предложений$/, () => {
    return client.page.profi().section.content.assert.visible('@offers').api.pause(5000);
  });

});
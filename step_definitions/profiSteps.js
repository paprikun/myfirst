const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');
var prices = [];

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

  Given(/^открыта страница выполненных заказов$/, () => {
  	return client
  		.url('https://profi.ru/completed-orders/autoinstructor/');
  }); 

  When (/^собрать цены в массив$/, () => {
  	return client
  	.elements('css selector', 'b.completed_orders__order__details__price', function(result) {

		var els = result.value;
        var i = 0;
        els.forEach(function(el, j){
            client.elementIdText(el.ELEMENT, function(text) {
                prices[j] = parseInt(text.value);
                //console.log(prices[j]);
                //i++;
            });
        });
	
    });
  });
  Then (/^проверить что все цены больше (.\d+?)$/, (value) => {
  	var check = true;
  	prices.forEach(function(el, i){
  	  if (el < value){
  	  	check = false;
  	  }
  	});
  	return client.assert.ok(check);
  });
});


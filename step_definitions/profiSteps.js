const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');
var prices = [];
var profi = client.page.profi();
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
  	 let sel = client.page.profi().section.content.elements.price.selector;
  	return client
  	.elements('css selector', sel, (result) =>{
		var els = result.value;
        els.forEach((el)=>{
            client.elementIdText(el.ELEMENT, (text) => {
                prices.push(parseInt(text.value));
            });
        });
	
    });
  });
  Then (/^проверить что все цены больше (.\d+?)$/, (value) => {
  	var check = true;
  	if (prices.length == 0){
  		check = false;
  	}
  	prices.forEach((el, i) => {
  	  if (el < value){
  	  	check = false;
  	  }
  	});
  	return client.assert.ok(check);
  });

  When (/^кликнули на "(.*?)"$/, (name) => {
  	return profi.section.footer.click('@conditions');
  });

  When (/^перейти на соседнюю вкладку$/, () => {
	return client.windowHandles( function(result) {
		var handle = result.value[1];
		client.switchWindow(handle);
		client.pause(3000);
	  });

  });


  Then (/^заголовок "(.*?)"$/, (name) => {
  	console.log(client.title());
  	return client.assert.title(name);
  });

});


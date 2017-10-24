const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');
let prices = [];
let profi = client.page.profi();
let mainhandle;
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

  	client.windowHandle( function(result) {
		mainhandle = result.value;
  	});
  	return profi.section.footer.click('@conditions');
  });

  When (/^перейти на соседнюю вкладку$/, () => {
	return client.windowHandles( function(result) {
		let handle;
		if (result.value[0] == mainhandle){
			 handle = result.value[1];
		}if (result.value[1] == mainhandle){
			 handle = result.value[0];
		}
			client.switchWindow(handle);
	  })
  });

  Then (/^заголовок "(.*?)"$/, (name) => {
  	return client.assert.title(name)
  	.closeWindow()
  	.pause(3000);
  });

});


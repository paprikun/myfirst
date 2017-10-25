const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');
let prices = [];
let profi = client.page.profi();
let openTabs = [];
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

  	client.windowHandles( function(result) {
		openTabs = result.value;
  	});
  	return profi.section.footer.click('@conditions');
  });

  When (/^перейти на соседнюю вкладку$/, () => {
	return client.windowHandles( function(result) {
		let handle;
		//console.log(result.value);
		let new_openTabs = result.value;
		//console.log('old = ' + new_openTabs);
		openTabs.forEach( (el, i) => {
			new_openTabs.splice(new_openTabs.indexOf(el), 1);			
		});
		//console.log('new = ' + new_openTabs);
		client.switchWindow(new_openTabs[0]);
	  })
  });

  Then (/^заголовок "(.*?)"$/, (name) => {
  	return client.assert.title(name)
  	.closeWindow()
  	.pause(3000);
  });

});


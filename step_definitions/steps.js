const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {
  Given(/^I open Google`s search page$/, () => {
    return client
      .url('http://google.com');
  });

  Given(/^I open DuckDuckGo search page$/, () => {
    return client
      .url('https://duckduckgo.com/');
  });
  
  Given(/^I open Kinopoisk search page$/, () => {
    return client
      .url('https://www.kinopoisk.ru');
  });
  
  When(/^I find film "(.*?)"$/, (name) => {
		client.waitForElementVisible('input[name=kp_query]',1000);
	  return client.setValue('input[name=kp_query]', name);
  });
 
   Then(/^Check that rating is visible$/, () => {
	client.pause(1000);
	return client.waitForElementVisible("div[class*='first'] > a > div[class*='positive']",1000);
  });
  
  Then(/^Film rating is higher than (.[0-9]?)$/, (data) => {	
  //div[class*='first'] > a > div[class*='positive']
  //a[href='/film/453397/sr/2/'] > div:last-child
	return client.getText("div[class*='first'] > a > div[class*='positive']", function(result) {
		var rate = parseFloat(result.value);
		console.log(rate);
		console.log(data);
		client.assert.ok(rate > data )
	});
  });
  
  Then(/^the title is "(.*?)"$/, (text) => {
    return client.assert.title(text);
  }); 

  Then(/^the Google search form exists$/, () => {
    return client.assert.visible('input[name="q"]');
  });

  Then(/^the DuckDuckGo search form exists$/, () => {
    return client.assert.visible('input[name="q"]');
  });
});

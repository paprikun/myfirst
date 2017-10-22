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
 

 
   Then(/^Click on ref of film$/, () => {
	client.pause(1000);
	return client.waitForElementVisible("div[class*='first'] > a",1000).click("div[class*='first'] > a");
  });
 
 
  Then(/^Film rating is higher than (.[0-9]?)$/, (data) => {	
	client.waitForElementVisible("span.rating_ball",1000);
	return client.getText("span.rating_ball", function(result) {
		var rate = parseFloat(result.value);
		console.log(rate);
		console.log(data);
		client.assert.ok(rate > data )
	});
  });
  
  Then(/^Login mail$/, () => {
    return client
      .waitForElementVisible('body', 1000)
      .assert.visible('input[name=login]')
	  .assert.visible('input[name=password]')
	  .setValue('input[name=login]','paprikun')
	  .setValue('input[name=password]', ['password', client.Keys.ENTER])
      .pause(5200);	  
  });

  Given(/^I open mail$/, () => {
    return client
      .url('https://mail.ru/');
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

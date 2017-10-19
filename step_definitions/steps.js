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
    return client.assert.visible('input[name=kp_query]')
				 .setValue('input[name=kp_query]', [name, client.Keys.ENTER])
  });
 
  When(/^Check that rating is visible$/, () => {
		return client.assert.visible('div[class=block_left_pad] :nth-child(4) div[class=right]');
  });
  
  Then(/^Film rating is higher than (.[0-9]?)$/, (data) => {	
		return client.getText("div[class=block_left_pad] :nth-child(4) div[class=right] :first-child", function(result) {
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
      .pause(5000);	  
  });

  Given(/^I open mail$/, () => {
    return client
      .url('https://mail.ru/');
  });

  
  Then(/^the title is "(.*?)"$/, (text) => {
    return client.assert.title(text);
  });
  
  Then(/^write request "(.*?)"$/, (text) => {
    return client
      .waitForElementVisible('body', 1000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
	  .setValue('input[type=text]', ['rembrandt van rijn', client.Keys.ENTER])
	  .assert.containsText('div[id=rso] div[class=srg] :first-child', 'Rembrandt')
      .end();

  });
  

  Then(/^the Google search form exists$/, () => {
    return client.assert.visible('input[name="q"]');
  });

  Then(/^the DuckDuckGo search form exists$/, () => {
    return client.assert.visible('input[name="q"]');
  });
});

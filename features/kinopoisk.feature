Feature: Kinopoisk

Scenario: Searching Kinopoisk

  Given I open Kinopoisk search page
  When I find film "Оно"
  And Click on ref of film
  Then Film rating is higher than 7
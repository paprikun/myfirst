Feature: Kinopoisk

Scenario: Searching Kinopoisk

  Given I open Kinopoisk search page
  When I find film "Оно"
  And Check that rating is visible
  Then Film rating is higher than 7
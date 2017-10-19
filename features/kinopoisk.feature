Feature: Kinopoisk

Scenario: Searching Kinopoisk

  Given I open Kinopoisk search page
  When I find film "Оно"
  Then Check that rating is visible
  And Film rating is higher than 7
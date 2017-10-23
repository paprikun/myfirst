@test
Feature: Profi

Scenario: Test Profi

  Given открыта главная страница profi
  When кликнули на переключатель городов
  Then открылся список городов

Scenario: Test finder

  Given открыта главная страница profi
  When выбрали раздел "ремонт квартир"
  And выбрали район "Речной вокзал"
  And кликнули поиск
  Then открылся список предложений


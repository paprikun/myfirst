
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

Scenario: Test offers

	Given открыта страница выполненных заказов
	When собрать цены в массив
	Then проверить что все цены больше 100

@test

Scenario: Test other tab

	Given открыта главная страница profi
	When кликнули на "Условия использвоания"
	And перейти на соседнюю вкладку
	Then заголовок "Правовые документы"

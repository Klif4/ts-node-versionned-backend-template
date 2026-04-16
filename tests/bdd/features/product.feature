Feature: Product management

  Scenario: Retrieve a product by its ID
    Given the following products exist:
      | id | name   | price |
      | 1  | Widget | 9.99  |
      | 2  | Gadget | 19.99 |
    When I look up product with id "1"
    Then I should receive a product named "Widget" with price 9.99

  Scenario: Get unique product names
    Given the following products exist:
      | id | name   | price |
      | 1  | Widget | 9.99  |
      | 2  | Gadget | 19.99 |
      | 3  | Widget | 14.99 |
    When I request all unique product names
    Then I should get 2 unique names
    And the unique names should include "Widget" and "Gadget"

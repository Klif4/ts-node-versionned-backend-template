Feature: Shopping Cart

  As a customer
  I want to manage items in my cart
  So that I can review and adjust my order before checking out

  Background:
    Given Sophie is logged in to her account

  Rule: A customer can add items to their cart

    Scenario: Adding an available item to an empty cart
      Given Sophie is browsing the "Wireless Headphones" product page
      And the item has 15 units in stock
      When she adds 1 unit to her cart
      Then her cart contains 1 "Wireless Headphones"
      And the cart subtotal is €89.99

    Scenario: Adding multiple quantities of the same item
      Given Sophie's cart contains 1 "Wireless Headphones"
      When she adds 2 more units
      Then her cart contains 3 "Wireless Headphones"
      And the cart subtotal is €269.97

  Rule: A customer cannot add more items than available stock

    Scenario: Attempting to add more than available stock
      Given "Bluetooth Speaker" has 2 units in stock
      When Sophie tries to add 5 units to her cart
      Then only 2 units are added to her cart
      And she is informed that only 2 units are available

  Rule: A customer can remove items from their cart

    Scenario: Removing an item from the cart
      Given Sophie's cart contains "Wireless Headphones" and "USB-C Cable"
      When she removes "USB-C Cable" from her cart
      Then her cart contains only "Wireless Headphones"
      And the cart subtotal is updated to €89.99

package me.stefan923.ecommerce.dto;

import lombok.Data;
import me.stefan923.ecommerce.entity.Address;
import me.stefan923.ecommerce.entity.Customer;
import me.stefan923.ecommerce.entity.Order;
import me.stefan923.ecommerce.entity.OrderItem;

import java.util.Set;

@Data
public class PurchasePayload {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}

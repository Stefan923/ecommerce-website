package me.stefan923.ecommerce.service;

import me.stefan923.ecommerce.dto.PurchasePayload;
import me.stefan923.ecommerce.dto.PurchaseResponse;
import me.stefan923.ecommerce.entity.Customer;
import me.stefan923.ecommerce.entity.Order;
import me.stefan923.ecommerce.entity.OrderItem;
import me.stefan923.ecommerce.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServerImpl implements CheckoutService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CheckoutServerImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(PurchasePayload purchasePayload) {
        Order order = purchasePayload.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchasePayload.getOrderItems();
        orderItems.forEach(order::add);

        Customer customer = purchasePayload.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }

}

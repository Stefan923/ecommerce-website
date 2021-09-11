package me.stefan923.ecommerce.service;

import me.stefan923.ecommerce.dto.PurchasePayload;
import me.stefan923.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(PurchasePayload purchasePayload);

}

package me.stefan923.ecommerce.controller;

import me.stefan923.ecommerce.dto.PurchasePayload;
import me.stefan923.ecommerce.dto.PurchaseResponse;
import me.stefan923.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody PurchasePayload purchasePayload) {
        return checkoutService.placeOrder(purchasePayload);
    }

}

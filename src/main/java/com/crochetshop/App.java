package com.crochetshop;

import com.crochetshop.model.Product;
import com.crochetshop.service.StoreService;

public class App {
    public static void main(String[] args) {
        StoreService store = new StoreService();

        store.addProduct(new Product(1, "Sunflower Crochet Bouquet", 25.0));
        store.addProduct(new Product(2, "Custom Crochet Teddy Bear", 40.0));
        store.addProduct(new Product(3, "Crochet Bag", 30.0));

        System.out.println("Welcome to Crochet E-Commerce Store!");
        store.showProducts();

        store.addToCart(1);
        store.addToCart(2);

        store.showCart();
    }
}

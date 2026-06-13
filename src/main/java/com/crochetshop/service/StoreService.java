package com.crochetshop.service;
//Version 1 
import com.crochetshop.model.Product;
import java.util.*;

public class StoreService {
    private List<Product> products = new ArrayList<>();
    private List<Product> cart = new ArrayList<>();

    public void addProduct(Product p) {
        products.add(p);
    }

    public void showProducts() {
        System.out.println("\nAvailable Products:");
        for (Product p : products) {
            System.out.println(p.getId() + " - " + p.getName() + " : $" + p.getPrice());
        }
    }

    public void addToCart(int productId) {
        for (Product p : products) {
            if (p.getId() == productId) {
                cart.add(p);
                System.out.println(p.getName() + " added to cart.");
            }
        }
    }

    public void showCart() {
        System.out.println("\nYour Cart:");
        double total = 0;
        for (Product p : cart) {
            System.out.println(p.getName() + " : $" + p.getPrice());
            total += p.getPrice();
        }
        System.out.println("Total: $" + total);
    }
}

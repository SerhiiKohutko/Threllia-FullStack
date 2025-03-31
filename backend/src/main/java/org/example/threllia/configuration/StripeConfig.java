package org.example.threllia.configuration;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class StripeConfig {
    @Value("sk_test_51QdASjDjB1NHUeBfJwHzy0i7SjUoLIdWkqL6Rs4KCHj5mmii7EuetiwXLS6kPvy46JgCxE9MKjebHxqihrJrLkbV00CoFQNBp6")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }
}

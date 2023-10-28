import { useState } from "react";

type PaymentMethod = "stripe" | "paypal" | "binance";

export default function FormAddPaymentMethod() {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");

    function handlePaymentMethodChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPaymentMethod(event.target.value as PaymentMethod);
    }

    function handlePaymentButtonClick() {
        switch (paymentMethod) {
            case "stripe":
                window.location.href = "/stripe-payment";
                break;
            case "paypal":
                window.location.href = "/paypal-payment";
                break;
            case "binance":
                window.location.href = "/binance-payment";
                break;
            default:
                break;
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Select a payment method:</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={handlePaymentMethodChange}
                    />
                    Stripe
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={handlePaymentMethodChange}
                    />
                    PayPal
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="binance"
                        checked={paymentMethod === "binance"}
                        onChange={handlePaymentMethodChange}
                    />
                    Binance
                </label>
            </div>
            <button onClick={handlePaymentButtonClick}>Pay with {paymentMethod}</button>
        </form>
    );
}
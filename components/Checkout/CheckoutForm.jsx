"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { Button, Text, Container, Group, Alert } from "@mantine/core";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import EmailComponent from "../EmailComponent";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = ({ booking }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [processing, setProcessing] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		if (error) setError(null);
		setProcessing(true);

		const cardElement = elements.getElement(CardElement);

		const { error: paymentMethodError, paymentMethod } =
			await stripe.createPaymentMethod({
				type: "card",
				card: cardElement,
			});

		if (paymentMethodError) {
			setError(paymentMethodError.message);
			setProcessing(false);
			return;
		}

		try {
			// Create payment intent on the server
			const response = await fetch("/api/stripe/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amount: booking.booking_amount * 100 }), // Amount in cents
			});

			const { client_secret } = await response.json();

			// Confirm the card payment with Stripe
			const { error: confirmError } = await stripe.confirmCardPayment(
				client_secret,
				{
					payment_method: paymentMethod.id,
				}
			);

			if (confirmError) {
				setError(confirmError.message);
				setProcessing(false);
				return;
			}
			console.log(booking);
			// // Payment succeeded, now create the booking
			// const bookingResponse = await fetch("/api/bookings/", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify(booking),
			// });

			// if (!bookingResponse.ok) {
			// 	throw new Error("Failed to create booking");
			// }

			setSuccess(true); // Mark the process as successful


		} catch (error) {
			setError("An unexpected error occurred.");
		} finally {
			setProcessing(false);
		}
	};

	return (
		// <div className="max-w-xs mx-auto">
		// 	<form onSubmit={handleSubmit}>
		// 		<div className="flex flex-col space-y-4">
		// 			<div className="p-4 border rounded-lg">
		// 				<CardElement options={{ hidePostalCode: true }} />
		// 			</div>

		// 			<button
		// 				type="submit"
		// 				disabled={!stripe || processing}
		// 				className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md ${
		// 					!stripe || processing ? "opacity-50 cursor-not-allowed" : ""
		// 				}`}
		// 			>
		// 				{processing ? "Processing..." : "Pay"}
		// 			</button>

		// 			{error && (
		// 				<div className="flex items-start p-4 bg-red-100 border border-red-400 rounded-md">
		// 					<svg
		// 						className="h-6 w-6 text-red-500 mr-3"
		// 						fill="none"
		// 						stroke="currentColor"
		// 						viewBox="0 0 24 24"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 					>
		// 						<path
		// 							strokeLinecap="round"
		// 							strokeLinejoin="round"
		// 							strokeWidth="2"
		// 							d="M12 8v4m0 4h.01M19.938 9.486a9 9 0 11-15.856 0m15.856 0A8.961 8.961 0 0012 3v0a8.961 8.961 0 00-7.938 6.486m15.856 0A9.015 9.015 0 0112 21v0a9.015 9.015 0 01-7.938-11.514"
		// 						/>
		// 					</svg>
		// 					<div>
		// 						<strong className="font-semibold">Payment Error: </strong>
		// 						{error}
		// 					</div>
		// 				</div>
		// 			)}

		// 			{success && (
		// 				<>
		// 					<div className="flex items-start p-4 bg-green-100 border border-green-400 rounded-md">
		// 						<svg
		// 							className="h-6 w-6 text-green-500 mr-3"
		// 							fill="none"
		// 							stroke="currentColor"
		// 							viewBox="0 0 24 24"
		// 							xmlns="http://www.w3.org/2000/svg"
		// 						>
		// 							<path
		// 								strokeLinecap="round"
		// 								strokeLinejoin="round"
		// 								strokeWidth="2"
		// 								d="M5 13l4 4L19 7"
		// 							/>
		// 						</svg>
		// 						<div>
		// 							<strong className="font-semibold">Success:</strong> Payment
		// 							Successful!
		// 						</div>
		// 					</div>
		// 					<EmailComponent booking={booking} />
		// 				</>
		// 			)}
		// 		</div>
		// 	</form>
		// </div>

		<form onSubmit={handleSubmit} className="border p-4">
			<CardElement options={{ hidePostalCode: true }} />
			<button
				type="submit"
				disabled={!stripe}
				className={`w-full m-4 mx-auto py-2 px-4 font-semibold text-white ${
					stripe
						? "bg-blue-500 hover:bg-blue-600"
						: "bg-gray-400 cursor-not-allowed"
				} rounded-lg shadow-md transition duration-200 ease-in-out`}
			>
				{stripe ? "Pay" : "Loading..."}
			</button>

			{error && <div>{error}</div>}
			{success && (
				<div>
					<EmailComponent booking={booking} success={success} />
				</div>
			)}
		</form>
	);
};

const Checkout = ({ booking }) => (
	<Elements stripe={stripePromise}>
		<CheckoutForm booking={booking} />
	</Elements>
);

export default Checkout;

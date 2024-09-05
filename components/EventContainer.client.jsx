// /components/EventContainer.client.jsx
"use client";

import React from "react";
import ProductCard from "./Home/ProductCard";

function EventContainer({ events }) {
	return (
		<div className="container" id="container">
			{events.length > 0 ? (
				events.map((event, index) => (
					<ProductCard key={index} product={event} />
				))
			) : (
				<p>No events available</p>
			)}
		</div>
	);
}

export default EventContainer;

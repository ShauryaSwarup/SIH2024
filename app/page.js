import { auth } from "@/auth";
import "../components/Home/Home.css";
import MetaData from "@/components/Home/MetaData";
import ProductCard from "@/components/Home/ProductCard";
import SignIn from "@/components/SignIn/SignIn";
import React from "react";
import { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import eventsData from "../components/Home/EventsData.json";
import SignUp from "@/components/SignUp";

async function page() {
  const session = await auth();

    const backgroundStyle = {
			backgroundImage: 'url("/images/musuem.jpg")', // Path to your background image
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			position: "relative",
			height: "80vh",
			width: "100%",
			// opacity: 0.3, // Adjust opacity to make the image translucent
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		};

  return (
		<>
			{session ? (
				<>
					<Fragment>
						{/* loading ? (
              <Loading />
            ) : ( */}
						<Fragment>
							<MetaData title="OAGMS" />
							<div className="banner">
								<p>Welcome to Sarathi</p>
								<SignUp />
								<h1>BEST HANDPICKED EVENTS ARE AWAITING YOU</h1>

								<a href="#container">
									<button>
										Scroll <CgMouse />
									</button>
								</a>
							</div>

							<h2 className="homeHeading">Featured Events</h2>

							<div className="container" id="container">
								{/* take products from EventsData.json and set them to product card */}
								{eventsData.events.map((event, index) => (
									<ProductCard key={index} product={event} />
								))}
							</div>
						</Fragment>
						{/* )
            } */}
					</Fragment>
				</>
			) : (
				<div
					style={backgroundStyle}
					className="flex items-center justify-center "
				>
					<SignIn />
				</div>
			)}
		</>
	);
}

export default page;



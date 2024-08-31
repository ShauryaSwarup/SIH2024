"use client";
import ChatRoom from "@/components/Chat/ChatRoom";
import {
	Container,
	Grid,
	Paper,
	SimpleGrid,
	Skeleton,
	Text,
	rem,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const PRIMARY_COL_HEIGHT = rem("80vh");

export default function page() {
	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const eventId = useParams().eventId;
	console.log("Hello: ", eventId);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(`/api/events/${eventId}`);
				setEvent(response.data.event);
			} catch (err) {
				setError("Failed to fetch event details");
			} finally {
				setLoading(false);
			}
		};

		fetchEvent();
	}, [eventId]);
	// if (loading) {
	// 	return (
	// 		<Grid gutter="md">
	// 			<Grid.Col span={4}>
	// 				<Skeleton height={50} radius="md" animate={true} />
	// 			</Grid.Col>
	// 			<Grid.Col span={6}>
	// 				<Skeleton height={50} radius="md" animate={true} />
	// 			</Grid.Col>
	// 			<Grid.Col span={6}>
	// 				<Skeleton height={50} radius="md" animate={true} />
	// 			</Grid.Col>
	// 		</Grid>
	// 	);
	// }

	// if (error) {
	// 	return <Text color="red">{error}</Text>;
	// }

	return (
		<Container my="md">
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
				{/* <Grid gutter="md">
					<Grid.Col span={4}>
						<Text weight={500}>Title:</Text>
						<Text>{event && event.name}</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text weight={500}>Description:</Text>
						<Text>{event && event.description}</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text weight={500}>Start Date:</Text>
						<Text>
							{event &&
								event.startDate &&
								new Date(event.startDate).toLocaleDateString()}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text weight={500}>End Date:</Text>
						<Text>
							{event &&
								event.endDate &&
								new Date(event.endDate).toLocaleDateString()}
						</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text weight={500}>Start Time:</Text>
						<Text>{event && event.startTime}</Text>
					</Grid.Col>
					<Grid.Col span={6}>
						<Text weight={500}>End Time:</Text>
						<Text>{event && event.endTime}</Text>
					</Grid.Col>
				</Grid> */}
				<Grid gutter="md">
					<Grid.Col>
						<Skeleton
							height={SECONDARY_COL_HEIGHT}
							radius="md"
							animate={false}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Skeleton
							height={SECONDARY_COL_HEIGHT}
							radius="md"
							animate={false}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Skeleton
							height={SECONDARY_COL_HEIGHT}
							radius="md"
							animate={false}
						/>
					</Grid.Col>
				</Grid>
				<Paper>
					<ChatRoom />
				</Paper>
			</SimpleGrid>
		</Container>
	);
}

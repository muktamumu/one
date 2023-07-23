import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import { Box, Center, HStack, Skeleton, VStack } from "native-base";
import AppHeader from "../components/AppHeader";
import ResultList from "../components/ResultPage/ResultList";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { rootURL, serverURL } from "../../Global";

const SignupScreen = ({ navigation, setLoggedIn, route }) => {
	const [isLoading, setLoading] = useState(0);

	async function getProfileData() {
		try {
			setLoading(1);
			const data = {
				ticket: route.params.ticket,
			};
			axios
				.get(rootURL + "API214/getInfo", { params: data })
				.then((response) => {
					setLoading(0);
				})
				.catch((error) => {
					setLoading(0);
				});
		} catch (error) {
			setLoading(0);
		}
	}

	// Function to fetch data from the server using the provided API URL and sso-ticket
	const fetchDataFromServer = async (ssoTicket) => {
		try {
			const url = "https://eco.du.ac.bd/api_test_one.php";
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ssoTicket}`,
			};

			const response = await axios.get(url, { headers });

			const data = response.data; // The response data (JSON format)
			// ... Process the data as required ...

			// Assuming the server returns some data in the response
			// Handle the data as required, for example:
			console.log("Data from server:", data);
			// ... Process the data further as needed ...
		} catch (error) {
			console.error("Error fetching data:", error);
			// Handle the error as needed
		}
	};

	useEffect(() => {
		fetchDataFromServer(
			"af552d3bd4f267e54e2430d46d23b308f0c5828d12962bc042d79d9e64a9dbaf83fe4bcfe236723a70d429d58eae8adbe5f590aaf07f330bbc05bf172d292d24"
		);
	}, []);

	return (
		<View>
			<AppHeader title="Signup" />
			<ScrollView>
				<LoadingView />
				<Box
					flex={1}
					padding={5}
					alignItems="center"
					justifyContent="center"
					mt={"80%"}
				>
					<Text fontSize={24} opacity={0.5} style={{ textAlign: "center" }}>
						Sign UP Please {route.params.ticket}
					</Text>
				</Box>
			</ScrollView>
		</View>
	);
};


const LoadingView = () => {
	return (
		<Center w="100%">
			<VStack
				w="90%"
				maxW="400"
				borderWidth="1"
				space={6}
				rounded="md"
				alignItems="center"
				_dark={{
					borderColor: "coolGray.500",
				}}
				_light={{
					borderColor: "coolGray.200",
				}}
			>
				<Skeleton h="40" />
				<Skeleton
					borderWidth={1}
					borderColor="coolGray.200"
					endColor="warmGray.50"
					size="20"
					rounded="full"
					mt="-70"
				/>
				<HStack space="2">
					<Skeleton size="5" rounded="full" />
					<Skeleton size="5" rounded="full" />
					<Skeleton size="5" rounded="full" />
					<Skeleton size="5" rounded="full" />
					<Skeleton size="5" rounded="full" />
				</HStack>
				<Skeleton.Text lines={12} alignItems="center" px="12" />
				<Skeleton mb="3" w="40" rounded="20" />
			</VStack>
		</Center>
	);
};

export default SignupScreen;

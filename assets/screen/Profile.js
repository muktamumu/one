import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	Box,
	FlatList,
	Heading,
	Avatar,
	HStack,
	VStack,
	Text,
	Spacer,
	Center,
	NativeBaseProvider,View, Icon
} from "native-base";
import Header from "../components/Header";


function Profile() {
	const [studentName, setstudentName] = useState("মুক্তা দত্ত");
	const [session, setsession] = useState("২০১৫-১৬");
	const [hallName, sethallName] = useState("রোকেয়া হল");
	const [photo, setPhoto] = useState(
		"https://v2.result.du.ac.bd/assets/student.png"
	);

	const checkLoginStatus = async () => {
		const name = JSON.parse(await AsyncStorage.getItem("name"));
		setsession(JSON.parse(await AsyncStorage.getItem("session")));
		sethallName(JSON.parse(await AsyncStorage.getItem("hall")));
		const ph = await AsyncStorage.getItem("photo");
		setstudentName(name);
		setPhoto(ph);
	};

	useEffect(() => {
		checkLoginStatus();
	}, []);

    const [activeTab, setActiveTab] = useState(0);

		const handleTabChange = (index) => {
			setActiveTab(index);
		};

        const data = [
					{
						id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
						fullName: "Aafreen Khan",
						timeStamp: "12:47 PM",
						recentText: "Good Day!",
						avatarUrl:
							"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
					},
					{
						id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
						fullName: "Sujitha Mathur",
						timeStamp: "11:11 PM",
						recentText: "Cheer up, there!",
						avatarUrl:
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
					},
					{
						id: "58694a0f-3da1-471f-bd96-145571e29d72",
						fullName: "Anci Barroco",
						timeStamp: "6:22 PM",
						recentText: "Good Day!",
						avatarUrl:
							"https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
					},
					{
						id: "68694a0f-3da1-431f-bd56-142371e29d72",
						fullName: "Aniket Kumar",
						timeStamp: "8:56 PM",
						recentText: "All the best",
						avatarUrl:
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
					},
					{
						id: "28694a0f-3da1-471f-bd96-142456e29d72",
						fullName: "Kiara",
						timeStamp: "12:47 PM",
						recentText: "I will call today.",
						avatarUrl:
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
					},
				];

	return (
		<>
        <Header/>
			<View
				bg="white"
				pt={55}
				borderRadius="lg"
				shadow={2}
				padding={4}
				width="100%"
				alignItems="center"
			>
				<Avatar size="2xl" source={{ uri: photo }} mb={4} />
				<Text color="darkBlue" fontSize="xl" fontWeight="bold" mb={2}>
					{studentName}
				</Text>
				<View flexDirection="row" alignItems="center" mb={2}>
					<Icon
						name="school"
						type="MaterialCommunityIcons"
						color="darkBlue"
						size={5}
						mr={2}
					/>
					<Text color="darkBlue" fontSize="md">
						XYZ University
					</Text>
				</View>
				<View flexDirection="row" alignItems="center">
					<Icon
						name="email"
						type="MaterialIcons"
						color="darkBlue"
						size={5}
						mr={2}
					/>
					<Text color="darkBlue" fontSize="md">
						john.doe@example.com
					</Text>
				</View>
			</View>

			<Box
            bg={"yellow.100"}
				borderRadius="lg"
				shadow={2}
				padding={4}
				width="90%"
				alignItems="center"
			>
				<Heading fontSize="xl" p="4" pb="3">
					Inbox
				</Heading>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<Box
							borderBottomWidth="1"
							_dark={{
								borderColor: "muted.50",
							}}
							borderColor="muted.800"
							pl={["0", "4"]}
							pr={["0", "5"]}
							py="2"
						>
							<HStack space={[2, 3]} justifyContent="space-between">
								<Avatar
									size="48px"
									source={{
										uri: item.avatarUrl,
									}}
								/>
								<VStack>
									<Text
										_dark={{
											color: "warmGray.50",
										}}
										color="coolGray.800"
										bold
									>
										{item.fullName}
									</Text>
									<Text
										color="coolGray.600"
										_dark={{
											color: "warmGray.200",
										}}
									>
										{item.recentText}
									</Text>
								</VStack>
								<Spacer />
								<Text
									fontSize="xs"
									_dark={{
										color: "warmGray.50",
									}}
									color="coolGray.800"
									alignSelf="flex-start"
								>
									{item.timeStamp}
								</Text>
							</HStack>
						</Box>
					)}
					keyExtractor={(item) => item.id}
				/>
			</Box>
		</>
	);
}

export default Profile;

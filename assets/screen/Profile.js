import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heading, HStack, VStack, View, ScrollView } from "native-base";
import { colorOne, colorTwo, serverURL } from "../../Global";
import AppHeader from "../components/AppHeader";
import { ImageBackground, StyleSheet } from "react-native";
import { Dimensions, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Box, Text, Center, Image, Skeleton } from "native-base";
import ProfileCard from "../components/ProfilePage/ProfileCard";
import axios from "axios";
import ShowAlert from "../components/ShowAlert";

function Profile(navigation, setLoggedIn, result) {
	const [showAlert1, setShowAlert] = useState(false);
	const [alertText, setalertText] = useState("");
	const [alertType, setalertType] = useState("");

	const handleShowAlert = (type, text) => {
		setalertText(text);
		setalertType(type);
		setShowAlert(true);
	};

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	const [photo, setPhoto] = useState(
		"https://v2.result.du.ac.bd/assets/student.png"
	);

	const FirstRoute = () => (
		<Center m="4">
			<VStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Student's Name
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].name_en}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Student's Name (Bangla)
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].name_bn}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Father's Name
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].father_name}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Mother's Name
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].mother_name}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Phone Number
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].phone}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Email Address
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].email}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Date of Birth
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].dob}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Blood Group
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].blood_group}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Religion
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].dhormo}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Gender
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].gender === "1"
								? "Male"
								: data[0].gender === "2"
								? "Female"
								: "Other"}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Present Address
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].present_add}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Permanent Address
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].perm_add + "," + address}
						</Text>
					</VStack>
				</HStack>
			</VStack>
		</Center>
	);

	const SecondRoute = () => (
		<Center m="4">
			<VStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Registration
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].reg_num}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Session
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{session}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Department
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].dept_name}
						</Text>
					</VStack>
				</HStack>
				<HStack>
					<VStack w={"40%"}>
						<Text fontWeight="bold" style={styles.title}>
							Hall
						</Text>
					</VStack>
					<VStack w={"10%"}>
						<Text style={styles.colon}>:</Text>
					</VStack>
					<VStack w={"50%"}>
						<Text fontWeight="bold" style={styles.value}>
							{data[0].hall_name}
						</Text>
					</VStack>
				</HStack>
			</VStack>
		</Center>
	);

	const [index, setIndex] = useState(0);
	function getTabData(i) {
		setIndex(i);
	}

	const initialLayout = {
		width: Dimensions.get("window").width,
	};

	const renderScene = SceneMap({
		first: FirstRoute,
		second: SecondRoute,
	});

	const [routes] = useState([
		{ key: "first", title: "Personal" },
		{ key: "second", title: "Academic" },
	]);

	const renderTabBar = (props) => {
		const inputRange = props.navigationState.routes.map((x, i) => i);

		return (
			<Box flexDirection="row">
				{props.navigationState.routes.map((route, i) => {
					const opacity = props.position.interpolate({
						inputRange,
						outputRange: inputRange.map((inputIndex) =>
							inputIndex === i ? 1 : 0.5
						),
					});
					const color = index === i ? "#fafaf9" : colorOne;
					const bg = index === i ? colorTwo : "#e5e5e5";
					return (
						<Box
							flex={1}
							bg={bg}
							alignItems="center"
							p="3"
							cursor="pointer"
							key={`tab-${i}`}
						>
							<Pressable
								onPress={() => {
									getTabData(i);
								}}
							>
								<Heading size={"xs"} isTruncated style={{ color }}>
									{route.title}
								</Heading>
							</Pressable>
						</Box>
					);
				})}
			</Box>
		);
	};

	const [data, setData] = useState();
	const [address, setAddress] = useState();

	const [reg, setReg] = useState();
	const [session, setSession] = useState();

	const makeSession = (v) => {
		const four = v.substring(0, 4);
		const five = parseInt(four);

		const resp = four + "-" + Number(five + 1);

		setSession(resp);
	};

	const checkLoginStatus = async () => {
		const r = await AsyncStorage.getItem("reg");
		setReg(r);
		makeSession(r);
		getProfileData(r);
	};

	async function getProfileData(reg) {
		try {
			const data = {
				reg: reg,
			};
			axios
				.get(serverURL + "getProfileData", { params: data })
				.then((response) => {
					if (response.data["status"] === 200) {
						setData(response.data["data"]);
						setAddress(response.data["address"]);
					} else if (response.data["status"] === 501) {
						console.log(response.data);
            handleShowAlert(
							"error",
							response.data["message"] || "Something Went Wrong!!!"
						);
					} else {
						handleShowAlert("error", response.data["message"]|| "Something Went Wrong!");
					}
				})
				.catch((error) => {
          console.log(error)
					handleShowAlert("error", "Something Went Wrong! ");
				});
		} catch (error) {
			handleShowAlert("error", "Something Went Wrong! ");
		}
	}

	useEffect(() => {
		checkLoginStatus();
	}, []);

	const LoadingAnimation = () => {
		return (
			<Center>
				<VStack
					w="98%"
					borderWidth="1"
					space={8}
					overflow="hidden"
					rounded="md"
					_dark={{
						borderColor: "coolGray.500",
					}}
					_light={{
						borderColor: "coolGray.200",
					}}
				>
					<Skeleton h="40" />
					<Skeleton.Text px="4" />
					<Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
				</VStack>
			</Center>
		);
	};

	return (
		<>
			<AppHeader title="Profile" />
			{data ? (
				<>
					<ProfileCard
						photo={data[0].chobi}
						name={data[0].name_en}
						dept={data[0].dept_name}
						hall={data[0].hall_name}
					/>

					<TabView
						navigationState={{ index, routes }}
						renderScene={renderScene}
						renderTabBar={renderTabBar}
						onIndexChange={setIndex}
						initialLayout={initialLayout}
					/>
				</>
			) : (
				<LoadingAnimation />
			)}

			{showAlert1 && (
				<ShowAlert
					status={alertType}
					Tx={alertText}
					onClose={handleCloseAlert}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	title: {},
	colon: {},
	value: {},
});

export default Profile;

import React, { useState } from "react";
import axios from "axios";
import {
	Stack,
	Text,
	Alert,
	VStack,
	HStack,
	Divider,
	Center,
	IconButton,
	Box,
	Badge,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { colorOne, colorTwo, serverURL } from "../../../Global";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getTimeAge } from "../../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SyllabusList({ setLoggedIn, index, data, title, icon }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpansion = async (desc, id) => {
		if ((desc, id)) {
			const reg = await AsyncStorage.getItem("reg");
			const token = await AsyncStorage.getItem("token");

			setCourses(desc);
			const toSend = {
				reg: reg,
				token: token,
				noticeId: id,
			};
			axios
				.get(serverURL + "addToNoticeViewHistory", { params: toSend })
				.then((response) => {})
				.catch((error) => {});
		} else {
			Toast.error("Something Went Wrong (ML66).");
		}
		setIsExpanded(!isExpanded);
	};

	const [courses, setCourses] = useState();

	return (
		<Stack
			space={3}
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			paddingY={1}
			key={index}
		>
			<Center w="96%" key={index}>
				<Alert w="100%" bg={"white"} color={colorOne} key={index}>
					<VStack space={2} flexShrink={1} w="100%" key={index}>
						<HStack
							flexShrink={1}
							space={2}
							alignItems="center"
							justifyContent="space-between"
							key={index}
						>
							<HStack space={2} flexShrink={1} alignItems="center">
								<Ionicons
									name={icon ? icon : "checkmark-circle"}
									size={24}
									color={colorOne}
								/>

								<Text
									fontSize="md"
									fontWeight="medium"
									color={colorOne}
									_dark={{
										color: "coolGray.800",
									}}
									onPress={() => toggleExpansion(data.description, data.id)}
								>
									{title + ' (' + data.year + ')' }
								</Text>
							</HStack>

							<IconButton
								variant="unstyled"
								color={colorTwo}
								_focus={{
									borderWidth: 0,
								}}
								_icon={{
									as: isExpanded ? Ionicons : Ionicons,
									name: isExpanded ? "chevron-up" : "chevron-down",
									size: 18,
									color: "coolGray.600",
								}}
								onPress={() => toggleExpansion(data.description, data.id)}
							/>
						</HStack>
						
						{isExpanded && (
							<Box marginX={"8%"}>
								{courses && (
									<HStack margin={"auto"} w="100%" key={index}>
										<Text fontSize="sm" color={colorTwo}>
											{courses}
										</Text>
									</HStack>
								)}

								<Divider my={2} />
							</Box>
						)}
						
					</VStack>
				</Alert>
			</Center>
		</Stack>
	);
}

export default SyllabusList;

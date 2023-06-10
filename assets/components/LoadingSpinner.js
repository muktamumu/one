import React from "react";
import { Alert, HStack, Heading, Spinner } from "native-base";

export default LoadingSpinner = () => {
			return (
				<HStack space={2} justifyContent="center">
					<Spinner accessibilityLabel="Loading posts" color="white" />
					<Heading color="white" fontSize="md">
						Loading
					</Heading>
				</HStack>
			);
		}; 
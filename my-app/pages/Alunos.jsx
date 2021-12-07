import {
	Actionsheet,
	Box,
	HStack,
	Icon,
	Pressable,
	Spacer,
	Text,
	VStack,
	useDisclose,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";

import { Path } from "react-native-svg";
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";

const Alunos = () => {
	const [alunos, setAlunos] = useState([]);

	const { isOpen, onOpen, onClose } = useDisclose();

	useEffect(() => {
		axios
			.get("https://secret-headland-69654.herokuapp.com/alunos")
			.then((response) => {
				setAlunos(response.data);
			});
	}, []);

	const renderItem = ({ item, index }) => (
		<Box>
			<Pressable onPress={onOpen} bg="white">
				<Box pl="4" pr="5" py="2">
					<HStack alignItems="center" space={3}>
						<VStack>
							<Text
								color="coolGray.800"
								_dark={{ color: "warmGray.50" }}
								bold
							>
								{item.nome}
							</Text>
							<Text
								color="coolGray.600"
								_dark={{ color: "warmGray.200" }}
							>
								{item.cidade}
							</Text>
						</VStack>
						<Spacer />
						<Text
							fontSize="xs"
							color="coolGray.800"
							_dark={{ color: "warmGray.50" }}
							alignSelf="flex-start"
						>
							{`${item.idade} anos`}
						</Text>
					</HStack>
				</Box>
			</Pressable>
		</Box>
	);

	return (
		<>
			<SwipeListView data={alunos} renderItem={renderItem} />

			<Actionsheet isOpen={isOpen} onClose={onClose} size="full">
				<Actionsheet.Content>
					<Box w="100%" h={60} px={4} justifyContent="center">
						<Text
							fontSize="16"
							color="gray.500"
							_dark={{
								color: "gray.300",
							}}
						>
							Albums
						</Text>
					</Box>
					<Actionsheet.Item
						startIcon={
							<Icon
								as={MaterialIcons}
								color="trueGray.400"
								mr="1"
								size="6"
								name="delete"
							/>
						}
					>
						Delete
					</Actionsheet.Item>
					<Actionsheet.Item
						startIcon={
							<Icon
								as={MaterialIcons}
								name="share"
								color="trueGray.400"
								mr="1"
								size="6"
							/>
						}
					>
						Share
					</Actionsheet.Item>
					<Actionsheet.Item
						startIcon={
							<Icon
								as={Ionicons}
								name="play-circle"
								color="trueGray.400"
								mr="1"
								size="6"
							/>
						}
					>
						Play
					</Actionsheet.Item>
					<Actionsheet.Item
						startIcon={
							<Icon
								as={MaterialIcons}
								color="trueGray.400"
								mr="1"
								size="6"
								name="favorite"
							/>
						}
					>
						Favourite
					</Actionsheet.Item>
					<Actionsheet.Item
						p={3}
						startIcon={
							<Icon
								color="trueGray.400"
								mr="1"
								h="24"
								w="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
							</Icon>
						}
					>
						Cancel
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>
		</>
	);
};

export default Alunos;

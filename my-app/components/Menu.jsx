import * as React from "react";

import {
	Box,
	Button,
	Center,
	Divider,
	HStack,
	HamburgerIcon,
	Heading,
	Icon,
	NativeBaseProvider,
	Pressable,
	Text,
	VStack,
} from "native-base";
import {
	DrawerContentScrollView,
	createDrawerNavigator,
} from "@react-navigation/drawer";

import { AntDesign } from "@expo/vector-icons";
import Login from "../pages/Login";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
	switch (screenName) {
		case "Alunos":
			return "user";
		case "Login":
			return "login";
		case "Materias":
			return "book";
		default:
			return undefined;
	}
};

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props} safeArea>
			<VStack space="6" my="2" mx="1">
				<Box px="4">
					<Text bold color="gray.700">
						Mail
					</Text>
					<Text
						fontSize="14"
						mt="1"
						color="gray.500"
						fontWeight="500"
					>
						john_doe@gmail.com
					</Text>
				</Box>
				<VStack divider={<Divider />} space="4">
					<VStack space="3">
						{props.state.routeNames.map((name, index) => (
							<Pressable
								px="5"
								py="3"
								rounded="md"
								bg={
									index === props.state.index
										? "rgba(6, 182, 212, 0.1)"
										: "transparent"
								}
								onPress={(event) => {
									props.navigation.navigate(name);
								}}
								key={index}
							>
								<HStack space="7" alignItems="center">
									<Icon
										color={
											index === props.state.index
												? "primary.500"
												: "gray.500"
										}
										size="5"
										as={<AntDesign name={getIcon(name)} />}
									/>
									<Text
										fontWeight="500"
										color={
											index === props.state.index
												? "primary.500"
												: "gray.700"
										}
									>
										{name}
									</Text>
								</HStack>
							</Pressable>
						))}
					</VStack>
				</VStack>
			</VStack>
		</DrawerContentScrollView>
	);
}
function MyDrawer() {
	return (
		<Box safeArea flex={1}>
			<Drawer.Navigator
				drawerContent={(props) => <CustomDrawerContent {...props} />}
			>
				<Drawer.Screen name="Login" component={Login} />
				<Drawer.Screen name="Alunos" component={Login} />
				<Drawer.Screen name="Materias" component={Login} />
			</Drawer.Navigator>
		</Box>
	);
}
export default function App() {
	return (
		<NavigationContainer>
			<MyDrawer />
		</NavigationContainer>
	);
}

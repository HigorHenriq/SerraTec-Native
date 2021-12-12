import {
	Box,
	Divider,
	HStack,
	Icon,
	Pressable,
	Text,
	VStack,
} from "native-base";
import {
	DrawerContentScrollView,
	createDrawerNavigator,
} from "@react-navigation/drawer";
import React, { useContext, useEffect } from "react";

import AdicionarAlunos from "../pages/AdicionarAlunos";
import Alunos from "../pages/Alunos";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CadastrarUsuarios from "../pages/CadastrarUsuarios";
import Login from "../pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { UsuarioContext } from "../context/usuarios";

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
	switch (screenName) {
		case "Alunos":
			return "user";
		case "Login":
			return "login";
		case "Materias":
			return "book";
		case "Cadastrar Usuarios":
			return "adduser";
		case "Adicionar Alunos":
			return "addusergroup";
		case "Sair":
			return "logout";
		default:
			return undefined;
	}
};

function CustomDrawerContent(props) {
	const { setUsuario } = useContext(UsuarioContext);
	const renderLogout = () => {
		return (
			<Pressable
				px="5"
				py="3"
				rounded="md"
				bg={"transparent"}
				onPress={() => {
					setUsuario(undefined);
					AsyncStorage.removeItem("@usuario").then(() => {
						props.navigation.navigate("Login");
					});
				}}
			>
				<HStack space="7" alignItems="center">
					<Icon
						color={"#A2A1A6"}
						size="5"
						as={<AntDesign name={getIcon("Sair")} />}
					/>
					<Text fontWeight="500" color={"#A2A1A6"}>
						Sair
					</Text>
				</HStack>
			</Pressable>
		);
	};

	return (
		<DrawerContentScrollView {...props} safeArea>
			<VStack space="6" my="2" mx="1">
				<Box px="4">
					<Text bold color="#787A74">
						{props.usuario?.nome}
					</Text>
					<Text fontSize="14" mt="1" color="#787A74" fontWeight="500">
						{props.usuario?.email}
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
												? "#4561FF"
												: "#787A74"
										}
										size="5"
										as={<AntDesign name={getIcon(name)} />}
									/>
									<Text
										fontWeight="500"
										color={
											index === props.state.index
												? "#4561FF"
												: "#787A74"
										}
									>
										{name}
									</Text>
								</HStack>
							</Pressable>
						))}
						{renderLogout()}
					</VStack>
				</VStack>
			</VStack>
		</DrawerContentScrollView>
	);
}

//Desestrutura o aluno para poder passa-lo DrawerContentScrollView, quando o usuario logar
//irá aparecer seu email na barra de nav
function MyDrawer({ usuario }) {
	return (
		<Box safeArea flex={1}>
			<Drawer.Navigator
				drawerContent={(props) => (
					<CustomDrawerContent usuario={usuario} {...props} />
				)}
				//Opção para ocultar a barra de navegação caso não tenha usuario logado, após logar a nav irá aparecer
				screenOptions={{ headerShown: usuario ? true : false }}
				//Ternario usado para quando a navegação
				//Se o usuario já estiver Logado irá para a tela de Alunos
				initialRouteName={usuario ? "Alunos" : "Login"}
				drawerIcon={{ color: "blue" }}
			>
				<Drawer.Screen name="Login" component={Login} />
				<Drawer.Screen name="Alunos" component={Alunos} />
				<Drawer.Screen name="Materias" component={Materias} />
				<Drawer.Screen
					name="Cadastrar Usuarios"
					component={CadastrarUsuarios}
				/>
				<Drawer.Screen
					name="Adicionar Alunos"
					component={AdicionarAlunos}
				/>
			</Drawer.Navigator>
		</Box>
	);
}

export default function App() {
	const { usuario } = useContext(UsuarioContext);
	return (
		<NavigationContainer>
			<MyDrawer usuario={usuario} />
		</NavigationContainer>
	);
}

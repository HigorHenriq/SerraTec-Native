import "react-native-gesture-handler";

import {
	Alert,
	Button,
	CloseIcon,
	Collapse,
	HStack,
	IconButton,
	Input,
	Text,
	VStack,
} from "native-base";
import { default as React, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container } from "../components/Container";
import Title from "../components/Title";
import { UsuarioContext } from "../context/usuarios";
import axios from "axios";

const CadastrarUsuarios = ({ navigation }) => {
	const [nome, setNome] = useState();
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();

	//Iniciamos a MSG como false para não iniciar junto da aplicação
	const [mostrarMsgErro, setMostrarMsgErro] = useState(false);

	const [mostrarMsgSucesso, SetMostrarMsgSucesso] = useState(false);

	const { usuario, setUsuario } = useContext(UsuarioContext);

	useEffect(() => {
		if (setUsuario) navigation.navigate("Login");
	}, [usuario]);

	const limparInput = () => {
		setNome("");
		setEmail("");
		setSenha("");
	};

	const CadastrarUsuario = () => {
		axios
			.post("https://secret-headland-69654.herokuapp.com/usuario", {
				nome,
				email,
				senha,
			})
			.then((result) => {
				if (result.status === 201) {
					SetMostrarMsgSucesso(true);
				}

				setTimeout(() => {
					setUsuario(result.data);
					SetMostrarMsgSucesso(false);
				}, 1500);

				limparInput();
			})
			.catch((erro) => {
				setMostrarMsgErro(true);
			});
	};

	return (
		<Container>
			<Title>Cadastrar Novo Usuario</Title>

			{mostrarMsgSucesso && (
				<Collapse isOpen={mostrarMsgSucesso}>
					<Alert w="100%" status={"success"} mt="5">
						<VStack space={2} flexShrink={1} w="100%">
							<HStack
								flexShrink={1}
								space={2}
								justifyContent="space-between"
							>
								<HStack space={2} flexShrink={1}>
									<Alert.Icon mt="1" />
									<Text fontSize="md" color="coolGray.800">
										{"Usuario Registrado Com Sucesso!"}
									</Text>
								</HStack>
								<IconButton
									variant="unstyled"
									icon={
										<CloseIcon
											size="4"
											color="coolGray.600"
											onPress={() => {
												SetMostrarMsgSucesso(false);
											}}
										/>
									}
								/>
							</HStack>
						</VStack>
					</Alert>
				</Collapse>
			)}

			{/* Usamos uma renderização condicional se a condição é true, o elemento logo depois do && irá aparecer no resultado.*/}
			{mostrarMsgErro && (
				<Collapse isOpen={mostrarMsgErro}>
					<Alert w="100%" status={"error"} mt="5">
						<VStack space={2} flexShrink={1} w="100%">
							<HStack
								flexShrink={1}
								space={2}
								justifyContent="space-between"
							>
								<HStack space={2} flexShrink={1}>
									<Alert.Icon mt="1" />
									<Text fontSize="md" color="coolGray.800">
										{
											"Dados incompletos por favor verificar os campos preenchidos"
										}
									</Text>
								</HStack>
								<IconButton
									variant="unstyled"
									icon={
										<CloseIcon
											size="4"
											color="coolGray.600"
											onPress={() => {
												setMostrarMsgErro(false);
											}}
										/>
									}
								/>
							</HStack>
						</VStack>
					</Alert>
				</Collapse>
			)}

			<Input
				mx="3"
				placeholder="Nome"
				w={{
					base: "80%",
					md: "25%",
				}}
				style={{ marginTop: 20 }}
				onChangeText={setNome}
				value={nome}
				keyboardType="default"
			/>
			<Input
				mx="3"
				placeholder="Email"
				w={{
					base: "80%",
					md: "25%",
				}}
				style={{ marginTop: 20 }}
				onChangeText={setEmail}
				value={email}
				keyboardType="default"
			/>
			<Input
				mx="3"
				placeholder="Senha"
				w={{
					base: "80%",
					md: "25%",
				}}
				style={{ margin: 20 }}
				onChangeText={setSenha}
				value={senha}
				type="password"
			/>
			<Button
				size="lg"
				backgroundColor="#4561FF"
				onPress={() => CadastrarUsuario()}
			>
				Cadastrar
			</Button>
		</Container>
	);
};

export default CadastrarUsuarios;

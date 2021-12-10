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

const Login = ({ navigation }) => {
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();

	//Iniciamos a MSG como false para não iniciar junto da aplicação
	const [mostrarMsgErro, setMostrarMsgErro] = useState(false);

	const { usuario, setUsuario } = useContext(UsuarioContext);

	const limparInput = () => {
		setEmail("");
		setSenha("");
	};

	useEffect(() => {
		if (usuario) navigation.navigate("Alunos");
	}, [usuario]);

	const IrCadastrar = () => {
		navigation.navigate("Cadastrar Usuario");
	};

	const efetuarLogin = () => {
		axios
			.post("https://secret-headland-69654.herokuapp.com/logar", {
				email,
				senha,
			})
			.then(async (result) => {
				// {Key: '@usuario, value: ''}
				//JSON.stringfy = Transforma um OBJETO JavaScript para STRING
				const usuarioEmString = JSON.stringify(result.data);

				//---METODO DE MANTER O USUARIO LOGADO---
				AsyncStorage.removeItem("@usuario").then(() => {
					AsyncStorage.setItem("@usuario", usuarioEmString);
				});

				setUsuario(result.data);
				// console.log(result);
				limparInput();
			})
			.catch((erro) => {
				setMostrarMsgErro(true);
			});
	};

	return (
		<Container>
			<Title>SerraTec App</Title>
			<Text style={{ fontSize: 18, color: "#4561FF" }}>Bem-Vindo!</Text>

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
										{"Usuario Ou Senha Incorretos"}
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
				placeholder="Seu e-mail"
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
				placeholder="Sua senha"
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
				onPress={() => efetuarLogin()}
			>
				Login
			</Button>
			<Text style={{ marginTop: 15 }}>Ainda não possui uma conta?</Text>
			<Text
				style={{
					marginTop: 15,
					color: "#4561FF",
					borderBottomWidth: 4,
					borderBottomColor: "#4561FF",
					borderBottomRightRadius: 19,
				}}
				onPress={() => IrCadastrar()}
			>
				Criar Uma Conta
			</Text>
		</Container>
	);
};

export default Login;

import "react-native-gesture-handler";

import {
	Alert,
	Center,
	CloseIcon,
	Collapse,
	HStack,
	IconButton,
	NativeBaseProvider,
	Stack,
	Text,
	VStack,
} from "native-base";
import { Button, Input } from "native-base";
import { default as React, useContext, useState } from "react";

import { Container } from "../components/Container";
import Title from "../components/Title";
import { UsuarioContext } from "../context";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();

	//Iniciamos a MSG como false para não iniciar junto da aplicação
	const [mostrarMsgErro, setMostrarMsgErro] = useState(false);

	const { setUsuario } = useContext(UsuarioContext);

	const efetuarLogin = () => {
		axios
			.post("https://secret-headland-69654.herokuapp.com/logar", {
				email,
				senha,
			})
			.then((result) => {
				setUsuario(result.data);
				console.log(result);
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
		</Container>
	);
};

export default Login;

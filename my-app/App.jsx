import "react-native-gesture-handler";
import { Box, NativeBaseProvider, Input, Button } from "native-base";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { Container } from "./components/Container";
import MyTextInput from "./components/MyTextInput";
import Title from "./components/Title";

export default function App() {
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	return (
		<NativeBaseProvider>
			<Container>
				<Title>Serratec app</Title>
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
					variant="outline"
					onPress={() => console.log("clicou aqui")}
				>
					Login
				</Button>
				<StatusBar
					//MUDAR A COR MANUALMENTE DA BARRA
					backgroundColor="blue"
					//STYLE SERVE PARA ALTERAR A COR DOS ICONES DO TELEFONE
					style="light"

					//METODO 2 PARA ALTERAR A COR DA BARRA CASO A PRIMEIRA NÃO FUNCIONE
					// barStyle="dark-content"
				/>
			</Container>
		</NativeBaseProvider>
	);
}

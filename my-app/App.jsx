import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";

import GlobalContext from "./context";
import Menu from "./components/Menu";
import { NativeBaseProvider } from "native-base";

export default function App() {
	const [carregando, setCarregando] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setCarregando(false);
		}, 1000);
	}, []);

	return (
		<GlobalContext>
			<NativeBaseProvider>
				{!carregando ? <Menu /> : <Text>Carregando</Text>}
				<StatusBar
					//MUDAR A COR MANUALMENTE DA BARRA
					backgroundColor="#4561FF"
					//STYLE SERVE PARA ALTERAR A COR DOS ICONES DO TELEFONE
					style="light"

					//METODO 2 PARA ALTERAR A COR DA BARRA CASO A PRIMEIRA NÃO FUNCIONE
					// barStyle="dark-content"
				/>
			</NativeBaseProvider>
		</GlobalContext>
	);
}

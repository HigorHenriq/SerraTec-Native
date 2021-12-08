import "react-native-gesture-handler";

// import { UsuarioProvider } from "./context/usuarios";
import GlobalContext from "./context";
import Menu from "./components/Menu";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { StatusBar } from "react-native";

export default function App() {
	return (
		<GlobalContext>
			<NativeBaseProvider>
				<Menu />
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

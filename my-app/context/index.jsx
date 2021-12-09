import { AlunosProvider } from "./alunos";
import React from "react";
import { UsuarioProvider } from "./usuarios";

const GlobalContext = ({ children }) => {
	return (
		<UsuarioProvider>
			<AlunosProvider>{children}</AlunosProvider>
		</UsuarioProvider>
	);
};

export default GlobalContext;

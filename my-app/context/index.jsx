import React from "react";
import { UsuarioProvider } from "./usuarios";

const GlobalContext = ({ children }) => {
	return <UsuarioProvider>{children}</UsuarioProvider>;
};

export default GlobalContext;

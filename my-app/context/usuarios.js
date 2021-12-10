import React, { createContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {

    const [usuario, setUsuario] = useState();

    useEffect(() => {
        AsyncStorage.getItem("@usuario")
            .then(login => {

                // O JSON.parse Transforma uma STRING para um OBJETO JavaScript
                // Usamos esse ternario para não dar erro, pq o usuario demora um tempo até chegar no JSOn
                // ---METODO PARA DEIXAR O USUARIO LOGADO---
                const usuarioOBJ = login ? JSON.parse(login) : undefined;
                setUsuario(usuarioOBJ)
            })
    }, [])

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                setUsuario,
            }}
        >
            {children}
        </UsuarioContext.Provider>
    );
};
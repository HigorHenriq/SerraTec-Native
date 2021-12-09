import React, { createContext, useState } from 'react'

const AlunosContext = createContext()

const AlunosProvider = ({ children }) => {
    const [alunos, setAlunos] = useState()

    return (
        <AlunosContext.Provider
            value={{
                alunos,
                setAlunos
            }}
        >
            {children}
        </AlunosContext.Provider>
    )
}

export { AlunosProvider, AlunosContext }
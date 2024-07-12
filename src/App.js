import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom'; // Importar Link para navegação
import { Button } from 'react-bootstrap';
import AlunoForm from './components/AlunoForm';
import AlunoTable from './components/AlunoTable';
import AlunoDetail from './components/AlunoDetail';
import Sidebar from './components/Sidebar';

const App = () => {
    const [searchParams, setSearchParams] = useState({});

    const handleSearch = (key, value) => {
        setSearchParams((prevParams) => ({
            ...prevParams,
            [key]: value
        }));
    };

    return (
        <Router>
            <div className="App">
                <Sidebar />
                <div className="content">
                    <div className="container">
                        <Routes>
                            {/* Redireciona a rota raiz para /alunos */}
                            <Route path="/" element={<Navigate to="/alunos" />} />
                            {/* Rota para listar alunos com a tabela e o formulário de busca */}
                            <Route path="/alunos" element={
                                <>
                                    <h1 className="my-4">Lista de Alunos</h1>
                                    {/* Botão para navegar para a página de novo aluno */}
                                    <Link to="/alunos/novo">
                                        <Button variant="primary" className="mb-3">Novo Aluno</Button>
                                    </Link>
                                    {/* <AlunoForm onSearch={handleSearch} /> */}
                                    <AlunoTable searchParams={searchParams} />
                                </>
                            } />
                            {/* Rota para criar um novo aluno */}
                            <Route path="/alunos/novo" element={
                                <>
                                    {/* <h1 className="my-4">Novo Aluno</h1> */}
                                    <AlunoForm />
                                </>
                            } />
                            {/* Rota para detalhes do aluno */}
                            <Route path="/alunos/:id" element={<AlunoDetail />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;

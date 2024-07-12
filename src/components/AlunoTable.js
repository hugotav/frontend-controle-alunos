import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import styled from 'styled-components';

// Estilos
const Container = styled.div`
    margin: 20px;
`;

const SearchContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* Espaçamento entre os campos */
`;

const FormGroup = styled.div`
    flex: 1;
    min-width: 200px; /* Tamanho mínimo dos campos */
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f4f4f4;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const Button = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    background-color: ${props => props.primary ? '#007bff' : props.danger ? '#dc3545' : '#6c757d'};
    margin-right: 8px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.primary ? '#0056b3' : props.danger ? '#c82333' : '#5a6268'};
    }
`;

const AlunoTable = () => {
    const [alunos, setAlunos] = useState([]);
    const [searchParams, setSearchParams] = useState({
        nome: '',
        email: '',
        cpf: '',
        perfil: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/alunos', { params: searchParams });
                setAlunos(response.data.data); // Acessa a chave 'data' no JSON retornado
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, [searchParams]);

    // Função para lidar com mudanças nos campos de busca
    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    return (
        <Container>
            {/* <h1>Lista de Alunos</h1> */}
            <SearchContainer>
                <FormGroup>
                    <Label htmlFor="nome">Nome:</Label>
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        value={searchParams.nome}
                        onChange={handleSearchChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={searchParams.email}
                        onChange={handleSearchChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="cpf">CPF:</Label>
                    <Input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={searchParams.cpf}
                        onChange={handleSearchChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="perfil">Perfil:</Label>
                    <Input
                        type="text"
                        id="perfil"
                        name="perfil"
                        value={searchParams.perfil}
                        onChange={handleSearchChange}
                    />
                </FormGroup>
            </SearchContainer>

            <Table>
                <thead>
                    <tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th>CPF</Th>
                        <Th>Perfil</Th>
                        <Th>Ações</Th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <Td>{aluno.nome}</Td>
                            <Td>{aluno.email}</Td>
                            <Td>{aluno.cpf}</Td>
                            <Td>{aluno.perfil.tipo}</Td>
                            <Td>
                                <Button primary as="a" href={`/alunos/${aluno.id}`}>Detalhes</Button>
                                <Button as="a" href={`/alunos/${aluno.id}/editar`}>Editar</Button>
                                <Button danger as="a" href={`/alunos/${aluno.id}/deletar`}>Deletar</Button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AlunoTable;

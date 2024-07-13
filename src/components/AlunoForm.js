import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import styled from 'styled-components';

// Estilos do formulário
const Container = styled.div`
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    background-color: ${props => props.primary ? '#28a745' : '#6c757d'};
    margin-right: 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.primary ? '#218838' : '#5a6268'};
    }
`;

const AlunoForm = ({ onSearch }) => {
    const [aluno, setAluno] = useState({
        id: '',
        nome: '',
        email: '',
        cpf: '',
        perfilId: ''
    });
    const [perfis, setPerfis] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchPerfis = async () => {
            try {
                const response = await axiosInstance.get('/perfis');
                setPerfis(response.data);
            } catch (error) {
                console.error('Erro ao buscar perfis:', error);
            }
        };

        const fetchAluno = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/alunos/${id}`);
                    const alunoData = response.data;
                    setAluno({
                        id: alunoData.id,
                        nome: alunoData.nome,
                        email: alunoData.email,
                        cpf: alunoData.cpf,
                        perfilId: alunoData.perfil.id
                    });
                } catch (error) {
                    console.error('Erro ao buscar aluno:', error);
                }
            }
        };

        fetchPerfis();
        fetchAluno();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAluno((prevAluno) => ({
            ...prevAluno,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the payload to match the backend expectation
        const payload = {
            ...aluno,
            perfil: { id: aluno.perfilId }
        };

        try {
            if (aluno.id) {
                await axiosInstance.put(`/alunos/${aluno.id}`, payload);
            } else {
                await axiosInstance.post('/alunos', payload);
            }
            navigate('/alunos'); // Redireciona para a tabela de alunos após salvar
            if (onSearch) onSearch();
        } catch (error) {
            console.error('Erro ao salvar aluno:', error);
        }
    };

    return (
        <Container>
            <h1>{aluno.id ? 'Editar Aluno' : 'Novo Aluno'}</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={aluno.id} />
                <FormGroup>
                    <Label htmlFor="nome">Nome:</Label>
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        value={aluno.nome}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={aluno.email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="cpf">CPF:</Label>
                    <Input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={aluno.cpf}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="perfil">Perfil:</Label>
                    <Select
                        id="perfil"
                        name="perfilId"
                        value={aluno.perfilId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o perfil</option>
                        {perfis.map(perfil => (
                            <option key={perfil.id} value={perfil.id}>
                                {perfil.tipo}
                            </option>
                        ))}
                    </Select>
                </FormGroup>
                <div>
                    <Button type="submit" primary>Salvar</Button>
                    <Button
                        type="button"
                        onClick={() => navigate('/alunos')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default AlunoForm;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Estilos
const Container = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #e7f0fd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    color: #004080;
    font-size: 24px;
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
    color: #004080;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #b3d1ff;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #f0f8ff;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    border: 1px solid #b3d1ff;
    padding: 8px;
    background-color: #004080;
    color: white;
`;

const Td = styled.td`
    border: 1px solid #b3d1ff;
    padding: 8px;
    text-align: center; /* Centraliza o conteúdo da célula */
`;

const Button = styled.button`
    padding: 6px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    color: #004080;
    margin: 0 4px; /* Espaçamento horizontal entre os botões */
    transition: color 0.3s;

    &:hover {
        color: ${props => props.primary ? '#0056b3' : props.danger ? '#c82333' : '#6c757d'};
    }
`;

const AddButton = styled(Button)`
    display: block;
    margin: 20px 0; /* Adiciona margem superior e inferior */
    font-size: 16px;
    background-color: #004080;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-align: center;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#e7f0fd',
        borderColor: '#004080',
        borderRadius: '8px',
        padding: '20px',
    }
};

Modal.setAppElement('#root');

const AlunoTable = () => {
    const [alunos, setAlunos] = useState([]);
    const [searchParams, setSearchParams] = useState({
        nome: '',
        email: '',
        cpf: '',
        perfil: ''
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState(null);
    const navigate = useNavigate();

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

    const handleEdit = (id) => {
        navigate(`/alunos/${id}/editar`);
    };

    const handleDetail = (id) => {
        navigate(`/alunos/${id}`);
    };

    const openModal = (aluno) => {
        setSelectedAluno(aluno);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedAluno(null);
        setModalIsOpen(false);
    };

    const handleDelete = async () => {
        if (selectedAluno) {
            try {
                await axiosInstance.delete(`/alunos/${selectedAluno.id}`);
                setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id !== selectedAluno.id));
                closeModal();
            } catch (error) {
                console.error('Error deleting aluno:', error);
            }
        }
    };

    return (
        <Container>
            <Header>
                <Title>Lista de Alunos</Title>
            </Header>
            <AddButton onClick={() => navigate('/alunos/novo')}>
                Cadastrar Aluno
            </AddButton>
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
                                <Button primary onClick={() => handleDetail(aluno.id)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                                <Button onClick={() => handleEdit(aluno.id)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button danger onClick={() => openModal(aluno)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Confirmar Deleção"
            >
                <Header>
                    <Title>Confirmar Deleção</Title>
                </Header>
                <p>Tem certeza que deseja deletar este aluno?</p>
                <div>
                    <Button danger onClick={handleDelete}>Deletar</Button>
                    <Button onClick={closeModal}>Cancelar</Button>
                </div>
            </Modal>
        </Container>
    );
};

export default AlunoTable;

// src/components/AlunoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const AlunoDetail = () => {
    const { id } = useParams(); // Pega o ID da URL
    const [aluno, setAluno] = useState(null);
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const response = await axiosInstance.get(`/alunos/${id}`);
                setAluno(response.data);
            } catch (error) {
                console.error('Error fetching aluno details:', error);
            }
        };

        fetchAluno();
    }, [id]);

    const handleBack = () => {
        navigate('/alunos'); // Navega de volta para a lista de alunos
    };

    if (!aluno) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <h1 className="my-4">Detalhes do Aluno</h1>
            <div>
                <label>Nome:</label>
                <span>{aluno.nome}</span>
            </div>
            <div>
                <label>Email:</label>
                <span>{aluno.email}</span>
            </div>
            <div>
                <label>CPF:</label>
                <span>{aluno.cpf}</span>
            </div>
            <div>
                <label>Perfil:</label>
                <span>{aluno.perfil.tipo}</span>
            </div>
            <Button onClick={handleBack} variant="secondary" className="mt-3">Voltar</Button>
        </div>
    );
};

export default AlunoDetail;

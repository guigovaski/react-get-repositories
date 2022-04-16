import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { FaGithub, FaPlus, FaSpinner, FaTrash, FaBars } from 'react-icons/fa';
import { TRepositoryName } from '../../types/TRepositoryName';
import { ErrorMessage } from '../../components/GlobalComponents';
import api from '../../services/api';
import * as C from './styles';

export const Main = () => {
    const [repoName, setRepoName] = useState('');
    const [repositories, setRepositorioes] = useState<TRepositoryName[]>([]);
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState('');

    useEffect(() => {
        const repos = localStorage.getItem('repos');

        if (repos) {
            setRepositorioes(JSON.parse(repos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositories));
    }, [repositories]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (!repoName) {
                setShowError('Nome de repositório inválido');
                throw new Error('Nome de repositório inválido');
            }

            const response = await api.get(`repos/${repoName}`);
            const { full_name } = response.data;

            const hasRepo = repositories.find(item => item.name === repoName);
            
            if (hasRepo) {
                setShowError('Repisitório já foi adicionado');
                throw new Error('Repisitório já foi adicionado');
            }

            setRepositorioes([...repositories, { name: full_name }])
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
            setRepoName('');
        }
    } 

    const handleDeleteItem = (name: string) => {
        setRepositorioes(
            repositories.filter(item => item.name !== name)
        );
    };

    return (
        <C.Container>
            <h1>
                <FaGithub size={25} />
                Procurar respositórios
            </h1>

            <C.Form>
                {showError &&
                    <ErrorMessage>{showError}</ErrorMessage>
                }
                <input 
                    type="text" 
                    placeholder="Adicionar Respositório"
                    value={repoName} 
                    onChange={e => setRepoName(e.target.value)}
                />
                <C.SubmitButton 
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <FaSpinner size={14} color="#FFF" />
                    ) : (
                        <FaPlus size={14} color="#FFF" />
                    )}
                </C.SubmitButton>
            </C.Form>
            
            <C.List>
                {repositories.map((item, index) => (
                    <C.Item key={index}>
                        <span>
                            <FaTrash 
                                onClick={() => handleDeleteItem(item.name)} 
                                size={14} 
                                color="#000" 
                            />
                            {item.name}
                        </span>
                        <Link to={`/repository/${encodeURIComponent(item.name)}`}>
                            <FaBars size={14} color="#000" />
                        </Link>
                    </C.Item>
                ))}
            </C.List>
        </C.Container>
    );
}
import React, { useEffect, useState, ChangeEvent } from 'react'; 
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import * as C from './styles';
import api from '../../services/api';

import { TRepositoryOwner } from '../../types/TRepositoryOwner';
import { TIssuesState } from '../../types/TIssuesState';

import { Loading } from '../../components/GlobalComponents';

export const Repository = () => { 
    const { slug } = useParams();
    const [repo, setRepo] = useState<TRepositoryOwner>();
    const [issues, setIssues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [issuesState, setIssuesState] = useState<TIssuesState>('open'); 

    useEffect(() => {
        (async () => {
            const [repoData, issuesData] = await Promise.all([
                api.get(`/repos/${slug}`),
                api.get(`/repos/${slug}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                }) 
            ]);
            setRepo(repoData.data);
            setIssues(issuesData.data);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await api.get(`/repos/${slug}/issues`, {
                params: {
                    state: issuesState,
                    page: currentPage,
                    per_page: 5
                }
            });
            
            setIssues(res.data);
        })()
    }, [currentPage, issuesState]);

    const handleIssueChange = (value: TIssuesState) => {
        setIssuesState(value);
    }

    if (loading) {
        return <Loading>Loading....</Loading>;
    }

    return (
        <C.Container>
            <C.Owner>
                <C.BackButton to="/">
                    <FaArrowLeft color="#000" size={28} />
                </C.BackButton>
                <img src={repo?.owner.avatar_url} alt={repo?.owner.login} />
                <h1>{repo?.name}</h1>
                <p>{repo?.description}</p>
            </C.Owner>

            <C.IssuesList>
                <select onChange={e => handleIssueChange(e.target.value as TIssuesState)}>
                    <option value="open" selected>open</option>
                    <option value="closed">closed</option>
                    <option value="all">all</option>
                </select>
                {issues.map((item, index) => (
                    <li key={index}>
                        <img src={item.user.avatar_url} alt={item.user.login} />
                        <C.Issue>
                            <strong>
                                <a href={item.html_url}>{item.title}</a>
                                {item.labels.map((item: any, index: any) => (
                                    <span key={index}>{item.name}</span>
                                ))}
                            </strong>
                            <p>{item.user.login}</p>
                        </C.Issue>
                    </li>
                ))}
                <C.SwitchButtons>
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        voltar
                    </button>
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        avançar
                    </button>
                </C.SwitchButtons>
            </C.IssuesList>
        </C.Container>
    );
}
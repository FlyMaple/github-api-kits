import {AxiosResponse} from 'axios';

import _axios from '@axios';
import {RepositoriesResponse} from './definition';

// FIXME: currently for one topic
function compileToQ(topic: string[]): string {
    return `topic:${encodeURIComponent(topic[0])}`;
}

// FIXME: input arguments interface type
function getRepositories({
    q,
    topic,
    per_page,
    sort,
}: {
    q: string;
    topic: string[];
    per_page: number;
    sort: 'stars';
}): Promise<RepositoriesResponse> {
    return axios
        .get<any, AxiosResponse<RepositoriesResponse>>('/search/repositories', {
            params: {
                q: compileToQ(topic),
                per_page,
                sort,
            },
        })
        .then(res => res.data);
}

const axios = _axios.create({
    baseURL: 'https://api.github.com/',
    headers: {Accept: 'application/vnd.github.v3+json'},
});

const github = {
    getRepositories,
};

export default github;

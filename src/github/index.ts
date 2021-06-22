import axios from '@axios';
import {Repository} from './definition';

function getRepositories(): Repository[] {
    return [];
}

const github = {
    getRepositories,
};

export default github;

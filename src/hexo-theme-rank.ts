// 找不到模組 'json-to-pretty-yaml' 的宣告檔案。'c:/github/github-api-kits/node_modules/json-to-pretty-yaml/index.js' 隱含具有 'any' 類型。
//   如有 `npm i --save-dev @types/json-to-pretty-yaml`，請嘗試使用，或新增包含 `declare module 'json-to-pretty-yaml';` 的宣告 (.d.ts) 檔案ts(7016)
// import * as YAML from 'json-to-pretty-yaml';
const YAML = require('json-to-pretty-yaml');

import fs from 'fs';
import path from 'path';

import {Repository} from '@github/definition';

import config from './.config/hexo-theme-rank.json';
import github from './github';

async function getRepositories(): Promise<Repository[]> {
    return (await github.getRepositories({q: '', topic: ['hexo-theme'], per_page: 100, sort: 'stars'})).items.map(
        repo => {
            return {
                name: repo.name,
                owner: {
                    login: repo.owner.login,
                    html_url: repo.owner.html_url,
                },
                html_url: repo.html_url,
                description: repo.description,
                created_at: repo.created_at,
                updated_at: repo.updated_at,
                pushed_at: repo.pushed_at,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                open_issues_count: repo.open_issues_count,
            };
        },
    );
}

function output(data: any): void {
    const outDir = config.outDir;
    const fullOutDir = path.resolve(outDir, '_data');
    if (!fs.existsSync(outDir) || !fs.existsSync(path.resolve(outDir, '_data'))) {
        fs.mkdirSync(fullOutDir, {recursive: true});
    }

    fs.writeFileSync(path.resolve(fullOutDir, 'hexo-theme-rank.yml'), YAML.stringify(data));
    // Test output
    // fs.writeFileSync(path.resolve(__dirname, '../test', 'hexo-theme-rank.yml'), YAML.stringify(data));
}

async function main(): Promise<void> {
    const repositories = await getRepositories();

    output({
        repositories,
    });
}
main();

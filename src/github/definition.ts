export interface RepositoriesResponse {
    items: Repository[];
}

export interface Repository {
    name: string;
    owner: {
        login: string;
        html_url: string;
    };
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

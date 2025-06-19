export interface RepoType {
	id: number;
	name: string;
	html_url: string;
	language?: string;
	stargazers_count: number;
	commits_url: string;
	description?: string;
	forks_count: number;
}

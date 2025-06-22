import { RepoType } from '../app/user/repo.model';
import { UserType } from '../app/user/user.model';

export const dummy: UserType = {
	name: 'João Vitor',
	login: 'joao-vtr-oliveira',
	avatar_url: 'https://example.com/avatar.jpg',
	created_at: new Date().toISOString(),
	html_url: '',
	repos_url: '',
	company: null,
	location: null,
	email: null,
	hirable: false,
	bio: '',
	followers: 10,
	following: 8,
};

export const dummyRepos: RepoType[] = [
	{
		id: 1,
		name: 'dummy-repo-1',
		html_url: '',
		stargazers_count: 3,
		commits_url: '',
		forks_count: 2,
		language: 'TypeScript',
	},
	{
		id: 2,
		name: 'dummy-repo-2',
		html_url: '',
		stargazers_count: 5,
		commits_url: '',
		forks_count: 0,
		language: 'TypeScript',
	},
	{
		id: 3,
		name: 'dummy-repo-3',
		html_url: '',
		stargazers_count: 8,
		commits_url: '',
		forks_count: 0,
		language: 'TypeScript',
	},
];

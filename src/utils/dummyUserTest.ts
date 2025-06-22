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

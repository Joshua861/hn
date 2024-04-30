// place files you want to import through the `$lib` alias in this folder.

export type Story = {
	by: string;
	descendants: number;
	id: number;
	kids: Array<number>;
	score: number;
	time: number;
	title: string;
	type: string;
	url: string;
  text?: string;
};

export type SortType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

export async function getStories(
	type: SortType,
	startAt = 0,
	amount = 30
) {
	const baseURL = 'https://hacker-news.firebaseio.com/v0/';
	const url = baseURL + type + 'stories.json';

	const response = await fetch(url);
	const storyIDs = (await response.json()).slice(startAt, startAt + amount);

	const stories: Array<Story> = [];
	for (const id of storyIDs) {
		stories.push(await getStory(id));
	}

	return await stories;
}

export async function getStory(id: string) {
	const baseURL = 'https://hacker-news.firebaseio.com/v0/item/';
  const url = baseURL + id + '.json'

  console.log(url);
  
	const response = await fetch(url);
	const story = await response.json();

	return story;
}

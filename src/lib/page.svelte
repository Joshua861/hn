<script lang="ts">
	import { getStory } from '$lib';
	import StoryList from '$lib/story.svelte';
	import { Loader } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let stories: Array<Story> = [];
	let offset = 0;
	let loading = true;

	export let type: SortType;

	type Story = {
		by: string;
		descendants: number;
		id: number;
		kids: Array<number>;
		score: number;
		time: number;
		title: string;
		type: string;
		url: string;
	};

	type SortType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

	async function getStories() {
		loading = true;
		const baseURL = 'https://hacker-news.firebaseio.com/v0/';
		const url = baseURL + type + 'stories.json';

		const response = await fetch(url);
		const storyIDs = (await response.json()).slice(offset, offset + 10);

		for (const id of storyIDs) {
			stories = [...stories, await getStory(id)];
		}

		loading = false;
	}

	onMount(() => {
		getStories();
	});
</script>

<div class="prose prose-invert mx-auto p-5">
	{#if stories instanceof Array}
		{#each stories as story}
			<StoryList {story} />
		{/each}
	{/if}
	<br />
	{#if !loading}
		<button
			on:click={getStories}
			class="text-zinc-300 underline underline-offset-4 transition-all hover:text-zinc-100"
			>Load more</button
		>
	{:else}
		<div class="rounded-2xl border border-zinc-500/50 bg-zinc-800 p-5 text-center">
			<Loader class="mr-3 inline animate-spin" />
			Loading...
		</div>
	{/if}
</div>

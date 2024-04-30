<script lang="ts">
	import { getStory, type Story } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import parseUrl from 'parse-url';
	import Time from 'svelte-time/Time.svelte';
	import Comment from '$lib/comment.svelte';
	import { ArrowUp, Clock, MessageSquare } from 'lucide-svelte';

	let id = $page.params.id,
		story: Story,
		comments: Array<any> = [];

	$: console.log(comments);

	const baseURL = 'https://hacker-news.firebaseio.com/v0/item/';

	async function getComments(story: Story) {
		comments = [];
		for (const kid of story.kids) {
			const comment = await getReplies(kid);
			comments = [...comments, comment];
		}
	}

	async function getReplies(commentID: number) {
		const response = await fetch(baseURL + commentID + '.json');
		const comment = await response.json();

		comment.replies = [];

		if (comment.kids) {
			comment.replies = await Promise.all(comment.kids.map(getReplies));
		}

		return comment;
	}

	onMount(async () => {
		story = await getStory(id);
		await getComments(story);
	});
</script>

<div class="prose prose-invert mx-auto">
	{#if story}
		<h1 class="mb-1">{story.title}</h1>
		<div>
			{#if story.url}
				(<a
					class="mr-3 font-mono text-zinc-300 underline-offset-4 transition-all hover:text-zinc-100"
					href={story.url}>{parseUrl(story.url).resource}</a
				>)
			{/if}
			<ArrowUp class="inline" />
			{story.score}
			<MessageSquare class="ml-3 inline" />
			{story.descendants}
			<Clock class="ml-3 inline" />
			<Time relative timestamp={story.time * 1000} />
		</div>
		by
		<a
			class="font-bold text-zinc-200 underline-offset-4 transition-all hover:text-zinc-100"
			href={'/users/' + story.by}>{story.by}</a
		>
		<br /><br />
		{#if story.text}
			{@html story.text}
		{/if}
		<hr />
	{/if}
	{#each comments as comment}
		<Comment {comment} />
	{/each}
</div>
<br />
<br />

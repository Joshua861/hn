<script lang="ts">
	import type { Story } from '$lib';
	import { ArrowUp, Clock, MessageSquare } from 'lucide-svelte';
	import parseUrl from 'parse-url';
	import Time from 'svelte-time/Time.svelte';

	export let story: Story;

	$: console.log(story);
</script>

<a class="no-underline" href={'/stories/' + story.id}>
	<h3 class="mb-0 text-balance text-zinc-200 transition-all hover:text-zinc-100">
		{story.title}
	</h3>
</a>
{#if story.url}
	<a
		class="font-mono text-zinc-400 underline-offset-4 transition-all hover:text-zinc-300"
		href={story.url}>{parseUrl(story.url).resource}</a
	>
{/if}
<div class="mt-2">
	<ArrowUp class="inline" />
	{story.score}
	<MessageSquare class="ml-3 inline" />
	{story.descendants}
	<Clock class="ml-3 inline" />
	<Time relative timestamp={story.time * 1000} />
</div>
<hr class="my-6 opacity-50" />

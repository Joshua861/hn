<script>
	import Comment from '$lib/comment.svelte';

	export let comment;
</script>

<div class="mt-4 border-l-4 border-zinc-800 pl-3 pr-3">
	{#if comment.deleted}
		<p class="italic text-zinc-500">deleted</p>
	{:else}
		<a
			href={'/users/' + comment.by}
			class="w-fit rounded-lg bg-zinc-800/70 px-3 py-1 font-mono no-underline underline-offset-4 hover:bg-zinc-800"
			>{comment.by}</a
		>
		<div class="mt-3 overflow-hidden">
			{@html comment.text}
		</div>
	{/if}
	{#if comment.replies.length !== 0}
		{#each comment.replies as reply}
			<Comment comment={reply} />
		{/each}
	{/if}
</div>

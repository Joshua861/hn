<script>
	const links = ['best', 'new', 'top', 'show'];
</script>

<div class="mx-5 my-3 flex gap-3">
	{#each links as link}
		<a
			class="text-zinc-300 underline-offset-4 transition-all hover:text-zinc-100 hover:underline"
			href={'/' + link}>{link}</a
		>
	{/each}
</div>


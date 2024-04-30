<script>
	import { page } from '$app/stores';
</script>

<div class="prose prose-invert mx-auto p-5">
	<h1>{$page.status}: {$page.error.message}</h1>

	<span class="big">D:</span>
</div>

<style>
	.big {
		font-size: 10rem;
		font-weight: bold;
		line-height: 5rem;
		color: white;
	}
</style>

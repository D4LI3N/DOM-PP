<script>
	import '../app.pcss';
	import Header from '$lib/components/main/header.svelte';
	import Footer from '$lib/components/main/footer.svelte';
</script>

<Header />
<slot />
<Footer />

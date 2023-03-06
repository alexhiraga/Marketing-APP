<template>
    <div class="loading">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
</template>

<script>
export default {
    name: 'LoadingScreen'
}
</script>

<style>
    .loading {
        grid-area: content;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
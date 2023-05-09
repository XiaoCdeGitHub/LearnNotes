<template>
    <div class="homebanner">
        <h2>homebanner:{{ name }} - {{ age }} - {{ message.value }}</h2>
    </div>
</template>

<script>
export default {
inject:['name', 'age','message']
}
</script>

<style scoped>

</style>
<template>
    <div class="homebanner">
        <button @click="bannerClick()">banner按钮</button>
    </div>
</template>

<script>
import eventBus from './utils/event-bus';
export default {
    methods: {
        bannerClick() {
            console.log('bannerClick');
            eventBus.emit('whyEvent', 'why', 18, 1.88)
        }
    }
}
</script>

<style scoped></style>
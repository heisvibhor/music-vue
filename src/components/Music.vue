<template>
    <div>
        Hello music component
        {{ music.name }}
    </div>
</template>

<script>
export default {
    name: 'Music',
    props: {
        music: {name: String}
    }
}
</script>

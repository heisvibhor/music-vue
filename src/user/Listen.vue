<template>
    <div class="song container">
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm-8">
                <Listen v-if="id" :id="id"></Listen>
            </div>
            <div class="col-sm"></div>
        </div>

    </div>
</template>
<script>
import Listen from '@/components/Listen.vue'

export default {
    name: 'ListenSong',
    components: {
        Listen,
    },
    data() {
        return {
            id: null
        }
    },
    mounted() {
        if (this.$route.params.id && this.$route.params.id != "new") {
            this.id = this.$route.params.id
        }
    },
}
</script>
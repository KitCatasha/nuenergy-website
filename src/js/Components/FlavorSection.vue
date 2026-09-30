<script setup>
import Flavor from '@/Components/Flavor.vue';
defineProps(['flavours']);
const formatDescription = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br />');
</script>
<template>
    <template v-for="r in flavours" :key="r.id">
        <Flavor :id="`flavor_${r.id}`" :name="r.name" :url="r.url" :description="formatDescription(r.description)" :image="r.image"
            :direction="r.direction" :bg_color="`${r.bg_color || '#ffffff'}`" :title_color="r.title_color"
            :sub_title_color="r.sub_title_color" />
    </template>
</template>

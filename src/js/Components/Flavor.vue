<script setup>
defineProps({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    direction: {
        type: String,
    },
    bg_color: {
        type: String,
    },
    title_color: {
        type: String,
    },
    sub_title_color: {
        type: String,
    },
});
</script>
<template>
    <section :id="`flavor_${name}`" class="flex flex-col items-center justify-center md:flex-row"
        :style="`background-color: ${bg_color}`">
        <div
            class="mx-auto flex h-auto w-full flex-col items-center justify-center gap-4 p-3 md:max-w-6xl md:flex-row md:p-0">
            <div :class="[
                direction === 'lr' ? 'order-1' : 'order-1 md:order-2',
                'static flex w-full justify-center md:relative md:min-h-[400px] md:w-[45%]',
            ]">
                
                    <img data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" :src="`/storage/${image}`" :alt="name"
                        class="static -mt-24 max-w-[200px] md:absolute md:-mt-28 md:max-w-full" />
                
            </div>
            <div :class="[
                direction === 'lr' ? 'order-2 md:order-1' : 'order-1',
                'flex h-full min-h-[240px] w-full flex-col items-center justify-start gap-3 md:min-h-[400px] md:w-[55%] md:justify-center',
            ]">
                
                    <h1 data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" class="title" :style="`color: ${title_color}`">
                        {{ name }}
                    </h1>
                

                
                    <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" class="sub-title prose prose-p:text-justify" :style="`color: ${sub_title_color}`"
                        v-html="description"></div>
                
            </div>
        </div>
    </section>
</template>

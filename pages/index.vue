<template>
    <div></div>
</template>


<script lang="ts" setup>

const route = useRoute();

if (route.path === '/') {
    navigateTo('/login');
} else {
    navigateTo('/404');
}
</script>
<script setup lang="ts">
import { ref } from 'vue';

interface ImageItem {
    file: File;
    url: string;
}
const images = ref<ImageItem[]>([]);

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    Array.from(target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            images.value.push({
                file,
                url: e.target?.result as string,
            });
        };
        reader.readAsDataURL(file);
    });

    // Reset input to allow re-uploading the same    file
    target.value = '';
};

const removeImage = (index: number) => {
    images.value.splice(index, 1);
};

</script>


<template>
    <div class="image-uploader">
        <input type="file" multiple accept="image/*" @change="onFileChange" />

        <div class="preview-container" v-if="images.length">
            <div v-for="(image, index) in images" :key="index" class="image-preview">
                <img :src="image.url" alt="preview" />
                <button @click="removeImage(index)">x</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image-uploader input {
    margin-bottom: 10px;
}

.preview-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.image-preview {
    position: relative;
    width: 120px;
    height: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
}

.image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-preview button {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(255, 0, 0, 0.7);
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
</style>

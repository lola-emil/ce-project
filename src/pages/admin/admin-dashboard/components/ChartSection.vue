<script setup lang="ts">
import AreaChart from "./AreaChart.vue";
import Pie from "./Pie.vue";

</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
            <Pie/>
        </div>
        <div>
            <AreaChart/>
        </div>
    </div>
</template>
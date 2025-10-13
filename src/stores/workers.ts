import { ref, computed } from "vue";
import { defineStore } from "pinia";


export const useWorkerStore = defineStore('worker', () => {
    const workers = ref([
        {
            profile_img: "",
            name: "Carlos Dela Cruz",
            skill: "Carpentry",
            rate: 550, // PHP per hour
            ratings: 4.5
        },
        {
            name: "Joel Ramirez",
            skill: "Masonry",
            rate: 500,
            ratings: 4.2
        },
        {
            name: "Rico Santos",
            skill: "Electrical Installation",
            rate: 600,
            ratings: 4.8
        },
        {
            name: "Nestor Lim",
            skill: "Plumbing",
            rate: 580,
            ratings: 4.6
        },
        {
            name: "Arnold Bautista",
            skill: "Roofing",
            rate: 520,
            ratings: 4.3
        },
        {
            name: "Manuel Torres",
            skill: "Painting",
            rate: 480,
            ratings: 4.4
        },
        {
            name: "Edgar Navarro",
            skill: "Welding",
            rate: 600,
            ratings: 4.7
        },
        {
            name: "Bobby Aquino",
            skill: "Tiling",
            rate: 530,
            ratings: 4.5
        }

    ]);


    return { workers }
});
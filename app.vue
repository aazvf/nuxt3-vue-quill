<template>
    <div class="min-h-screen bg-yellow-50 font-mono">
        <div class="w-full flex flex-wrap space-between select-none">
            <div
                class="border px-5 py-3 leading-32 border-purple-200 text-purple-800 cursor-pointer"
                :class="active_note_meta.content.length === 0 ? 'bg-yellow-200 italic border-purple-300 shadow-md' : 'text-slate-500'"
                v-on:click="$notes().newNote()"
            >New Note</div>
            <div
                class="flex-auto text-center border px-5 py-3 border-purple-200 text-purple-800 cursor-pointer"
                :class="note.id === active_note_meta.id ? 'bg-yellow-200 italic border-purple-300 shadow-md' : 'text-slate-500'"
                v-for="(note) in notes"
                :key="note.id"
                v-on:click="switch_to_note(note.id)"
            >{{ note.content }}</div>
        </div>
        <!-- <div>{{ note_list }}</div> -->
        <!-- <div>{{ active_note }}</div> -->

        <client-only>
            <editor />
        </client-only>
    </div>
</template>


<script lang="ts" setup>
import "./assets/css/tailwind.css";

const active_note_meta = useNoteMeta();
const note_list = useNoteList();

const { $notes } = useNuxtApp();

const switch_to_note = (id) => {
    if (active_note_meta.value.id !== id) {
        $notes().restoreNote(id);
    }
};

onMounted(() => {
    $notes().restoreNotes();
});

const notes = computed(() => {
    return note_list.value
        .sort((a, b) => {
            return b.created_at - a.created_at;
            if (a.id === active_note_meta.value.id) {
                return -Infinity;
            }
            return b.updated_at - a.updated_at;
        })
        .filter((note) => note.content.length > 0);
});
</script>
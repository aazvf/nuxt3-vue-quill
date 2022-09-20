<template>
    <div class="min-h-screen bg-yellow-50 bgg">
        <div class="w-full flex flex-wrap space-between">
            <div
                class="border px-5 py-3 leading-32 border-purple-200 text-purple-800 cursor-pointer"
                :class="active_note_meta.content.length === 0 ? 'bg-yellow-200 italic' : ''"
                v-on:click="newNote()"
            >New Note</div>
            <div
                class="flex-auto text-center border px-5 py-3 border-purple-200 text-purple-800 cursor-pointer"
                :class="note.id === active_note_meta.id ? 'bg-yellow-200 italic' : 'text-purple-400'"
                v-for="(note) in notes"
                :key="note.id"
                v-on:click="switch_to_note(note.id)"
            >{{ note.content }}</div>
        </div>
        <!-- <div>{{ note_list }}</div> -->
        <!-- <div>{{ active_note }}</div> -->
        <QuillEditor
            theme="snow"
            :toolbar="toolbar"
            v-model:content="active_note"
            content-type="html"
            :key="note_key"
        />
    </div>
</template>


<script lang="ts" setup>
import "./assets/css/tailwind.css";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const active_note = useNote();
const active_note_meta = useNoteMeta();
const note_list = useNoteList();
const note_key = useNoteKey();
const { $notes } = useNuxtApp();

const switch_to_note = (id) => {
    if (active_note_meta.value.id !== id) {
        $notes().restoreNote(id);
    }
};

onMounted(() => {
    $notes().restoreNotes();
});
const newNote = () => {
    console.log($notes);
    $notes().newNote();
    // note_list.value.push();
};

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

const toolbar = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }],
    // [{ indent: "-1" }, { indent: "+1" }],
    // [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["link"],
    // ["link", "image", "video", "background"],
    ["clean"],
];
</script>
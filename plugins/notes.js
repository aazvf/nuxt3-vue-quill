import localforage from "localforage";

class NoteStorage {
    constructor() {
        this.note = useNote();
        this.note_meta = useNoteMeta();
        this.note_key = useNoteKey();
        this.noteList = useNoteList();
    }

    filterNotes() {
        this.noteList.value = this.noteList.value.filter((note) => note.content.trim().length > 0);
    }

    saveNotes() {
        this.saveNote();
        const index = this.noteList.value.findIndex((note) => note.id === this.note_meta.value.id);
        if (index > -1) {
            this.noteList.value[index].updated_at = Date.now();
            this.noteList.value[index].content = this.note.value
                .replace(/<[^>]+>/g, "")
                .trim()
                .substring(0, 20);
        } else {
            this.noteList.value.push(this.note_meta.value);
            this.noteList.value[this.noteList.value.length - 1].content = this.note.value

                .replace(/<[^>]+>/g, "")
                .trim()
                .substring(0, 20);
        }
        this.filterNotes();
        localforage.setItem("note-list", JSON.stringify(this.noteList.value));
    }

    restoreNotes() {
        localforage.getItem("note-list").then((value) => {
            const list = JSON.parse(value);
            console.log(list);
            if (list) {
                this.noteList.value = list;
            }
            // if (typeof value === "object") {
            // }
        });
    }

    saveNote() {
        localforage.setItem(this.note_meta.value.id, JSON.stringify(this.note.value));
    }

    restoreNote(id) {
        this.saveNotes();
        localforage.getItem(id).then((value) => {
            if (value) {
                this.note.value = JSON.parse(value);
                this.note_meta.value = this.noteList.value.find((note) => note.id === id);
                this.note_meta.value.updated_at = Date.now();
                this.note_key.value++;
            }
        });
    }

    newNote() {
        this.saveNotes();
        const note_meta = {
            id: (Math.random() + 1).toString(36).substring(7),
            created_at: Date.now(),
            updated_at: Date.now(),
            content: "",
        };

        this.noteList.value.push(note_meta);
        this.note_meta.value = note_meta;
        this.note.value = "";
        this.note_key.value++;
    }
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            notes: () => new NoteStorage(),
        },
    };
});

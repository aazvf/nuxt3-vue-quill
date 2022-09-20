export const useNoteMeta = () => {
    return useState("note_meta", () => {
        return {
            id: (Math.random() + 1).toString(36).substring(7),
            created_at: Date.now(),
            updated_at: Date.now(),
            content: "",
        };
    });
};

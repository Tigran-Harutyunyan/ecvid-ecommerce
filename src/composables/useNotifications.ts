import { notify } from "@kyvg/vue3-notification";

export const useNotifications = () => {

    const showError = ({ error, title, text }: {
        error?: unknown,
        title?: string,
        text?: string
    }) => {
        let errorMessage = text;

        if (error instanceof Error) {
            errorMessage = error.message
        }

        notify({
            title: title || "Something went wrong",
            text: errorMessage,
            type: "error",
        });
    }


    const showSuccess = ({ title, text }: { title?: string, text?: string }) => {
        notify({
            title: title || "Success",
            text,
            type: "success",
        });
    }

    return {
        showSuccess,
        showError
    }
}
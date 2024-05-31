import { notify } from "@kyvg/vue3-notification";

/**
 * Provides methods to display error and success notifications using the notify function.
 * @returns Object containing showError and showSuccess methods
 */
export const useNotifications = () => {
    /**
     * Displays an error notification with the provided error message or derived message from Error object.
     * @param error - Optional error object
     * @param title - Optional title for the notification
     * @param text - Optional text for the notification
     */
    const showError = ({ error, title, text }: { error?: unknown, title?: string, text?: string }) => {
        const errorMessage = error instanceof Error ? error.message : text;
        notify({ title, text: errorMessage, type: "error" });
    }

    /**
     * Displays a success notification with the provided title and text.
     * @param title - Optional title for the notification
     * @param text - Optional text for the notification
     */
    const showSuccess = ({ title, text }: { title?: string, text?: string }) => {
        notify({ title, text, type: "success" });
    }

    return {
        showError,
        showSuccess
    }
}
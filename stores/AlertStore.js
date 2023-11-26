import { create } from 'zustand';

const Alert = (set, get) => ({
    isAlertVisible: false, //state to check if alert is visible
    alertTitle: '', //state of the title that will be used in the alert
    alertMessage: '', //state of the message that will be used in the alert
    showAlert: (title, message) => set({ isAlertVisible: true, alertTitle: title, alertMessage: message }), //state management process to show alert
    hideAlert: () => set({ isAlertVisible: false, alertTitle: '', alertMessage: '' }), //state management process to hide alert
});

const AlertStore = create(Alert);

export default AlertStore;
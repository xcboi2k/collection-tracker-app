export const cleanAuthError = (error: any): string => {
    console.log('error message:', error)
    const message = String(error?.message || error)

    return message.split(':')[1]?.replace(']', '')?.trim() || message
}

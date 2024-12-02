
export function nullOrEmpty(field: (string | undefined)): boolean {
    return (field === null || field?.length === 0) ? true : false
}
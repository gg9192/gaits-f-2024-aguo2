
export function nullOrEmpty(field: (string | null)): boolean {
    return (field === null || field?.length === 0) ? true : false
}

export function isBool(field: (string | null)): boolean {
    return (field === 'true' || field === 'false') ? true : false
}
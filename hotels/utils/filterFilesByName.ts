
export function filterFilesByName(files: any, filename: string) {
    let results: any = [];
    files.forEach((file: any) => {
        if (file.fieldname === filename) {
            results.push(file.filename)
        }

    });

    return results[0];
}

export function getFilesNames(files: any) {
    let results: any = [];
    files.forEach((file: any) => {
            results.push(file.filename)
    });

    return results;
}
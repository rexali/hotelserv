import compressing from 'compressing';

// compress a file
export async function compressFile(filePathToCompress: string, pathToDestinationDotgz: string) {
    try {
        await compressing.gzip.compressFile(filePathToCompress, pathToDestinationDotgz);
    } catch (error) {
        console.log(error)
    }
}

        // uncompress a file
export async function uncompressFile(filePathToUnCompressDotTgz: string, pathToDestinationDir: string) {
    try {
        await compressing.tgz.uncompress(filePathToUnCompressDotTgz, pathToDestinationDir)
    } catch (error) {
        console.log(error)
    }
}


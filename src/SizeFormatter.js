function ConvertSizeToString(bytesize) {
    let divider = 1;

    let names = ['bytes', 'kB', 'MB', 'GB']
    
    for (let byteName of names) {
        if (bytesize < 1000 * divider) {
            return Math.round(bytesize*100 / divider)/100 + " " + byteName;
        }
        divider *= 1000;
    }
}

export default ConvertSizeToString;
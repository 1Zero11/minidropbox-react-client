function ConvertSizeToString(bytesize) {
    if (bytesize < 1000) {
        return bytesize + " bytes"
    }else if (bytesize < Math.pow(1000,2)) {
        return bytesize + " kB"
    } else if (bytesize < Math.pow(1000, 3)) {
        return bytesize + " MB"
    } else if (bytesize < Math.pow(1000, 4)) {
        return bytesize + " GB"
    }
}

export default ConvertSizeToString;
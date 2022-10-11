
export default function GetiframUrlFromUserInputUrl(userUrl) {

    let result = decodeURIComponent(userUrl.split("uri=")[1])
    
    return result
}
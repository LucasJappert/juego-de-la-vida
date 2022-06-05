let imagesDictionary = {};
const PreloadImages = async () => {
    let names = [
        "whiteShape", "blackShape"
    ];
    for (let i = 0; i < names.length; i++) {
        const url = `./images/${names[i]}.png`;
        let img = await LoadImage(url);
        imagesDictionary[names[i]] = img;
    }
}
const GetImage = (name) => {
    if (Object.keys(imagesDictionary).includes(name)){
        return imagesDictionary[name];
    }
    return null;
}

const LoadImage = path => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img)
        }
        img.onerror = e => {
            reject(e)
        }
    })
}
export { GetImage, PreloadImages};
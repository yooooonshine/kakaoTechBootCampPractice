
const kakaoMobilityMultipleDirectionsUrl = "https://apis-navi.kakaomobility.com/v1/origins/directions";
const secretKey = "KakaoAK "

function getKakao() {
    fetch(kakaoMobilityMultipleDirectionsUrl, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization" : secretKey,
        } ,
        body : JSON.stringify({
            "origins": [
                {
                    "x": "127.1331694942593",
                    "y": "37.4463137562622",
                    "key": "0"
                },
                {
                    "x": "127.13243772760565",
                    "y": "37.44148514309502",
                    "key": "1"
                }
            ],
            "destination": {
                "x": "127.14816492905383",
                "y": "37.4401690139602"
            },
            "radius": 5000
        })
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch()
}
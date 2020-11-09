const express = require('express');
const axios = require('axios');
const app = express();

const IAM_TOKEN = 't1.9f7L7euelZqQm8uMj5iVnsmYmsmSzpPNyeX09wwcWgL67x9QK4vd9PdMSlcC-u8fUCuL.XWKfbn98-FAJmb-WfPnO3UzdHpztiRAevD1GrL1Xq-sTf4WtgWJCV8QduOX5rHzmHG6R_2AJCWt3Nc0xmcMzCg';
const FOLDER = 'b1ghvhk52f04r2spho7d'

app.get('/:toTranslate', (req, res) => {
    axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate/', {
        "folder_id": FOLDER,
        "texts": [req.params.toTranslate],
        "targetLanguageCode": "ru" 
    }, {
        headers: {
            'Content-Type': 'aaplication/json',
            'Authorization': 'Bearer ' + IAM_TOKEN
        }
    }).then((response) => {
        res.send(response.data.translations[0].text);
        console.log(response.data.translations[0].text);
    }).catch((err) => {
        console.log(err);
    })
    
});

app.listen(3000, () => console.log('Listening on port 3000'));

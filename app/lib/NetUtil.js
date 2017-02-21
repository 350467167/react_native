let NetUtil = {
    postJson(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body: data
        };

        fetch(url, fetchOptions)
            .then((response) => {
                console.log('response' + response);
                return response != null ? response.json() : {};
            })
            .then((responseData) => {
                //  callback(JSON.parse(responseText));
                callback(responseData);
            }).done();
    },
}
export default NetUtil;
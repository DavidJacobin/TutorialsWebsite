function errorParser(error){
    return error.message.split('/n');
}

module.exports = {errorParser};
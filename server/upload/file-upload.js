const aws = require('aws-sdk');
var globals = require('../../globals');


const bucket        = globals.S3Bucket;
const accessKey     = globals.S3AccessKey;
const secAccesKey   = globals.S3SecAccessKey;

/**
 * Function responsible for contacting S3 and creating signed URL for file upload
 */
var getSignedS3Url = function(req, callback){

    aws.config.update({
        accessKeyId: accessKey,
        secretAccessKey: secAccesKey,
        region: 'eu-central-1',
    });
    
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];

    const s3Params = {
        Bucket: bucket,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        const retData = {status: '', data: null};

        if(err){
            retData.status = 'error';
            callback(retData);

        } else {
            const returnData = {
                signedRequest: data,
                url: `https://${bucket}.s3.amazonaws.com/${fileName}`
            };

            retData.status = 'success';
            retData.data = returnData;
            callback(retData);
        }
    });
}

module.exports = {
    getSignedS3Url: getSignedS3Url,
}
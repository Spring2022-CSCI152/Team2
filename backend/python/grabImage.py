'''

def lambdaHandler(event, context):
    bucketName = event["pathParameters"]["bucket"]
    fileName = event["queryStringParameters"]["file"]
    fileObj = s3.get_object(Bucket = bucketName, key = fileName)
    fileContent = fileObj["Body"].read()

    return{
        "statusCode": 200,
        "headers":{
            "Content-Type": "application/jpg",
            "Content-Disposition": "attachment; filename={}".format(fileName)
        },
        "body": base64.b64encode(fileContent),
        "isBase64Encoded": True
        }
        
'''
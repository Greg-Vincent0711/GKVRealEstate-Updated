import json
import boto3

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = "your-bucket-name-here"

    try:
        # this fn call only is grabbing 5 images, so for now its fine
        response = s3.list_objects_v2(Bucket=bucket_name)
        image_urls = []
        if "Contents" in response:
            imageObjects = response["Contents"]

            for imgObject in imageObjects:
                # Construct the S3 URL for the current object - they all follow this pattern
                s3_url = f"https://{bucket_name}.s3.amazonaws.com/{imgObject['Key']}"
                
                image_urls.append({'key': imgObject["Key"], 'url': s3_url})

        return {
            'statusCode': 200,
            'body': json.dumps(image_urls)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }

#### S3 - Loop bucket file

```python
s3resource = boto3.resource('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_access_key)
cur_bucket = 'xxx'
s3_bucket = self.s3resource.Bucket(cur_bucket)

for ind, obj in enumerate(s3_bucket.objects.filter(Prefix=prefix)):
    data_json_raw = json.loads(obj.get()['Body'].read())
```

#### S3 - Copy from one to another

```python
old_file_name_with_bucket_name = cur_bucket + '/' + obj.key
s3resource.Object(cur_bucket, str(obj.key)).copy_from(CopySource=old_file_name_with_bucket_name)
```

#### S3 - Delete file

```python
self.s3resource.Object(bucket_name, entire_path).delete()
```

#### S3 - Save file with pre check

```python
# Reference: https://stackoverflow.com/questions/33842944/check-if-a-key-exists-in-a-bucket-in-s3-using-boto3
try:
	self.s3resource.Object(bucket_name, entire_path).load()
except botocore.exceptions.ClientError as e:
  if e.response['Error']['Code'] == "404":
    # The object does not exist.
    object_put = self.s3resource.Object(bucket_name, entire_path)
    return object_put.put(Body=json.dumps(item))
  else:
    # Something else has gone wrong.
    return "failed"
else:
  # The object does exist.
  return "failed"
```

#### S3 - Read single file content

```python
obj = s3resource.Object(bucket_name=bucket_name, key=entire_path)
obj.get()['Body'].read()
```

#### S3 - Get file amount

```python
s3_bucket = self.s3resource.Bucket(bucket_name)
sum(1 for _ in s3_bucket.objects.filter(Prefix=prefix))
```


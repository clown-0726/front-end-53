#### Loop bucket file

```python
s3resource = boto3.resource('s3', aws_access_key_id=access_key, aws_secret_access_key=secret_access_key)
cur_bucket = 'xxx'
s3_bucket = self.s3resource.Bucket(cur_bucket)

for ind, obj in enumerate(s3_bucket.objects.filter(Prefix=prefix)):
    data_json_raw = json.loads(obj.get()['Body'].read())
```


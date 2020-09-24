#### Write file to local

```python
def save_data_local(self, report_folder, report_path, final_str):
  if not os.path.exists(report_folder):
    os.mkdir(report_folder)
  if not os.path.isfile(report_path):
    with open(report_path, 'wb') as f:
      f.write(str(final_str).encode('utf-8'))
      f.close()
```



#### Get all str between given term

```python
contents_extracted_list = re.findall(r"<html.*?</html>", contents, flags=re.DOTALL)
for contents_extracted in contents_extracted_list:
    print(contents_extracted)
```



#### Remove all tags

```python
def remove_all_tags(with_tag):
    return str(re.sub(r'<.*?>', ' ', with_tag))
```



#### Get file name with uuid

```python
def get_file_name_by_uuid(line, extension=''):
    return str(uuid.uuid3(uuid.NAMESPACE_DNS, str(line))) + extension
```


#### Read a file line-by-line into a list?
```python
with open('all_pscode') as f:
    content = f.readlines()
# you may also want to remove whitespace characters like `\n` at the end of each line
content = [x.strip() for x in content]
```

#### Write file to local

```python
def save_data_local(self, report_folder, report_path, final_str):
  """
  Save file to local
  """
  # Judge if folder exist
  if not os.path.exists(report_folder):
    os.mkdir(report_folder)
  # Judge if file exist
  if not os.path.isfile(report_path):
    with open(report_path, 'wb') as f:
      f.write(str(final_str).encode('utf-8'))
      f.close()
```



#### Get all str between given term

```python
import re

contents_extracted_list = re.findall(r"<html.*?</html>", contents, flags=re.DOTALL)

for contents_extracted in contents_extracted_list:
    print(contents_extracted)
```


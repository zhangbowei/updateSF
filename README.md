## 默认delay = 24小时.
```
updateAllConf --path=/???/???
```
## 自定义
```
updateAllConf --path=/???/??? --delay=1000
```

## path说明

path指向`已经存在`的文件夹, 文件夹中是需要执行文件的`软链接`;

path必须是`绝对路径`;

> 例如, 下述文件的软链接：

```
#!/usr/bin/env node
const updatelaodhost = require('../src/index.js');

updatelaodhost();
```


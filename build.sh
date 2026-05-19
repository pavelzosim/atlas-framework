#!/bin/bash
# 1. Берем только компоненты (они не меняются)
# 2. Перенаправляем результат в файл, который реально нужен Wix
cat src/core.css src/typography.css src/components/*.css > atlas-framework.css

# 3. Добавляем мета-информацию (если нужна)
echo "/* Built on $(date) */" >> atlas-framework.css

echo "Сборка завершена. Файл atlas-framework.css обновлен."
config.js - настройки подключения к БД

homeWork.js - ДЗ

Вызов скрипта:
node .\homeWokr.js [list|add|change|delete] [params]


Для list параметры не нужны; 

Для add параметры - name, number; 

Для change параметры - name, number, id (name, number что меняем, id где меняем); 

Для delete параметр id; 
 
Все параметры вводятся через пробел;

Схема БД:

node_js
- item(
   - id
   - name
   - number
   )

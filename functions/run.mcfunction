gamemode s @a[m=1,tag=!Adminer]
scoreboard players set @a[tag=Adminer] trash 0
scoreboard players set @a[m=1,tag=!Adminer] trash 1
kick @a[scores={trash=1}]
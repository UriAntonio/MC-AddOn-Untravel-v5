export const salonData = [
    "execute @e[type=mx:coliseo] ~ ~ ~ structure load airArena ~ ~4 ~",
    "kill @e[type=elder_guardian,r=50]",
    "kill @e[type=guardian,r=50]",
    "kill @e[type=wither_skeleton,r=50,tag=!tamed]",
    "kill @e[type=witch,r=50]",
    "kill @e[type=zombie,r=50,tag=!tamed]",
    "kill @e[type=boat,r=50]",
    "execute @e[type=mx:coliseo] ~ ~ ~ structure load ArenaVelas2 ~ ~4 ~",
    "kill @e[type=skeleton,r=40,tag=!tamed]",
    "kill @e[type=creeper,r=40]",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ say §c§lPlataforma principal activa",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ say §l§aEl area del §bColiseo §aes segura",
    "kill @e[type=arrow,r=40]",
    "kill @e[type=item,r=40]",
    "kill @e[type=blaze,r=40]",
    "kill @e[type=magma_cube,r=40]",
    "kill @e[type=vex,r=40]",
    "kill @e[type=vex,r=40]",
    "kill @e[type=evocation_illager,r=40]",
    "kill @e[type=pillager,r=40]",
    "kill @e[type=ravager,r=40]",
    "playsound beacon.activate @a[r=100]"
  ]

  export const arenaData = [
    "playsound raid.horn @a[r=100]"
  ]
  export const lavaData = [
    "playsound portal.travel @a[r=100]"
  ]
  export const picinaData = [
    "playsound cauldron.fillwater @a[r=100]"
  ]
  export const bedrockData = [
    "playsound random.explode @a[r=100]"
  ]

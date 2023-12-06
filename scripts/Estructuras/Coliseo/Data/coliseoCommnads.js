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
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ structure load airArena ~ ~4 ~",
    "kill @e[type=boat,r=50]",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ structure load ArenaMain ~ ~4 ~",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ say §c§lPlataforma §6§l§oArena de Batalla §cesta activa",
    "gamerule mobgriefing false",
    "playsound raid.horn @a[r=100]"
  ]
  export const lavaData = [
    
    "kill @e[type=boat,r=50]",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ structure load ArenaLava2 ~ ~4 ~",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ say §c§lPlataforma §e§l§oFoso de Lava §cesta activa",
    "gamerule mobgriefing false",
    "playsound portal.travel @a[r=100]",
  ]
  export const picinaData = [
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ structure load ArenaAcuatica ~ ~4 ~",
    "kill @e[type=boat,r=50]",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ say §c§lPlataforma §b§l§oAlberca Olímpica §cesta activa",
    "playsound cauldron.fillwater @a[r=100]"
  ]
  export const bedrockData = [
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ structure load airArena ~ ~4 ~",
    "kill @e[type=boat,r=50]",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ structure load ArenaBarrier ~ ~4 ~",
    "execute @e[type=mx:coliseo,r=100] ~ ~ ~ say §c§lPlataforma §4§l§oJaula de Sangre §cesta activa",
    "playsound random.explode @a[r=100]"
    //dar vision nocturna alwais
  ]


  /**
   * Magma Cube
    scoreboard players test §bArenaWhither wither_Arena 1 4
    execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon magma_cube ~10 ~6 ~9
   */

/**
 * Asalto
 scoreboard players test §bArenaWhither wither_Arena 1 4
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon evocation_illager ~10 ~6 ~9
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon vindicator ~10 ~6 ~9
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon vindicator ~10 ~6 ~9
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon ravager ~10 ~6 ~9
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon pillager ~10 ~6 ~9
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon pillager ~10 ~6 ~9
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon witch ~10 ~6 ~9
 */  

/**
 * Evoquer
 scoreboard players test §bArenaWhither wither_Arena 1 4
 ___execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon evocation_illager ~10 ~6 ~9 // mas candados por los totem
 */

 /**
  * Orda de Zombies
  scoreboard players test §bArenaWhither wither_Arena 1 4
  execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon zombie ~10 ~6 ~9
  execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon zombie ~10 ~6 ~9
  execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon zombie ~10 ~6 ~9
  */

/**
 * Blaze
 * solo en arenas cerradas
 execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon blaze ~10 ~6 ~9
 */

 /**
  * Johnny
  scoreboard players test §bArenaWhither wither_Arena 1 4
  execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon vindicator ~10 ~6 ~9 ... Johnny
  */

  /**
   * Eskeleton
   scoreboard players test §bArenaWhither wither_Arena 1 4
   execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon skeleton ~10 ~6 ~9
   */

   /**
    * Gardian
    scoreboard players test §bArenaWhither wither_Arena 2 2
    execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon guardian ~10 ~6 ~9
    */

    /**
     * Elder Gardian
     scoreboard players test §bArenaWhither wither_Arena 1 4
     execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon elder_guardian ~10 ~6 ~9
     */

     /**
      * Golem
      scoreboard players test §bArenaWhither wither_Arena 1 4
      execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon iron_golem ~10 ~6 ~9
      */

      /**
       * Bruja
       scoreboard players test §bArenaWhither wither_Arena 1 4
       execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon witch ~10 ~6 ~9
       */

       /**
        * Creeper
        scoreboard players test §bArenaWhither wither_Arena 1 4
        execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon creeper ~10 ~6 ~9
        gamerule mobgriefing false
        */

        /**
         * Wither
         execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon wither ~10 ~6 ~9
         */

         /**
          * Wither eskeleton
          scoreboard players test §bArenaWhither wither_Arena 1 4
          execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ summon wither_skeleton ~10 ~6 ~9
          */

          //execute @e[type=armor_stand,name=§r§l§o§bColiseo§r] ~ ~ ~ say §l§d§oFelicidades y gracias por participar!!!
          ///spawnpoint @p ~-3 ~ ~
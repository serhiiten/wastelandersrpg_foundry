export function registerSystemSettings() {
  game.settings.register("wastelanders", "archetypesList", {
    name: "Список Архетипів",
    hint: "Введіть доступні архетипи через кому.",
    scope: "world",
    config: true,
    type: String,
    default: "Здоровило, Стрілець, Торговець, Харизматик, Злодій, Технік, (Боже)вільний вчений, Рейнджер, Псіонік",
      requiresReload: false
  });
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const playerTag = encodeURIComponent(query.tag as string); 
  const apiUrl = 'https://api.clashofclans.com/v1'; 
  try {
    const response: any = await $fetch(`${apiUrl}/players/${playerTag}`, {
      headers: {
        Authorization: `Bearer ${config.public.clashApiToken}`,
      },
    });
    return {
      name: response.name,
      clan: response.clan.name,
      trophies: response.trophies,
      townHallLevel: response.townHallLevel,
      townHallWeaponLevel: response.townHallWeaponLevel,
      heroes: response.heroes,
      army: response.troops, 
      spells: response.spells, 
      achievements: response.achievements,
      league: response.league,
      builderBaseLeague: response.builderBaseLeague,
      role: response.role,
      attackWins: response.attackWins,
      defenseWins: response.defenseWins,
      legendStatistics: response.legendStatistics,
      bestTrophies: response.bestTrophies,
      donations: response.donations,
      donationsReceived: response.donationsReceived,
      builderHallLevel: response.builderHallLevel,
      builderBaseTrophies: response.builderBaseTrophies,
      warStars: response.warStars,
      clanCapitalContributions: response.clanCapitalContributions,
      playerHouse: response.playerHouse,
    };
  } catch (err: any) {
    return {
      error: "Failed to fetch player data.",
      details: err?.data || err.message,
    };
  }
});
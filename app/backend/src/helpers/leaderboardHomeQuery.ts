const leaderboardHomeQuery = `SELECT TE.team_name AS name,
SUM(
CASE 
WHEN MA.home_team_goals > MA.away_team_goals THEN 3
WHEN MA.home_team_goals < MA.away_team_goals THEN 0
ELSE 1 END
) AS totalPoints,
COUNT(TE.id) AS totalGames,
SUM(
CASE
WHEN MA.home_team_goals > MA.away_team_goals THEN 1
ELSE 0 END
) AS totalVictories,
SUM(
CASE
WHEN MA.home_team_goals = MA.away_team_goals THEN 1
ELSE 0 END
) AS totalDraws,
SUM(
CASE
WHEN MA.home_team_goals < MA.away_team_goals THEN 1
ELSE 0 END
) AS totalLosses,
SUM(MA.home_team_goals) AS goalsFavor,
SUM(MA.away_team_goals) AS goalsOwn,
SUM(MA.home_team_goals) - SUM(MA.away_team_goals) AS goalsBalance,
FORMAT((SUM(
CASE 
WHEN MA.home_team_goals > MA.away_team_goals THEN 3
WHEN MA.home_team_goals < MA.away_team_goals THEN 0
ELSE 1 END
) / (COUNT(TE.id) * 3)) * 100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS MA
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS TE
ON MA.home_team = TE.id
WHERE MA.in_progress = 0
GROUP BY TE.id
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC`;

export default leaderboardHomeQuery;

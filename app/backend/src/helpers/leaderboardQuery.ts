const leaderboardQuery = `SELECT home.name, (home.totalPoints + away.totalPoints) AS totalPoints,
(home.totalGames + away.totalGames) AS totalGames,
(home.totalVictories + away.totalVictories) AS totalVictories,
(home.totalDraws + away.totalDraws) AS totalDraws,
(home.totalLosses + away.totalLosses) AS totalLosses,
(home.goalsFavor + away.goalsFavor) AS goalsFavor,
(home.goalsOwn + away.goalsOwn) AS goalsOwn,
(home.goalsBalance + away.goalsBalance) AS goalsBalance,
FORMAT(((home.totalPoints + away.totalPoints) / ((home.totalGames + away.totalGames) * 3)
* 100), 2) AS efficiency
FROM (SELECT TE.team_name AS name,
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
SUM(MA.home_team_goals) - SUM(MA.away_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches AS MA
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS TE
ON MA.home_team = TE.id
WHERE MA.in_progress = 0
GROUP BY TE.id) AS home
INNER JOIN
(SELECT TE.team_name AS name,
SUM(
CASE 
WHEN MA.away_team_goals > MA.home_team_goals THEN 3
WHEN MA.away_team_goals < MA.home_team_goals THEN 0
ELSE 1 END
) AS totalPoints,
COUNT(TE.id) AS totalGames,
SUM(
CASE
WHEN MA.away_team_goals > MA.home_team_goals THEN 1
ELSE 0 END
) AS totalVictories,
SUM(
CASE
WHEN MA.away_team_goals = MA.home_team_goals THEN 1
ELSE 0 END
) AS totalDraws,
SUM(
CASE
WHEN MA.away_team_goals < MA.home_team_goals THEN 1
ELSE 0 END
) AS totalLosses,
SUM(MA.away_team_goals) AS goalsFavor,
SUM(MA.home_team_goals) AS goalsOwn,
SUM(MA.away_team_goals) - SUM(MA.home_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches AS MA
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS TE
ON MA.away_team = TE.id
WHERE MA.in_progress = 0
GROUP BY TE.id) AS away
ON home.name = away.name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC`;

export default leaderboardQuery;

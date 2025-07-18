from glicko2 import Player as GlickoPlayer

# Glicko2 setup
class MatchmakingPlayer:
    def __init__(self, rating=1500, rd=350, vol=0.06):
        self.player = GlickoPlayer(rating=rating, rd=rd, vol=vol)

    @property
    def rating(self):
        return self.player.rating

    def update(self, opponents_rd_ratings, outcomes):
        opponents = [GlickoPlayer(r, rd) for r, rd in opponents_rd_ratings]
        self.player.update_player(opponents, outcomes)